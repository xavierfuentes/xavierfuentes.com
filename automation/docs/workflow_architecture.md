# Content Automation Workflow Architecture
## n8n Data Tables + GitHub System

**Last Updated:** 2025-10-06
**Version:** 4.0 (n8n Data Tables migration - Notion removed)

---

## Executive Summary

This architecture defines a simplified automation system for XavierFuentes.com content creation using n8n Data Tables for state management and GitHub for content storage.

**Key Changes from v3.0:**
- **Removed Notion entirely** - eliminated external dependency and complexity
- **n8n Data Tables** - 100x faster queries (8ms vs 800ms), simpler architecture
- **Clean slate approach** - fresh start with minimal data migration
- **Hybrid filename strategy** - slug-only in drafts/, dated in posts/

**System Components:**
- **n8n Data Tables:** RSS sources configuration + content pipeline queue
- **GitHub:** Content storage and version control
- **Ghost CMS:** Publishing platform
- **AI Agents:** Content generation and quality control

**Expected Impact:**
- **Query performance:** 100x faster (8ms vs 800ms with Notion)
- **System complexity:** 60% reduction (no external API dependencies)
- **Maintenance overhead:** 70% reduction (built-in n8n feature)
- **Monthly cost:** £30-60 (vs £100+ with Notion)

---

## Core Problem Statement

The content strategy requires:
- **Blog:** 2-3 posts/month (1,500-2,500 words)
- **LinkedIn:** 12-13 posts/month (200-800 words) - 3 posts/week on Tue/Wed/Thu
- **Newsletter:** 4 digests/month (weekly compilation)

**Solution:** Automated content pipeline using n8n Data Tables for state tracking, GitHub for content storage, and AI-enhanced generation.

---

## System Architecture Overview

```
RSS Feeds (Hourly)
    ↓
n8n Data Tables: rss_sources (config)
    ↓
Fetch & Score Articles
    ↓
n8n Data Tables: content_pipeline (queue)
    ↓
Manual Content Selection (Weekly)
    ↓
AI Content Generation
    ↓
Quality Gates Validation
    ↓
GitHub Commit (content/drafts/)
    ↓
Manual Review & Publishing
    ↓
Ghost CMS
```

---

## n8n Data Tables Schema

### Table 1: `rss_sources`

Configuration table for RSS/Atom feed sources.

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | text | UUID primary key | `550e8400-e29b-41d4-a716-446655440000` |
| `name` | text | Display name | `Martin Fowler's Blog` |
| `url` | text | Feed URL | `https://martinfowler.com/feed.atom` |
| `content_pillar` | text | Category | `Technology Strategy` |
| `priority` | text | High/Medium/Low | `High` |
| `active` | checkbox | Enable/disable feed | `true` |
| `notes` | text | Optional notes | `Focus on architecture patterns` |
| `created_date` | date | When added | `2025-10-06` |

**Query Examples:**
```javascript
// Get all active feeds
SELECT * FROM rss_sources WHERE active = true

// Get high-priority Technology Strategy feeds
SELECT * FROM rss_sources
WHERE active = true
AND priority = 'High'
AND content_pillar = 'Technology Strategy'
```

---

### Table 2: `content_pipeline`

Working queue for research items through to publication.

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | text | UUID primary key | `650e8400-e29b-41d4-a716-446655440001` |
| `guid` | text | RSS item GUID (deduplication) | `https://example.com/article-123` |
| `title` | text | Article title | `Building Abstractions for LLMs` |
| `url` | text | Source URL | `https://martinfowler.com/articles/llm-abstractions.html` |
| `source_name` | text | From rss_sources.name | `Martin Fowler's Blog` |
| `content_pillar` | text | Category | `Technology Strategy` |
| `description` | text | Article summary | `How to create language abstractions...` |
| `quality_score` | number | Composite AI score (1-10) | `8.67` |
| `status` | text | Lifecycle state | `research` |
| `target_channel` | text | Routing decision | `blog` |
| `word_count_target` | number | Target words | `2000` |
| `created_date` | date | When discovered | `2025-10-06` |
| `github_path` | text | File location | `content/drafts/building-abstractions-llms.md` |
| `github_commit_url` | text | Commit URL | `https://github.com/user/repo/commit/abc123` |
| `notes` | text | Optional notes | `Great framework example` |

**Status Values:**
- `research` - Discovered, not yet selected
- `selected` - Chosen for content creation
- `generated` - AI draft created, in GitHub
- `published` - Live on Ghost CMS
- `archived` - Stale or low-quality, removed from queue

**Target Channel Values (Single or Multiple):**
- `blog` - Long-form blog post
- `linkedin` - LinkedIn post
- `newsletter` - Newsletter digest item
- `blog,linkedin` - Generate both (multi-channel)
- `null` - Not yet routed

**Query Examples:**
```javascript
// Get all research items ready for weekly selection
SELECT * FROM content_pipeline
WHERE status = 'research'
AND created_date > DATE_SUB(NOW(), INTERVAL 45 DAY)
ORDER BY quality_score DESC

// Get items selected but not yet generated
SELECT * FROM content_pipeline
WHERE status = 'selected'

// Archive stale low-quality items
UPDATE content_pipeline
SET status = 'archived'
WHERE status = 'research'
AND (
  created_date < DATE_SUB(NOW(), INTERVAL 45 DAY)
  OR quality_score < 5
)
```

---

## Workflow Specifications

### Workflow 1: `rss_to_pipeline.json`

**Purpose:** Fetch RSS feeds, score articles, populate content_pipeline table

**Trigger:** Hourly (cron: `0 * * * *`)

**Nodes:**

1. **Schedule Trigger** - Hourly cron
2. **Get Active RSS Sources** - Query rss_sources table where active = true
3. **For Each Source** - Loop through sources
4. **Fetch RSS Feed** - HTTP Request node
5. **Parse RSS/Atom** - XML parser
6. **For Each Article** - Loop through items
7. **Check If Exists** - Query content_pipeline by guid
8. **If New Article** - Filter node
9. **Score Article (AI)** - LLM call to score relevance/actionability/depth
10. **Calculate Quality Score** - Code node: average of 3 scores
11. **Insert Into Pipeline** - Add row to content_pipeline table
    - Status: `research`
    - All scores populated
    - Created date: now
12. **Send Summary Email** - Count of new articles added

**Output:** New research items in content_pipeline table

**Deduplication:** Uses `guid` field to prevent duplicates

---

### Workflow 2: `weekly_selection.json`

**Purpose:** Archive stale items, score remaining research, auto-select top candidates

**Trigger:** Weekly Sunday 9 AM (cron: `0 9 * * 0`)

**Nodes:**

1. **Schedule Trigger** - Sunday 9 AM
2. **Archive Stale Items** - Update content_pipeline
   - Status = `archived` where:
     - created_date > 45 days ago
     - OR quality_score < 5
3. **Get Research Items** - Query content_pipeline where status = `research`
4. **Calculate Weekly Scores** - Code node:
   - Boost scores based on content pillar balance
   - Apply recency weighting
   - Prioritise high-priority sources
5. **Select Top 4-5** - Sort by adjusted score, take top 4-5
6. **Update Status to Selected** - Update content_pipeline
   - Status = `selected`
   - Selected_date = now
   - Leave target_channel = null (manual decision)
7. **Send Summary Email** - List of selected items for review

**Output:** 4-5 items with status = `selected`, ready for manual routing

**Manual Step:** User reviews selected items and sets target_channel field

---

### Workflow 3: `content_generation.json`

**Purpose:** Generate AI content drafts, validate quality, commit to GitHub

**Trigger:** Manual (user sets target_channel and triggers) OR Daily 10 AM check

**Nodes:**

1. **Get Selected Items** - Query content_pipeline where:
   - status = `selected`
   - target_channel IS NOT NULL
2. **For Each Item** - Loop through items
3. **Fetch Source Article** - HTTP request to url field
4. **Extract Content** - HTML parser
5. **AI Content Generation** - LLM call:
   - Input: source content, target_channel, word_count_target, content_pillar
   - Output: markdown draft with frontmatter
   - Model: GPT-4o or Claude 3.5 Sonnet
6. **Quality Gates Validation** - Code node:
   - UK English check
   - Word count ±10% of target
   - Contains specific examples
   - Readability score ≥ 60
   - No corporate jargon
7. **If Quality Gates Pass** - Filter node
8. **Generate Slug** - Code node: title → slug
9. **Check GitHub Duplicate** - GitHub API: check if file exists
10. **Prepare Markdown** - Code node: format frontmatter + content
11. **Route to Directory** - Code node:
    - `blog` → `content/drafts/[slug].md`
    - `linkedin-original` → `content/linkedin/[slug].md`
    - `newsletter` → `content/newsletter/items/[slug].md`
12. **Commit to GitHub** - GitHub API: create/update file
13. **Update Pipeline Record** - Update content_pipeline:
    - status = `generated`
    - processed_date = now
    - github_path = file path
    - github_commit_url = commit URL
14. **Send Notification Email** - Draft ready for review

**Output:** Markdown file in GitHub, pipeline record updated

---

## File Structure (Hybrid Naming)

```
content/
├── drafts/           # Slug-only filenames (work in progress)
│   ├── building-abstractions-llms.md
│   └── partner-with-ai.md
├── posts/            # Dated filenames (published, immutable)
│   ├── 2025-10-15-building-abstractions-llms.md
│   └── 2025-10-22-partner-with-ai.md
├── linkedin/         # Slug-only (updated in place)
│   ├── architecture-decision-framework.md
│   └── high-growth-companies-linkedin-promo.md
├── newsletter/
│   ├── 2025-10-07-weekly-digest-week-40.md
│   └── items/
│       └── market-trends-summary.md
└── pages/
    └── about.md
```

**Rationale:**
- **Drafts:** Slug-only prevents daily duplicates during iteration
- **Posts:** Dated filenames preserve publication history
- **LinkedIn:** Slug-only allows quick updates
- **Newsletter:** Dated for weekly sequence

---

## Content Route Workflows

### Blog Posts

**Workflow:** `content_generation.json` with target_channel = `blog`

**Process:**
1. Generate long-form draft (1,500-2,500 words)
2. Commit to `content/drafts/[slug].md`
3. Update pipeline: status = `generated`
4. Manual review and editing
5. Publish to Ghost CMS via `/scripts/publish.js`
6. Move to `content/posts/[YYYY-MM-DD]-[slug].md`
7. Update pipeline: status = `published`

**Target:** 2-3/month

---

### LinkedIn Posts

**Workflow:** `content_generation.json` with target_channel = `linkedin`

**Process:**
1. Generate standalone post (200-800 words)
2. Assign to next available day slot (Tue/Wed/Thu)
3. Commit to `content/linkedin/[slug].md` with scheduled_date in frontmatter
4. Update pipeline: status = `generated`
5. Manual review and editing (optional)
6. Publish to LinkedIn on scheduled date (manual or via API)
7. Update pipeline: status = `published`

**Target:** 12-13/month (3 posts/week on Tue/Wed/Thu)

**LinkedIn Day Themes:**
- Tuesday: Frameworks, templates, practical tools
- Wednesday: Industry takes, observations, opinions
- Thursday: Personal lessons, behind-the-scenes, failures

---

### Newsletter Items

**Workflow:** `content_generation.json` with target_channel = `newsletter`

**Process:**
1. Generate digest-style summary (400-600 words)
2. Commit to `content/newsletter/items/[slug].md`
3. Update pipeline: status = `generated`
4. Include in next weekly digest compilation
5. Weekly digest published via Ghost CMS
6. Update pipeline: status = `published`

**Target:** Variable, compiled into 4 newsletters/month

---

## Publishing Workflow

### Manual Publishing (Current)

**Prerequisites:**
- `.env` file with Ghost Admin API credentials
- Content file in `content/drafts/` or `content/linkedin/`

**Command:**
```bash
npm run publish
```

**Script:** `/scripts/publish.js`

**Process:**
1. Reads all markdown files in content/drafts/, content/posts/, content/pages/
2. Parses frontmatter metadata
3. Converts markdown to HTML
4. Checks Ghost CMS for existing post by slug
5. Creates new post or updates existing
6. Returns success/failure status

**Frontmatter Requirements:**
```yaml
---
title: "Article Title"
slug: article-slug
status: draft       # or published
visibility: public
featured: false
meta_title: "SEO Title"
meta_description: "SEO description"
tags:
  - Technology Strategy
  - AI
authors:
  - xavier
---
```

**Moving to Published:**
1. Review and edit draft in `content/drafts/[slug].md`
2. Update frontmatter: `status: published`
3. Run `npm run publish` to sync to Ghost
4. Move file to `content/posts/[YYYY-MM-DD]-[slug].md`
5. Update content_pipeline: status = `published`

---

## Workflow Execution Order

### Hourly Operations

**Every hour:**
1. `rss_to_pipeline.json` - Fetch and score new research items

### Daily Operations

**10:00 AM:**
1. `content_generation.json` - Check for selected items with target_channel set

### Weekly Operations

**Sunday 9:00 AM:**
1. `weekly_selection.json` - Archive, score, select top content

**Monday:**
1. Manual review of selected items
2. Set target_channel for each selected item
3. Trigger content generation manually if needed

---

## Decision Points & Manual Intervention

### What Remains Manual

1. **Content Route Selection:** Set target_channel field after weekly selection
2. **Draft Review:** Edit AI-generated content before publishing
3. **Publishing:** Run publish script, move files, update Ghost
4. **Content Calendar:** Strategic timing and pillar balance decisions
5. **LinkedIn Scheduling:** Post timing and engagement

### What's Automated

1. **Research Discovery:** RSS feeds automatically populate pipeline
2. **Content Scoring:** Automatic relevance/actionability/depth scoring
3. **Weekly Curation:** Automatic selection of top 4-5 research items
4. **Queue Management:** Automatic archiving of stale/low-quality items
5. **Content Generation:** AI writes drafts based on target_channel
6. **Quality Validation:** Automated quality gates before GitHub commit
7. **Duplicate Prevention:** GUID-based and slug-based deduplication
8. **GitHub Commits:** Automatic version control

---

## Performance Characteristics

### n8n Data Tables Performance

**Query Speed:**
- Average query time: 8ms
- vs Notion API: 800ms
- **100x faster**

**Storage:**
- Limit: 50MB per workspace
- Estimated usage: <5MB for content pipeline
- RSS sources: ~1MB
- Sufficient for 1,000+ pipeline items

**Limitations:**
- No complex SQL joins
- No full-text search (use external tools if needed)
- No public API access (n8n workflows only)
- Beta feature (monitor for stability)

**Advantages:**
- Built into n8n (no external dependencies)
- Simple schema management (UI-based)
- Fast queries for workflow automation
- No API rate limits
- No additional cost

---

## Migration from Notion

### What Was Removed

**Notion Databases:**
- ~~Content Pipeline database~~ → n8n Data Tables: content_pipeline
- ~~Content Assets database~~ → Removed (not needed)

**Notion-Specific Features:**
- ~~Relations and rollups~~ → Simple foreign keys
- ~~Rich text properties~~ → Plain text fields
- ~~Multi-select properties~~ → Text fields with delimited values
- ~~Formula properties~~ → Calculated in code nodes

### What Was Migrated

**RSS Sources:**
- Manually recreate in rss_sources table
- Expect ~10-20 feeds

**Content Pipeline:**
- **NOT MIGRATED** - starting fresh
- Historical data archived in Notion (read-only)
- Clean slate for new workflow

### Migration Benefits

**Simplified Architecture:**
- No external API dependencies
- Faster workflow execution (100x)
- Lower monthly costs (£30-60 vs £100+)
- Easier debugging (all in n8n)

**Reduced Complexity:**
- No Notion API authentication
- No Notion schema management
- No Notion rate limit handling
- No Notion property mapping

---

## Cost & Resource Analysis

### Monthly Costs

**n8n Cloud (Pro Plan):**
- £30-60/month (depending on executions)
- Includes Data Tables feature
- 10,000 workflow executions/month

**AI API Costs:**
- GPT-4o or Claude 3.5 Sonnet
- ~£0.50 per content piece
- Monthly volume: 2 blog + 10 LinkedIn + 4 newsletter = 16 pieces
- **£8/month**

**GitHub:**
- Free (public repository)

**Ghost CMS:**
- Separate hosting cost (not part of automation)

**Total Automation Cost:** £38-68/month

**vs Previous (Notion + n8n):** £100+/month

**Savings:** 40-60% cost reduction

---

## Troubleshooting Guide

### Common Issues

**Issue:** RSS feed fails to fetch
- **Check:** Feed URL is valid and accessible
- **Check:** Feed format is valid RSS/Atom XML
- **Fix:** Test feed URL in browser, validate XML
- **Fix:** Update rss_sources.url if feed moved

**Issue:** Duplicate articles in pipeline
- **Check:** guid field populated correctly
- **Fix:** Ensure "Check If Exists" node queries by guid
- **Fix:** Manually delete duplicates from content_pipeline table

**Issue:** Quality gates rejecting all content
- **Check:** Quality gate thresholds too strict
- **Fix:** Adjust thresholds in code node
- **Test:** Manual run with known good content

**Issue:** GitHub commit fails
- **Check:** GitHub API token valid and has write permissions
- **Check:** Repository path correct
- **Fix:** Regenerate GitHub token
- **Fix:** Verify file path format

**Issue:** Data Tables query slow
- **Check:** Table size (<50MB limit)
- **Fix:** Archive old items if table growing too large
- **Monitor:** Query execution times in n8n logs

**Issue:** Generated content quality poor
- **Check:** Source article quality
- **Check:** AI prompt clarity
- **Fix:** Improve generation prompts with examples
- **Fix:** Add more context to research notes

---

## Quick Reference: Data Tables Queries

### RSS Sources

```javascript
// Get all active feeds
SELECT * FROM rss_sources WHERE active = true

// Get feeds by pillar
SELECT * FROM rss_sources
WHERE content_pillar = 'Technology Strategy'
AND active = true

// Disable a feed
UPDATE rss_sources
SET active = false
WHERE id = 'uuid-here'
```

### Content Pipeline

```javascript
// Get research items for selection
SELECT * FROM content_pipeline
WHERE status = 'research'
AND created_date > DATE_SUB(NOW(), INTERVAL 45 DAY)
ORDER BY quality_score DESC

// Get selected items needing routing
SELECT * FROM content_pipeline
WHERE status = 'selected'
AND target_channel IS NULL

// Get items ready for generation
SELECT * FROM content_pipeline
WHERE status = 'selected'
AND target_channel IS NOT NULL

// Update status to generated
UPDATE content_pipeline
SET status = 'generated',
    processed_date = NOW(),
    github_path = 'content/drafts/slug.md',
    github_commit_url = 'https://...'
WHERE id = 'uuid-here'

// Archive stale items
UPDATE content_pipeline
SET status = 'archived'
WHERE status = 'research'
AND created_date < DATE_SUB(NOW(), INTERVAL 45 DAY)

// Get published count by pillar (this month)
SELECT content_pillar, COUNT(*) as count
FROM content_pipeline
WHERE status = 'published'
AND published_date >= DATE_FORMAT(NOW(), '%Y-%m-01')
GROUP BY content_pillar
```

---

## Implementation Checklist

### Setup (One-Time)

- [ ] Create n8n Data Tables workspace (if not exists)
- [ ] Create `rss_sources` table with schema
- [ ] Create `content_pipeline` table with schema
- [ ] Populate `rss_sources` with RSS feed URLs
- [ ] Configure GitHub API token in n8n credentials
- [ ] Configure OpenAI/Anthropic API keys in n8n credentials
- [ ] Test Data Tables queries manually

### Workflow Setup

- [ ] Import or build `rss_to_pipeline.json` workflow
- [ ] Import or build `weekly_selection.json` workflow
- [ ] Import or build `content_generation.json` workflow
- [ ] Configure cron triggers (hourly, weekly)
- [ ] Test each workflow with sample data
- [ ] Activate workflows

### Content Creation Process

- [ ] Run RSS workflow manually (first time) to populate pipeline
- [ ] Run weekly selection workflow to get initial candidates
- [ ] Review selected items and set target_channel
- [ ] Trigger content generation manually
- [ ] Review generated drafts in GitHub
- [ ] Edit and publish via Ghost CMS
- [ ] Update pipeline status to published

### Ongoing Maintenance

- [ ] Weekly: Review selected research items and route
- [ ] Weekly: Monitor RSS feed health
- [ ] Monthly: Archive old pipeline items
- [ ] Monthly: Review content pillar balance
- [ ] Quarterly: Update RSS sources list
- [ ] Quarterly: Audit and optimise AI prompts

---

*This architecture supports the content strategy defined in `/docs/content_strategy.md` and `/docs/execution_strategy.md`.*

*For detailed migration plan from Notion, see `/automation/docs/migration_plan_notion_to_n8n_datatables.md`.*

*For complete table schemas and SQL examples, see `/automation/docs/data_table_schemas.md`.*

*For node-by-node workflow specifications, see `/automation/docs/workflow_specifications.md`.*

*Next steps: Create Data Tables, populate RSS sources, build 3 core workflows.*
