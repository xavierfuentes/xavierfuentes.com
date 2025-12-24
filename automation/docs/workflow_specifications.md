# n8n Workflow Specifications
## Node-by-Node Implementation Guide

**Last Updated:** 24/12/2024
**Version:** 2.0 (Simplified for Content OS)

---

## Overview

This document provides node-by-node specifications for the three workflows in the simplified research discovery system.

**Workflows:**
1. `rss_to_research.json` - Hourly RSS fetch and scoring
2. `weekly_research_digest.json` - Weekly digest email
3. `pipeline_maintenance.json` - Archiving and export

---

## Workflow 1: RSS to Research

### Purpose

Fetch articles from active RSS feeds hourly, score them for relevance, and store in the `research_items` table.

### Trigger

Cron: `0 * * * *` (every hour at minute 0)

### Workflow Diagram

```
Schedule Trigger (hourly)
       ↓
Get Active RSS Sources
       ↓
Loop: For Each Source
       ↓
  Fetch RSS Feed
       ↓
  Parse RSS/Atom XML
       ↓
  Extract Items (Code)
       ↓
  Loop: For Each Article
         ↓
    Check If Exists (by GUID)
         ↓
    IF: Is New Article?
         ↓ YES
    Score Article (GPT-4o-mini)
         ↓
    Prepare Research Item (Code)
         ↓
    Insert Into research_items
```

### Node Specifications

#### Node 1: Schedule Trigger

**Type:** Schedule Trigger
**Config:**
- Mode: Every Hour
- Minute: 0

---

#### Node 2: Get Active RSS Sources

**Type:** n8n Data Tables → Read
**Config:**
- Table: `rss_sources`
- Operation: Get Many
- Return All: true
- Filters: `active = true`
- Sort: `priority DESC`

---

#### Node 3: Loop Through Sources

**Type:** Split In Batches
**Config:**
- Batch Size: 1

---

#### Node 4: Fetch RSS Feed

**Type:** HTTP Request
**Config:**
- Method: GET
- URL: `{{ $json.url }}`
- Response Format: text
- Timeout: 30000ms
- Continue On Fail: true
- Headers:
  - User-Agent: `Mozilla/5.0 (compatible; XavierFuentes.com RSS Reader)`

---

#### Node 5: Parse RSS/Atom XML

**Type:** XML
**Config:**
- Mode: XML to JSON

---

#### Node 6: Extract Items

**Type:** Code (JavaScript)

```javascript
// Extract items from RSS 2.0 or Atom feed
const data = items[0].json.data;
const sourceInfo = items[0].json;

let feedItems = [];

// Try RSS 2.0 format
if (data.rss && data.rss.channel && data.rss.channel.item) {
  const rssItems = Array.isArray(data.rss.channel.item)
    ? data.rss.channel.item
    : [data.rss.channel.item];

  feedItems = rssItems.map(item => ({
    title: item.title,
    url: item.link,
    guid: item.guid && typeof item.guid === 'object'
      ? item.guid._
      : (item.guid || item.link),
    description: item.description || item['content:encoded'] || '',
    source_name: sourceInfo.name,
    content_pillar: sourceInfo.content_pillar,
    source_priority: sourceInfo.priority
  }));
}
// Try Atom format
else if (data.feed && data.feed.entry) {
  const atomEntries = Array.isArray(data.feed.entry)
    ? data.feed.entry
    : [data.feed.entry];

  feedItems = atomEntries.map(entry => {
    const link = Array.isArray(entry.link)
      ? entry.link.find(l => l.$.rel === 'alternate' || !l.$.rel)?.$.href
        || entry.link[0].$.href
      : entry.link?.$.href || '';

    return {
      title: entry.title,
      url: link,
      guid: entry.id || link,
      description: entry.summary || entry.content?.$?._ || entry.content || '',
      source_name: sourceInfo.name,
      content_pillar: sourceInfo.content_pillar,
      source_priority: sourceInfo.priority
    };
  });
}

// Return items (limit to 10 most recent per feed)
return feedItems.slice(0, 10).map(item => ({ json: item }));
```

---

#### Node 7: Loop Through Articles

**Type:** Split In Batches
**Config:**
- Batch Size: 1

---

#### Node 8: Check If Exists

**Type:** n8n Data Tables → Read
**Config:**
- Table: `research_items`
- Operation: Get Many
- Return All: false
- Limit: 1
- Filters: `guid = {{ $json.guid }}`

---

#### Node 9: Is New Article?

**Type:** IF
**Config:**
- Condition: `{{ $json.length || 0 }} = 0`

True = new article, proceed to score
False = exists, skip

---

#### Node 10: Score Article

**Type:** OpenAI Chat
**Config:**
- Model: gpt-4o-mini (cost-effective)
- Temperature: 0.2
- Max Tokens: 100

**System Message:**
```
You are scoring RSS articles for a fractional CTO's research pipeline.

Target audience: CTOs, Engineering Managers, Tech Leaders, Product Managers, Founders

Score this article on a scale of 1-10 based on:
- RELEVANCE: How relevant to tech leadership challenges?
- ACTIONABILITY: Does it offer practical frameworks or advice?
- DEPTH: Does it go beyond surface-level observations?

Return ONLY valid JSON:
{"score": 7.5, "reason": "Brief 1-sentence explanation"}
```

**User Message:**
```
Article:
Title: {{ $json.title }}
Source: {{ $json.source_name }} ({{ $json.source_priority }} priority)
Pillar: {{ $json.content_pillar }}
Description: {{ $json.description.substring(0, 500) }}
```

---

#### Node 11: Prepare Research Item

**Type:** Code (JavaScript)

```javascript
const item = items[0].json;

// Extract score from AI response
let score = 5.0;
let reason = '';

try {
  const responseText = item.message?.content || item.text || '{}';
  const parsed = JSON.parse(responseText);
  score = parseFloat(parsed.score) || 5.0;
  reason = parsed.reason || '';
} catch (e) {
  reason = 'Scoring failed - default score applied';
}

// Generate UUID
const crypto = require('crypto');
const id = crypto.randomUUID();

// Today's date
const today = new Date().toISOString().split('T')[0];

return [{
  json: {
    id: id,
    guid: item.guid,
    title: item.title,
    url: item.url,
    source_name: item.source_name,
    content_pillar: item.content_pillar,
    description: (item.description || '').substring(0, 500),
    quality_score: score,
    status: 'new',
    created_date: today,
    notes: reason,
    idea_id: null
  }
}];
```

---

#### Node 12: Insert Research Item

**Type:** n8n Data Tables → Create
**Config:**
- Table: `research_items`
- Fields: Map all fields from previous node

---

## Workflow 2: Weekly Research Digest

### Purpose

Email the top research items from the past week for review. Mark included items as `reviewed`.

### Trigger

Cron: `0 9 * * 0` (Sunday 9am London time)

### Workflow Diagram

```
Sunday 9am Trigger
       ↓
Get New Research Items
       ↓
Build Digest Email (Code)
       ↓
Send Digest Email ─────────────────┐
       ↓                           │
Get Item IDs (Code)                │
       ↓                           │
Loop Items                         │
       ↓                           │
Mark as Reviewed                   │
                                   │
                        ◄──────────┘
```

### Node Specifications

#### Node 1: Sunday 9am Trigger

**Type:** Schedule Trigger
**Config:**
- Mode: Cron
- Expression: `0 9 * * 0`
- Timezone: Europe/London

---

#### Node 2: Get New Research Items

**Type:** n8n Data Tables → Read
**Config:**
- Table: `research_items`
- Operation: Get Many
- Return All: true
- Filters: `status = 'new'`
- Sort: `quality_score DESC`

---

#### Node 3: Build Digest Email

**Type:** Code (JavaScript)

```javascript
// Get all new research items
const allItems = items.map(i => i.json);

// Filter to items from the last 7 days
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

const recentItems = allItems.filter(item =>
  item.created_date >= sevenDaysAgoStr
);

// Take top 15 by quality score
const topItems = recentItems
  .sort((a, b) => (b.quality_score || 0) - (a.quality_score || 0))
  .slice(0, 15);

// Group by content pillar
const byPillar = {};
topItems.forEach(item => {
  const pillar = item.content_pillar || 'Uncategorised';
  if (!byPillar[pillar]) byPillar[pillar] = [];
  byPillar[pillar].push(item);
});

// Build email content
let emailBody = `# Weekly Research Digest\n\n`;
emailBody += `**${topItems.length} top research items** from the past week.\n\n`;
emailBody += `Review these and use \`idea-builder\` agent to promote promising items.\n\n`;
emailBody += `---\n\n`;

for (const [pillar, pillarItems] of Object.entries(byPillar)) {
  emailBody += `## ${pillar}\n\n`;
  pillarItems.forEach((item, i) => {
    emailBody += `### ${i + 1}. ${item.title}\n`;
    emailBody += `- **Score:** ${item.quality_score}/10\n`;
    emailBody += `- **Source:** ${item.source_name}\n`;
    emailBody += `- **URL:** ${item.url}\n`;
    if (item.notes) emailBody += `- **AI Notes:** ${item.notes}\n`;
    emailBody += `\n`;
  });
}

emailBody += `---\n\n`;
emailBody += `*To promote an item, use: "Create an idea from this research: [URL]"*\n`;

return [{
  json: {
    subject: `Weekly Research Digest - ${new Date().toISOString().split('T')[0]}`,
    body: emailBody,
    item_count: topItems.length,
    items: topItems
  }
}];
```

---

#### Node 4: Send Digest Email

**Type:** Email Send
**Config:**
- To: `{{ $env.DIGEST_EMAIL }}`
- Subject: `{{ $json.subject }}`
- Message: `{{ $json.body }}`

---

#### Node 5: Get Item IDs

**Type:** Code (JavaScript)

```javascript
// Get IDs of items included in digest
const digestItems = $('Build Digest Email').first().json.items;
return digestItems.map(item => ({ json: { id: item.id } }));
```

---

#### Node 6: Loop Items

**Type:** Split In Batches
**Config:**
- Batch Size: 1

---

#### Node 7: Mark as Reviewed

**Type:** n8n Data Tables → Update
**Config:**
- Table: `research_items`
- Match By: `id = {{ $json.id }}`
- Fields: `status = 'reviewed'`

---

## Workflow 3: Pipeline Maintenance

### Purpose

Archive stale items and export active research for Claude to query.

### Trigger

Cron: `0 10 * * 0` (Sunday 10am London time, after digest)

### Workflow Diagram

```
Sunday 10am Trigger
       │
       ├───────────────────────────┐
       ↓                           ↓
Get All Active Items         Get All for Export
       ↓                           ↓
Find Items to Archive (Code)  Prepare Export (Code)
       ↓                           ↓
Loop Items                   [Optional: Export to GitHub]
       ↓
Archive Item
       ↓
Summarise (Code)
```

### Node Specifications

#### Node 1: Sunday 10am Trigger

**Type:** Schedule Trigger
**Config:**
- Mode: Cron
- Expression: `0 10 * * 0`
- Timezone: Europe/London

---

#### Node 2: Get All Active Items

**Type:** n8n Data Tables → Read
**Config:**
- Table: `research_items`
- Operation: Get Many
- Return All: true
- Filters: `status != 'archived'`

---

#### Node 3: Find Items to Archive

**Type:** Code (JavaScript)

```javascript
// Find items to archive:
// 1. Status 'new' or 'reviewed' AND older than 45 days
// 2. Quality score < 5
// 3. NOT linked to an idea

const allItems = items.map(i => i.json);

const fortyFiveDaysAgo = new Date();
fortyFiveDaysAgo.setDate(fortyFiveDaysAgo.getDate() - 45);
const cutoffDate = fortyFiveDaysAgo.toISOString().split('T')[0];

const toArchive = allItems.filter(item => {
  // Don't archive items already promoted to ideas
  if (item.idea_id) return false;

  // Archive low quality items
  if ((item.quality_score || 0) < 5) return true;

  // Archive old unprocessed items
  if (['new', 'reviewed'].includes(item.status) && item.created_date < cutoffDate) {
    return true;
  }

  return false;
});

return toArchive.map(item => ({ json: item }));
```

---

#### Node 4: Loop Items

**Type:** Split In Batches
**Config:**
- Batch Size: 1

---

#### Node 5: Archive Item

**Type:** n8n Data Tables → Update
**Config:**
- Table: `research_items`
- Match By: `id = {{ $json.id }}`
- Fields: `status = 'archived'`

---

#### Node 6: Get All for Export

**Type:** n8n Data Tables → Read
**Config:**
- Table: `research_items`
- Operation: Get Many
- Return All: true

---

#### Node 7: Prepare Export

**Type:** Code (JavaScript)

```javascript
// Export research items to JSON for Claude to read
const allItems = items.map(i => i.json);

// Only include active items (not archived)
const activeItems = allItems.filter(i => i.status !== 'archived');

// Sort by quality score
activeItems.sort((a, b) => (b.quality_score || 0) - (a.quality_score || 0));

const exportData = {
  generated_at: new Date().toISOString(),
  total_count: activeItems.length,
  by_status: {
    new: activeItems.filter(i => i.status === 'new').length,
    reviewed: activeItems.filter(i => i.status === 'reviewed').length,
    promoted: activeItems.filter(i => i.idea_id).length
  },
  by_pillar: {},
  items: activeItems.map(item => ({
    id: item.id,
    title: item.title,
    url: item.url,
    source_name: item.source_name,
    content_pillar: item.content_pillar,
    quality_score: item.quality_score,
    status: item.status,
    created_date: item.created_date,
    notes: item.notes,
    idea_id: item.idea_id
  }))
};

// Count by pillar
activeItems.forEach(item => {
  const pillar = item.content_pillar || 'Uncategorised';
  exportData.by_pillar[pillar] = (exportData.by_pillar[pillar] || 0) + 1;
});

return [{ json: exportData }];
```

---

#### Node 8: Export to GitHub (Optional)

**Type:** GitHub → Create/Update File
**Config:**
- Repository: xavierfuentes.com
- Path: `automation/research_items.json`
- Content: `{{ JSON.stringify($json, null, 2) }}`
- Message: `chore: update research items export`

**Note:** This node is disabled by default. Enable if you want Claude to be able to read current research items.

---

## Common Patterns

### Error Handling

All HTTP requests should have `continueOnFail: true` to prevent one bad feed from stopping the entire workflow.

### Date Handling

```javascript
// Today's date in YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

// N days ago
const nDaysAgo = new Date();
nDaysAgo.setDate(nDaysAgo.getDate() - N);
const cutoff = nDaysAgo.toISOString().split('T')[0];
```

### UUID Generation

```javascript
const crypto = require('crypto');
const id = crypto.randomUUID();
```

---

## Testing Checklist

### RSS to Research

- [ ] Triggers hourly
- [ ] Fetches all active RSS sources
- [ ] Handles both RSS 2.0 and Atom formats
- [ ] Checks for duplicates by GUID
- [ ] Scores articles with AI
- [ ] Inserts with status `new`

### Weekly Research Digest

- [ ] Triggers Sunday 9am London time
- [ ] Gets items from last 7 days
- [ ] Groups by pillar
- [ ] Sends email with top 15
- [ ] Marks included items as `reviewed`

### Pipeline Maintenance

- [ ] Triggers Sunday 10am London time
- [ ] Archives items >45 days old
- [ ] Archives items with score <5
- [ ] Does not archive items with idea_id
- [ ] Exports active items to JSON

---

*For table schemas, see `/automation/docs/data_table_schemas.md`*

*For architecture overview, see `/automation/docs/workflow_architecture.md`*
