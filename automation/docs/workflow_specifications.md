# n8n Workflow Specifications
## Node-by-Node Implementation Guide

**Last Updated:** 2025-10-06
**Version:** 1.0

---

## Overview

This document provides detailed node-by-node specifications for the three core workflows in the content automation system. Use these specifications to build the workflows in the n8n UI.

**Workflows:**
1. `rss_to_pipeline.json` - Hourly RSS fetch and scoring
2. `weekly_selection.json` - Weekly curation and auto-selection
3. `content_generation.json` - AI draft generation and GitHub commits

---

## Workflow 1: rss_to_pipeline.json

### Purpose
Fetch articles from active RSS feeds hourly, score them with AI, and populate the content_pipeline table.

### Trigger Schedule
Cron: `0 * * * *` (every hour at minute 0)

### Workflow Diagram
```
Schedule Trigger
  ↓
Get Active RSS Sources (Data Tables)
  ↓
Loop: For Each Source
  ↓
  Fetch RSS Feed (HTTP Request)
  ↓
  Parse RSS/Atom (XML)
  ↓
  Loop: For Each Article
    ↓
    Check If Exists (Data Tables)
    ↓
    IF: Is New Article?
      ↓ YES
      Score Article (AI)
      ↓
      Calculate Quality Score (Code)
      ↓
      Insert Into Pipeline (Data Tables)
  ↓
Send Summary Email
```

### Node Specifications

#### Node 1: Schedule Trigger
**Type:** Schedule Trigger
**Configuration:**
- Mode: Every Hour
- Hour: * (every hour)
- Minute: 0

#### Node 2: Get Active RSS Sources
**Type:** n8n Data Tables → Read
**Configuration:**
- Table: `rss_sources`
- Operation: Get Many
- Filters:
  - `active` = `true`
- Sort:
  - Field: `priority`
  - Direction: DESC

**Output Example:**
```json
[
  {
    "id": "uuid-1",
    "name": "Martin Fowler's Blog",
    "url": "https://martinfowler.com/feed.atom",
    "content_pillar": "Technology Strategy",
    "priority": "High",
    "active": true
  }
]
```

#### Node 3: Loop Through Sources
**Type:** Loop Over Items
**Configuration:**
- Input Mode: For Each Item
- Batch Size: 1

#### Node 4: Fetch RSS Feed
**Type:** HTTP Request
**Configuration:**
- Method: GET
- URL: `{{ $json.url }}`
- Response Format: String (we'll parse XML next)
- Timeout: 30000 (30 seconds)
- Options:
  - Redirect: Follow All
  - User-Agent: Custom (e.g., "Mozilla/5.0 Content Bot")

**Error Handling:**
- On Error: Continue
- Log: "Failed to fetch {{ $json.name }}: {{ $error.message }}"

#### Node 5: Parse RSS/Atom XML
**Type:** XML
**Configuration:**
- Mode: XML to JSON
- Property Name: `data` (from HTTP response body)
- Options:
  - Normalize: true
  - Trim: true
  - Explicit Array: false

**Output Path:** Feed items will be in `rss.channel.item` or `feed.entry` depending on format

#### Node 6: Extract Items
**Type:** Code (JavaScript)
**Configuration:**

```javascript
// Handle both RSS and Atom formats
const inputData = items[0].json.data;

let feedItems = [];

// RSS 2.0 format
if (inputData.rss && inputData.rss.channel && inputData.rss.channel.item) {
  feedItems = Array.isArray(inputData.rss.channel.item)
    ? inputData.rss.channel.item
    : [inputData.rss.channel.item];
}
// Atom format
else if (inputData.feed && inputData.feed.entry) {
  feedItems = Array.isArray(inputData.feed.entry)
    ? inputData.feed.entry
    : [inputData.feed.entry];
}

// Get source info from parent loop
const sourceName = items[0].json.name;
const contentPillar = items[0].json.content_pillar;

// Transform to standard format
const output = feedItems.map(item => {
  // Extract fields (RSS vs Atom)
  const title = item.title?.[0] || item.title || '';
  const link = item.link?.[0]?._ || item.link?.[0] || item.link?.href || '';
  const guid = item.guid?.[0]?._ || item.guid?.[0] || item.id?.[0] || link;
  const description = item.description?.[0] || item.summary?.[0]?._ || item.content?.[0]?._ || '';
  const pubDate = item.pubDate?.[0] || item.published?.[0] || new Date().toISOString();

  return {
    guid: guid,
    title: title,
    url: link,
    source_name: sourceName,
    content_pillar: contentPillar,
    description: description.substring(0, 1000), // Limit length
    pub_date: pubDate
  };
});

return output.map(item => ({ json: item }));
```

#### Node 7: Loop Through Articles
**Type:** Loop Over Items
**Configuration:**
- Input Mode: For Each Item
- Batch Size: 1

#### Node 8: Check If Exists
**Type:** n8n Data Tables → Read
**Configuration:**
- Table: `content_pipeline`
- Operation: Get Many
- Filters:
  - `guid` = `{{ $json.guid }}`
- Return All: false (only need to know if exists)

**Output:** Array of matching items (empty if new)

#### Node 9: Is New Article?
**Type:** IF
**Configuration:**
- Conditions:
  - Value 1: `{{ $("Check If Exists").item.json.length }}`
  - Operation: Is Equal
  - Value 2: `0`

**True Branch:** Article is new, proceed to score
**False Branch:** Article exists, skip

#### Node 10: Score Article (AI)
**Type:** OpenAI / Anthropic Chat Model
**Configuration:**
- Model: gpt-4o-mini (cost-effective for scoring) or claude-3-5-haiku
- Temperature: 0.3 (consistent scoring)
- Max Tokens: 500

**System Prompt:**
```
You are an expert content curator for a fractional CTO's thought leadership platform.

Audience: CTOs, Engineering Managers, Tech Leaders, Product Managers, Founders

Content Pillars (with target percentages):
- Technology Strategy: 30%
- Leadership & Management: 25%
- Execution & Delivery: 20%
- Founder Lessons: 15%
- Market & AI Trends: 10%

Score the following article on a composite quality scale (1-10) considering:

1. RELEVANCE: How relevant is this to our target audience?
   - High: Directly addresses CTO/tech leader challenges
   - Medium: Relevant to tech leadership, may need adaptation
   - Low: Tangential or off-topic

2. ACTIONABILITY: How practical and actionable is this content?
   - High: Specific frameworks, templates, step-by-step guides
   - Medium: Some practical advice, partly conceptual
   - Low: Abstract theory, no clear actions

3. DEPTH: How deep is the technical/strategic analysis?
   - High: Deep expertise, nuanced trade-offs, advanced concepts
   - Medium: Surface-level but useful
   - Low: Shallow or generic advice

Provide a single quality score (1-10) that balances all three factors.

Return ONLY a JSON object:
{
  "quality_score": 8.5,
  "reasoning": "Brief explanation (1-2 sentences)"
}
```

**User Prompt:**
```
Title: {{ $json.title }}
Source: {{ $json.source_name }}
Content Pillar: {{ $json.content_pillar }}
URL: {{ $json.url }}
Description: {{ $json.description }}

Provide your scoring in JSON format.
```

**Output:** Parse JSON response to extract scores

#### Node 11: Calculate Quality Score
**Type:** Code (JavaScript)
**Configuration:**

```javascript
const item = items[0].json;

// Extract score from AI response
let aiResponse;
try {
  aiResponse = typeof item.ai_response === 'string'
    ? JSON.parse(item.ai_response)
    : item.ai_response;
} catch (error) {
  // Fallback if JSON parsing fails
  aiResponse = {
    quality_score: 5.0,
    reasoning: 'Default score due to parsing error'
  };
}

// Generate UUID for new item
const { v4: uuidv4 } = require('uuid');
const id = uuidv4();

return [{
  json: {
    id: id,
    guid: item.guid,
    title: item.title,
    url: item.url,
    source_name: item.source_name,
    content_pillar: item.content_pillar,
    description: item.description,
    quality_score: parseFloat(aiResponse.quality_score),
    status: 'research',
    target_channel: null,
    word_count_target: null,
    created_date: new Date().toISOString().split('T')[0],
    github_path: null,
    github_commit_url: null,
    notes: aiResponse.reasoning
  }
}];
```

#### Node 12: Insert Into Pipeline
**Type:** n8n Data Tables → Insert
**Configuration:**
- Table: `content_pipeline`
- Columns: Map all fields from previous node
- On Conflict: Skip (if guid already exists somehow)

#### Node 13: Send Summary Email
**Type:** Email (or Slack/Discord notification)
**Configuration:**
- To: Your email
- Subject: `RSS Feed Update - {{ $now.format('YYYY-MM-DD HH:mm') }}`
- Body:

```
New articles added to content pipeline:

{{ $json.items_added }} new items

Top 5 by quality score:
{{ $json.top_5_list }}

Total active research items: {{ $json.total_research }}

View in n8n Data Tables: [link to n8n]
```

**Aggregation Logic (Code node before email):**
```javascript
// Count items added in this run
const allItems = $('Insert Into Pipeline').all();
const itemsAdded = allItems.length;

// Get top 5 by quality score
const sorted = allItems.sort((a, b) => b.json.quality_score - a.json.quality_score);
const top5 = sorted.slice(0, 5);

const top5List = top5.map((item, i) =>
  `${i+1}. ${item.json.title} (${item.json.quality_score}) - ${item.json.source_name}`
).join('\n');

// Query total research items (would need another Data Tables read node)
// For now, just report new items

return [{
  json: {
    items_added: itemsAdded,
    top_5_list: top5List || 'None',
    total_research: 'N/A' // Can add Data Tables query if needed
  }
}];
```

---

## Workflow 2: weekly_selection.json

### Purpose
Run every Sunday to archive stale items, calculate weekly scores with content pillar balancing, and auto-select top 4-5 research items.

### Trigger Schedule
Cron: `0 9 * * 0` (Sunday 9 AM)

### Workflow Diagram
```
Schedule Trigger
  ↓
Archive Stale Items (Data Tables Update)
  ↓
Get Research Items (Data Tables Read)
  ↓
Calculate Weekly Scores (Code)
  ↓
Select Top 4-5 (Code)
  ↓
Update Status to Selected (Data Tables Update Loop)
  ↓
Send Summary Email
```

### Node Specifications

#### Node 1: Schedule Trigger
**Type:** Schedule Trigger
**Configuration:**
- Mode: Cron
- Expression: `0 9 * * 0`
- Timezone: Europe/London

#### Node 2: Archive Stale Items
**Type:** Code (JavaScript) + Data Tables Update
**Configuration:**

First, get stale items:

**Sub-Node 2a: Get Stale Items**
**Type:** n8n Data Tables → Read
**Configuration:**
- Table: `content_pipeline`
- Operation: Get Many
- Filters (use Expression):
  - `status` = `research`
  - AND (`created_date` < 45 days ago OR `quality_score` < 5)

Expression for date:
```javascript
{{ $now.minus(45, 'days').format('YYYY-MM-DD') }}
```

**Sub-Node 2b: Update to Archived**
**Type:** n8n Data Tables → Update (in loop)
**Configuration:**
- Table: `content_pipeline`
- Operation: Update
- Match By: `id`
- Fields to Update:
  - `status` = `archived`

#### Node 3: Get Research Items
**Type:** n8n Data Tables → Read
**Configuration:**
- Table: `content_pipeline`
- Operation: Get Many
- Filters:
  - `status` = `research`
  - `created_date` >= 45 days ago (use expression: `{{ $now.minus(45, 'days').format('YYYY-MM-DD') }}`)
- Sort:
  - Field: `quality_score`
  - Direction: DESC

#### Node 4: Calculate Weekly Scores
**Type:** Code (JavaScript)
**Configuration:**

```javascript
// Get all research items
const items = $input.all().map(item => item.json);

// Define content pillar targets (from CLAUDE.md)
const pillarTargets = {
  'Technology Strategy': 0.30,
  'Leadership & Management': 0.25,
  'Execution & Delivery': 0.20,
  'Founder Lessons': 0.15,
  'Market & AI Trends': 0.10
};

// Get current week's already-selected items (would need another query)
// For now, use simple logic: boost under-represented pillars

// Count items by pillar
const pillarCounts = {};
for (const item of items) {
  const pillar = item.content_pillar;
  pillarCounts[pillar] = (pillarCounts[pillar] || 0) + 1;
}

// Calculate total items
const totalItems = items.length;

// Score each item with pillar balancing
const scoredItems = items.map(item => {
  let score = item.quality_score;

  // Current pillar percentage
  const currentPct = (pillarCounts[item.content_pillar] || 0) / totalItems;
  const targetPct = pillarTargets[item.content_pillar] || 0.10;

  // Boost if under-represented
  if (currentPct < targetPct) {
    const boost = (targetPct - currentPct) * 10; // Up to +1.0 boost
    score += boost;
  }

  // Recency boost (newer is better)
  const daysOld = Math.floor(
    (new Date() - new Date(item.created_date)) / (1000 * 60 * 60 * 24)
  );
  if (daysOld < 7) score += 0.5;
  if (daysOld < 3) score += 0.5;

  // Priority boost (from source)
  // Would need to join with rss_sources, for now skip

  return {
    ...item,
    adjusted_score: score.toFixed(2)
  };
});

// Sort by adjusted score
scoredItems.sort((a, b) => b.adjusted_score - a.adjusted_score);

return scoredItems.map(item => ({ json: item }));
```

#### Node 5: Select Top 4-5
**Type:** Code (JavaScript)
**Configuration:**

```javascript
const items = $input.all().map(item => item.json);

// Select top 4-5 (use 5 to give user choice)
const selected = items.slice(0, 5);

return selected.map(item => ({ json: item }));
```

#### Node 6: Loop and Update Status
**Type:** Loop Over Items + Data Tables Update

**Loop Configuration:**
- Input Mode: For Each Item
- Batch Size: 1

**Update Node:**
**Type:** n8n Data Tables → Update
**Configuration:**
- Table: `content_pipeline`
- Match By: `id` = `{{ $json.id }}`
- Fields to Update:
  - `status` = `selected`

#### Node 7: Send Summary Email
**Type:** Email
**Configuration:**
- To: Your email
- Subject: `Weekly Content Selection - {{ $now.format('YYYY-MM-DD') }}`
- Body:

```
Weekly content curation complete.

SELECTED ITEMS (5):

{{ $json.selected_list }}

ACTION REQUIRED:
1. Review selected items in n8n Data Tables
2. Set target_channel for each:
   - blog (2/month target)
   - linkedin-original (10-11/month target)
   - newsletter (variable)
3. Trigger content generation workflow

CONTENT PILLAR BALANCE:
{{ $json.pillar_summary }}

View items: [link to n8n Data Tables]
```

**Aggregation Logic (Code node before email):**
```javascript
const selected = $('Select Top 4-5').all();

const selectedList = selected.map((item, i) =>
  `${i+1}. [Score: ${item.json.adjusted_score}] ${item.json.title}
     Pillar: ${item.json.content_pillar}
     Source: ${item.json.source_name}
     Quality: ${item.json.quality_score}/10
     URL: ${item.json.url}
  `
).join('\n\n');

// Count by pillar
const pillarCounts = {};
selected.forEach(item => {
  const pillar = item.json.content_pillar;
  pillarCounts[pillar] = (pillarCounts[pillar] || 0) + 1;
});

const pillarSummary = Object.entries(pillarCounts)
  .map(([pillar, count]) => `${pillar}: ${count}`)
  .join('\n');

return [{
  json: {
    selected_list: selectedList,
    pillar_summary: pillarSummary
  }
}];
```

---

## Workflow 3: content_generation.json

### Purpose
Generate AI content drafts for selected items with target_channel set, validate quality, and commit to GitHub.

### Trigger Options
- Manual trigger (user initiates after setting target_channel)
- OR Scheduled: Daily 10 AM check for new items

### Workflow Diagram
```
Trigger (Manual or Schedule)
  ↓
Get Selected Items with Target Channel (Data Tables)
  ↓
Loop: For Each Item
  ↓
  Fetch Source Article (HTTP Request)
  ↓
  Extract Content (HTML → Text)
  ↓
  AI Content Generation (LLM)
  ↓
  Quality Gates Validation (Code)
  ↓
  IF: Quality Gates Pass?
    ↓ YES
    Generate Slug (Code)
    ↓
    Check GitHub Duplicate (GitHub API)
    ↓
    Prepare Markdown (Code)
    ↓
    Route to Directory (Code)
    ↓
    Commit to GitHub (GitHub API)
    ↓
    Update Pipeline Record (Data Tables)
  ↓
Send Notification Email
```

### Node Specifications

#### Node 1: Get Selected Items
**Type:** n8n Data Tables → Read
**Configuration:**
- Table: `content_pipeline`
- Operation: Get Many
- Filters:
  - `status` = `selected`
  - `target_channel` IS NOT NULL

#### Node 2: Loop Through Items
**Type:** Loop Over Items
**Configuration:**
- Input Mode: For Each Item
- Batch Size: 1

#### Node 2.5: Split Channels (NEW)
**Type:** Code (JavaScript)
**Configuration:**

```javascript
// Split comma-separated channels into separate items
const item = items[0].json;
const channels = item.target_channel
  ? item.target_channel.split(',').map(c => c.trim())
  : [];

// Create one item per channel
const output = channels.map(channel => ({
  json: {
    ...item,
    current_channel: channel, // Which channel this iteration is for
    all_channels: item.target_channel, // Original multi-channel value
    word_count_target: getWordCountForChannel(channel, item.word_count_target)
  }
}));

// Helper function for word count
function getWordCountForChannel(channel, userDefined) {
  if (userDefined) return userDefined;

  // Defaults if not specified
  const defaults = {
    'blog': 2000,
    'linkedin': 600,
    'newsletter': 500
  };
  return defaults[channel] || 2000;
}

return output;
```

**Output:** If `target_channel = "blog,linkedin"`, creates 2 items (one for blog, one for linkedin)

#### Node 3: Loop Through Channels (NEW)
**Type:** Loop Over Items
**Configuration:**
- Input Mode: For Each Item
- Batch Size: 1

#### Node 4: Fetch Source Article
**Type:** HTTP Request
**Configuration:**
- Method: GET
- URL: `{{ $json.url }}`
- Response Format: String
- Timeout: 30000

#### Node 5: Extract Content (HTML → Text)
**Type:** HTML Extract
**Configuration:**
- Mode: HTML → Text
- Selector: `article, .post-content, .entry-content, main` (try common selectors)
- Extract: Text Content

**Alternative: Code node with cheerio**
```javascript
const cheerio = require('cheerio');
const html = items[0].binary.data.toString();
const $ = cheerio.load(html);

// Try common content selectors
let content = '';
const selectors = ['article', '.post-content', '.entry-content', 'main', 'body'];

for (const selector of selectors) {
  content = $(selector).text().trim();
  if (content.length > 500) break;
}

// Clean up whitespace
content = content.replace(/\s+/g, ' ').substring(0, 10000); // Limit to 10k chars

return [{
  json: {
    ...items[0].json,
    source_content: content
  }
}];
```

#### Node 6: AI Content Generation
**Type:** OpenAI / Anthropic Chat Model
**Configuration:**
- Model: gpt-4o or claude-3-5-sonnet
- Temperature: 0.7 (creative but controlled)
- Max Tokens: 4000

**System Prompt:**
```
You are an expert content writer for Xavier Fuentes, a fractional CTO.

Audience: CTOs, Engineering Managers, Tech Leaders, Product Managers, Founders

Voice & Style:
- UK English only (colour, optimise, realise, whilst, amongst)
- Professional but personal tone
- Direct and assertive (not arrogant)
- Include specific examples and numbers
- Personal failures and lessons learned
- Contrarian opinions when appropriate
- High technical depth with accessible explanations

Content Requirements:
- Pass "so what?" test - clear value for busy tech leaders
- 80/20 value-to-promotion ratio
- Specific frameworks and actionable advice
- No generic corporate jargon or buzzwords

Structure:
- Hook (provocative question, bold statement, or failure story)
- Context (why this matters now)
- Framework/Analysis (specific methodology)
- Case Study/Example (concrete application)
- Implementation (how to apply)
- Pitfalls (what to avoid)
- Next Steps (clear CTA)

Generate content based on the target channel and word count specified.
```

**User Prompt (dynamic based on current_channel):**
```javascript
// Build prompt dynamically
const item = $json;
const wordCount = item.word_count_target;
const channel = item.current_channel; // Use current_channel from split

let channelInstructions = '';
if (channel === 'blog') {
  channelInstructions = `
Format: Long-form blog post (${wordCount} words)
- SEO-optimised title and meta description
- H2/H3 subheadings for structure
- Code examples if relevant
- Markdown format with frontmatter
  `;
} else if (channel === 'linkedin') {
  channelInstructions = `
Format: LinkedIn post (${wordCount} words, typically 200-800)
- Short paragraphs (2-3 sentences max)
- Strong hook in first 2 lines
- Use line breaks for readability
- End with engagement question
- Markdown format with frontmatter
  `;
} else if (channel === 'newsletter') {
  channelInstructions = `
Format: Newsletter digest item (${wordCount} words, typically 400-600)
- Conversational tone
- Quick summary of key insight
- Why it matters for CTOs
- Markdown format with frontmatter
  `;
}

const prompt = `
Source Article: ${item.title}
Source URL: ${item.url}
Content Pillar: ${item.content_pillar}
Target Channel: ${item.current_channel}
Word Count Target: ${wordCount}

${channelInstructions}

Source Content Summary:
${item.source_content.substring(0, 5000)}

Generate the complete article in Markdown format with proper frontmatter:

---
title: "Generated Title"
slug: auto-generated-slug
status: draft
visibility: public
featured: false
content_pillar: ${item.content_pillar}
meta_title: "SEO Title"
meta_description: "SEO Description"
tags:
  - ${item.content_pillar}
  - [additional tags]
authors:
  - xavier
---

[Article content here]
`;

return prompt;
```

**Output:** Full markdown content with frontmatter

#### Node 7: Quality Gates Validation
**Type:** Code (JavaScript)
**Configuration:**

```javascript
const content = items[0].json.ai_generated_content;
const targetWordCount = items[0].json.word_count_target || 2000;

// Split frontmatter and body
const parts = content.split('---');
const body = parts[2] || content;

// Quality gate checks
const checks = {
  uk_english: {
    critical: true,
    passed: !/(ize|ization|color|favor|analyze|optimize)\b/i.test(body)
  },
  word_count: {
    critical: true,
    passed: Math.abs(body.split(/\s+/).length - targetWordCount) <= (targetWordCount * 0.1)
  },
  specific_examples: {
    moderate: true,
    passed: /\d+/.test(body) && (body.match(/example|instance|case/gi) || []).length >= 2
  },
  call_to_action: {
    minor: true,
    passed: /(What|How|Share|Tell|Comment|Discuss)/i.test(body.split('\n').slice(-5).join('\n'))
  },
  no_buzzwords: {
    moderate: true,
    passed: !/(synergy|leverage|disrupt|paradigm shift|circle back)/i.test(body)
  },
  personal_insight: {
    moderate: true,
    passed: /(I|my|our|we)\s+(learned|discovered|found|realized)/i.test(body)
  }
};

// Count failures by severity
let criticalFails = 0;
let moderateFails = 0;
let minorFails = 0;

for (const [check, result] of Object.entries(checks)) {
  if (!result.passed) {
    if (result.critical) criticalFails++;
    else if (result.moderate) moderateFails++;
    else minorFails++;
  }
}

// Decision logic
const blockCommit = criticalFails > 0;
const flagForReview = moderateFails >= 3 || minorFails >= 5;
const allPass = criticalFails === 0 && moderateFails === 0 && minorFails === 0;

return [{
  json: {
    ...items[0].json,
    quality_gates: {
      checks: checks,
      critical_fails: criticalFails,
      moderate_fails: moderateFails,
      minor_fails: minorFails,
      block_commit: blockCommit,
      flag_for_review: flagForReview,
      all_pass: allPass
    }
  }
}];
```

#### Node 8: IF Quality Gates Pass
**Type:** IF
**Configuration:**
- Condition: `{{ !$json.quality_gates.block_commit }}`

**True:** Proceed to GitHub
**False:** Send failure email and stop

#### Node 9: Generate Slug
**Type:** Code (JavaScript)
**Configuration:**

```javascript
const content = items[0].json.ai_generated_content;

// Extract title from frontmatter
const titleMatch = content.match(/title:\s*["'](.+?)["']/);
const title = titleMatch ? titleMatch[1] : items[0].json.title;

// Generate slug
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

// Add channel suffix if multi-channel (to avoid filename conflicts)
const channel = items[0].json.current_channel;
const allChannels = items[0].json.all_channels;
const isMultiChannel = allChannels && allChannels.includes(',');

let finalSlug = slug;
if (isMultiChannel && channel === 'linkedin') {
  finalSlug = `${slug}-linkedin`;
}

return [{
  json: {
    ...items[0].json,
    slug: finalSlug
  }
}];
```

#### Node 10: Check GitHub Duplicate
**Type:** GitHub
**Configuration:**
- Operation: Get File
- Owner: your-github-username
- Repository: xavierfuentes.com
- File Path: `content/drafts/{{ $json.slug }}.md` (dynamic based on channel)

**On Error:** Continue (file doesn't exist, which is fine)

#### Node 11: Prepare Markdown
**Type:** Code (JavaScript)
**Configuration:**

```javascript
const item = items[0].json;
let markdown = item.ai_generated_content;

// For LinkedIn posts, inject scheduled_date into frontmatter
if (item.current_channel === 'linkedin' && item.scheduled_date) {
  // Parse frontmatter
  const parts = markdown.split('---');
  if (parts.length >= 3) {
    const frontmatter = parts[1];
    const body = parts.slice(2).join('---');

    // Add scheduled_date to frontmatter
    const updatedFrontmatter = frontmatter + `\nscheduled_date: ${item.scheduled_date}`;
    markdown = `---${updatedFrontmatter}---${body}`;
  }
}

return [{
  json: {
    ...item,
    markdown_content: markdown
  }
}];
```

#### Node 12: Route to Directory & Schedule LinkedIn
**Type:** Code (JavaScript)
**Configuration:**

```javascript
const item = items[0].json;
const slug = item.slug;
const channel = item.current_channel; // Use current_channel from split

let directory;
let filename = `${slug}.md`;
let scheduledDate = null;

if (channel === 'blog') {
  directory = 'content/drafts';
} else if (channel === 'linkedin') {
  directory = 'content/linkedin';

  // Auto-schedule to next available Tue/Wed/Thu
  scheduledDate = getNextLinkedInSlot();
} else if (channel === 'newsletter') {
  directory = 'content/newsletter/items';
} else {
  directory = 'content/drafts'; // fallback
}

const filePath = `${directory}/${filename}`;

// Helper: Get next available Tue/Wed/Thu slot
function getNextLinkedInSlot() {
  const today = new Date();
  const daysOfWeek = [2, 3, 4]; // Tue=2, Wed=3, Thu=4

  // Start from tomorrow
  let checkDate = new Date(today);
  checkDate.setDate(checkDate.getDate() + 1);

  // Find next Tue/Wed/Thu
  while (!daysOfWeek.includes(checkDate.getDay())) {
    checkDate.setDate(checkDate.getDate() + 1);
  }

  // Format as YYYY-MM-DD
  return checkDate.toISOString().split('T')[0];
}

return [{
  json: {
    ...item,
    github_file_path: filePath,
    scheduled_date: scheduledDate
  }
}];
```

**Note:** This simple implementation assigns the next available Tue/Wed/Thu. For production, you may want to query existing scheduled posts to avoid double-booking.

#### Node 13: Commit to GitHub
**Type:** GitHub
**Configuration:**
- Operation: Create or Update File
- Owner: your-github-username
- Repository: xavierfuentes.com
- File Path: `{{ $json.github_file_path }}`
- Commit Message: `chore: add AI draft ({{ $json.current_channel }}) - {{ $json.title }}`
- Content: `{{ $json.markdown_content }}`
- Branch: main

**Output:** Commit URL

#### Node 14: Aggregate Multi-Channel Results (NEW)
**Type:** Code (JavaScript)
**Configuration:**

```javascript
// Collect all commits from multi-channel generation
const allCommits = $('Commit to GitHub').all();

// Group by pipeline item ID
const grouped = {};
allCommits.forEach(commit => {
  const id = commit.json.id;
  if (!grouped[id]) {
    grouped[id] = {
      id: id,
      title: commit.json.title,
      all_channels: commit.json.all_channels,
      commits: []
    };
  }
  grouped[id].commits.push({
    channel: commit.json.current_channel,
    path: commit.json.github_file_path,
    url: commit.json.commit_url
  });
});

// Convert to array
return Object.values(grouped).map(item => ({ json: item }));
```

#### Node 15: Update Pipeline Record
**Type:** Loop Over Items + Data Tables Update
**Configuration:**

**Loop:**
- Input Mode: For Each Item
- Batch Size: 1

**Update Node:**
- Table: `content_pipeline`
- Match By: `id` = `{{ $json.id }}`
- Fields to Update:
  - `status` = `generated`
  - `github_path` = Comma-separated paths: `{{ $json.commits.map(c => c.path).join(',') }}`
  - `github_commit_url` = First commit URL: `{{ $json.commits[0].url }}`
  - `notes` = Append: `Generated for channels: {{ $json.all_channels }}`

#### Node 16: Send Notification Email
**Type:** Email
**Configuration:**
- To: Your email
- Subject: `Content Generated - {{ $json.title }}`
- Body:

```
New AI draft ready for review:

Title: {{ $json.title }}
Channel: {{ $json.target_channel }}
Word Count: {{ $json.word_count }}

Quality Gates:
{{ $json.quality_summary }}

GitHub: {{ $json.github_commit_url }}
File: {{ $json.github_file_path }}

Next Steps:
1. Review and edit draft
2. Update frontmatter status to 'published'
3. Run: npm run publish
4. Move to content/posts/ with dated filename
```

---

## Common Code Snippets

### Generate UUID
```javascript
const { v4: uuidv4 } = require('uuid');
const id = uuidv4();
```

### Date Formatting
```javascript
// Current date YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

// 45 days ago
const cutoffDate = new Date();
cutoffDate.setDate(cutoffDate.getDate() - 45);
const cutoff = cutoffDate.toISOString().split('T')[0];
```

### Parse Frontmatter
```javascript
const parts = markdown.split('---\n');
const frontmatterYaml = parts[1];
const body = parts.slice(2).join('---\n');
```

### Word Count
```javascript
const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
```

---

## Error Handling

### HTTP Request Failures
- Always use "Continue On Fail" option
- Log errors to n8n console
- Send error summary email at end of workflow

### AI API Failures
- Implement retry logic (3 attempts)
- Fallback to default scores if scoring fails
- Log errors and flag items for manual review

### GitHub API Failures
- Check for authentication errors (token expired)
- Handle rate limiting (wait and retry)
- Send notification email if commit fails

---

## Testing Checklist

### rss_to_pipeline.json
- [ ] Triggers hourly
- [ ] Fetches all active feeds
- [ ] Handles both RSS and Atom formats
- [ ] Checks for duplicates by GUID
- [ ] Scores articles with AI
- [ ] Inserts new items into content_pipeline
- [ ] Sends summary email

### weekly_selection.json
- [ ] Triggers Sunday 9 AM
- [ ] Archives items >45 days or quality <5
- [ ] Calculates pillar-balanced scores
- [ ] Selects top 4-5 items
- [ ] Updates status to 'selected'
- [ ] Sends selection email

### content_generation.json
- [ ] Gets items with target_channel set
- [ ] Fetches source article content
- [ ] Generates appropriate content for channel
- [ ] Validates quality gates
- [ ] Generates slug from title
- [ ] Routes to correct directory
- [ ] Commits to GitHub
- [ ] Updates pipeline record
- [ ] Sends notification email

---

*For schema details, see `/automation/docs/data_table_schemas.md`.*

*For architecture overview, see `/automation/docs/workflow_architecture.md`.*

*For quick start guide, see `/automation/docs/quick_start_guide.md`.*
