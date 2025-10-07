# n8n Data Tables Schema Documentation

**Last Updated:** 2025-10-06
**Version:** 1.0

---

## Overview

This document provides complete schema definitions for the two n8n Data Tables used in the content automation system:

1. **rss_sources** - RSS feed configuration
2. **content_pipeline** - Content workflow queue

**Performance:**
- Query time: ~8ms average
- Storage limit: 50MB per workspace
- No complex SQL joins or full-text search
- n8n workflows only (no external API access)

---

## Table 1: rss_sources

### Purpose

Configuration table for RSS/Atom feed sources. Defines which feeds to monitor, their priority, content pillar mapping, and active status.

### Schema

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| `id` | text | PRIMARY KEY | UUID v4 (auto-generated or manual) |
| `name` | text | NOT NULL | Human-readable feed name |
| `url` | text | NOT NULL, UNIQUE | Full RSS/Atom feed URL |
| `content_pillar` | text | NOT NULL | One of: Technology Strategy, Leadership & Management, Execution & Delivery, Founder Lessons, Market & AI Trends |
| `priority` | text | NOT NULL | One of: High, Medium, Low |
| `active` | checkbox | NOT NULL, DEFAULT true | Whether to fetch this feed |
| `notes` | text | NULL | Optional notes about feed focus or characteristics |
| `created_date` | date | NOT NULL, DEFAULT NOW() | When feed was added |

### Example Data

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Martin Fowler's Blog",
    "url": "https://martinfowler.com/feed.atom",
    "content_pillar": "Technology Strategy",
    "priority": "High",
    "active": true,
    "notes": "Focus on architecture patterns, refactoring, and enterprise development",
    "created_date": "2025-10-06"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Pragmatic Engineer",
    "url": "https://blog.pragmaticengineer.com/rss/",
    "content_pillar": "Leadership & Management",
    "priority": "High",
    "active": true,
    "notes": "Engineering culture, compensation, org design",
    "created_date": "2025-10-06"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "name": "Lenny's Newsletter",
    "url": "https://www.lennysnewsletter.com/feed",
    "content_pillar": "Founder Lessons",
    "priority": "Medium",
    "active": true,
    "notes": "Product management, growth, startup advice",
    "created_date": "2025-10-06"
  }
]
```

### Common Queries

#### Get All Active Feeds

```sql
SELECT * FROM rss_sources
WHERE active = true
ORDER BY priority DESC, name ASC
```

#### Get Feeds by Content Pillar

```sql
SELECT * FROM rss_sources
WHERE content_pillar = 'Technology Strategy'
AND active = true
ORDER BY priority DESC
```

#### Get High-Priority Feeds Only

```sql
SELECT * FROM rss_sources
WHERE priority = 'High'
AND active = true
```

#### Disable a Feed

```sql
UPDATE rss_sources
SET active = false
WHERE id = '550e8400-e29b-41d4-a716-446655440000'
```

#### Add New Feed

```sql
INSERT INTO rss_sources (id, name, url, content_pillar, priority, active, notes, created_date)
VALUES (
  '550e8400-e29b-41d4-a716-446655440099',
  'Kent Beck on Medium',
  'https://medium.com/feed/@kentbeck',
  'Technology Strategy',
  'Medium',
  true,
  'Extreme programming, test-driven development',
  NOW()
)
```

### Usage in Workflows

**rss_to_pipeline.json:**
1. Fetch all active feeds
2. Loop through each feed
3. Parse RSS/Atom XML
4. Extract articles
5. Insert into content_pipeline

**Manual Management:**
- Add feeds via n8n UI or workflow
- Update priority based on content quality
- Disable low-performing feeds
- Update content pillar mapping if needed

---

## Table 2: content_pipeline

### Purpose

Working queue for content items from RSS discovery through to publication. Tracks the complete lifecycle: research → selected → generated → published → archived.

### Schema

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| `id` | text | PRIMARY KEY | UUID v4 (auto-generated) |
| `guid` | text | NOT NULL, UNIQUE | RSS item GUID for deduplication |
| `title` | text | NOT NULL | Article title from RSS feed |
| `url` | text | NOT NULL | Source article URL |
| `source_name` | text | NOT NULL | From rss_sources.name (denormalized) |
| `content_pillar` | text | NOT NULL | From rss_sources.content_pillar |
| `description` | text | NULL | Article summary/excerpt from RSS |
| `quality_score` | number | NULL, 1-10 | AI-scored composite quality (relevance + actionability + depth) |
| `status` | text | NOT NULL, DEFAULT 'research' | Lifecycle state (see Status Values) |
| `target_channel` | text | NULL | Content route decision (see Target Channel Values) |
| `word_count_target` | number | NULL | Target word count for generation |
| `created_date` | date | NOT NULL, DEFAULT NOW() | When discovered in RSS feed |
| `github_path` | text | NULL | File path in GitHub repo |
| `github_commit_url` | text | NULL | Full commit URL for reference |
| `notes` | text | NULL | Optional manual notes |

### Status Values (Lifecycle)

| Status | Description | Next Action |
|--------|-------------|-------------|
| `research` | Discovered from RSS, not yet selected | Weekly selection review |
| `selected` | Chosen for content creation | User sets target_channel |
| `generated` | AI draft created, committed to GitHub | User reviews and edits |
| `published` | Live on Ghost CMS | Track performance |
| `archived` | Stale (45+ days) or low-quality (<5) | None (removed from queue) |

### Target Channel Values

**Format:** Single value or comma-separated multiple values

| Channel | Description | Output Location | Word Count |
|---------|-------------|-----------------|------------|
| `blog` | Long-form blog post | `content/drafts/[slug].md` | 1,500-2,500 |
| `linkedin` | LinkedIn post | `content/linkedin/[slug].md` | 200-800 |
| `newsletter` | Newsletter digest item | `content/newsletter/items/[slug].md` | 400-600 |
| `null` | Not yet routed (manual decision pending) | N/A | N/A |

**Multi-Channel Examples:**
- `blog` - Blog post only
- `linkedin` - LinkedIn post only
- `blog,linkedin` - Generate both blog AND LinkedIn from same source
- `blog,linkedin,newsletter` - Generate all three (rare, for exceptional content)

### Example Data

```json
[
  {
    "id": "650e8400-e29b-41d4-a716-446655440001",
    "guid": "https://martinfowler.com/articles/llm-abstractions.html",
    "title": "Building a Language of Abstractions for LLMs",
    "url": "https://martinfowler.com/articles/llm-abstractions.html",
    "source_name": "Martin Fowler's Blog",
    "content_pillar": "Technology Strategy",
    "description": "How to grow a language of abstractions when working with large language models...",
    "quality_score": 8.67,
    "status": "selected",
    "target_channel": "blog",
    "word_count_target": 2000,
    "created_date": "2025-10-06",
    "github_path": null,
    "github_commit_url": null,
    "notes": "Great framework example, strong CTO perspective"
  },
  {
    "id": "650e8400-e29b-41d4-a716-446655440002",
    "guid": "https://blog.pragmaticengineer.com/engineering-compensation-2025/",
    "title": "Engineering Compensation Trends 2025",
    "url": "https://blog.pragmaticengineer.com/engineering-compensation-2025/",
    "source_name": "Pragmatic Engineer",
    "content_pillar": "Leadership & Management",
    "description": "Analysis of engineering compensation trends across markets...",
    "quality_score": 7.33,
    "status": "generated",
    "target_channel": "linkedin",
    "word_count_target": 600,
    "created_date": "2025-10-05",
    "github_path": "content/linkedin/engineering-compensation-trends-2025.md",
    "github_commit_url": "https://github.com/user/repo/commit/abc123def456",
    "notes": null
  },
  {
    "id": "650e8400-e29b-41d4-a716-446655440003",
    "guid": "https://example.com/multi-channel-article",
    "title": "Building Platform Teams That Scale",
    "url": "https://example.com/platform-teams",
    "source_name": "Example Blog",
    "content_pillar": "Technology Strategy",
    "description": "Comprehensive guide to platform engineering...",
    "quality_score": 9.2,
    "status": "selected",
    "target_channel": "blog,linkedin",
    "word_count_target": null,
    "created_date": "2025-10-06",
    "github_path": null,
    "github_commit_url": null,
    "notes": "Exceptional quality - generate for both channels"
  }
]
```

### Common Queries

#### Get Research Items for Weekly Selection

```sql
SELECT *
FROM content_pipeline
WHERE status = 'research'
AND created_date > DATE_SUB(NOW(), INTERVAL 45 DAY)
ORDER BY quality_score DESC, created_date DESC
LIMIT 20
```

#### Get Selected Items Needing Routing

```sql
SELECT id, title, source_name, content_pillar, quality_score, created_date
FROM content_pipeline
WHERE status = 'selected'
AND target_channel IS NULL
ORDER BY selected_date ASC
```

#### Get Items Ready for Generation

```sql
SELECT *
FROM content_pipeline
WHERE status = 'selected'
AND target_channel IS NOT NULL
ORDER BY selected_date ASC
```

#### Archive Stale Low-Quality Items

```sql
UPDATE content_pipeline
SET status = 'archived'
WHERE status = 'research'
AND (
  created_date < DATE_SUB(NOW(), INTERVAL 45 DAY)
  OR quality_score < 5
)
```

#### Update Status After Generation

```sql
UPDATE content_pipeline
SET
  status = 'generated',
  processed_date = NOW(),
  github_path = 'content/drafts/building-abstractions-llms.md',
  github_commit_url = 'https://github.com/user/repo/commit/abc123'
WHERE id = '650e8400-e29b-41d4-a716-446655440001'
```

#### Get Published Count by Pillar (This Month)

```sql
SELECT
  content_pillar,
  COUNT(*) as count
FROM content_pipeline
WHERE status = 'published'
AND processed_date >= DATE_FORMAT(NOW(), '%Y-%m-01')
GROUP BY content_pillar
ORDER BY count DESC
```

#### Get Generated Drafts Pending Review

```sql
SELECT
  id,
  title,
  target_channel,
  github_path,
  processed_date
FROM content_pipeline
WHERE status = 'generated'
ORDER BY processed_date DESC
```

#### Check for Duplicate by GUID

```sql
SELECT id, title, status
FROM content_pipeline
WHERE guid = 'https://example.com/article-123'
LIMIT 1
```

### Content Pillar Distribution Analysis

```sql
SELECT
  content_pillar,
  COUNT(*) as total,
  SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
  AVG(quality_score) as avg_quality
FROM content_pipeline
WHERE status IN ('selected', 'generated', 'published')
GROUP BY content_pillar
ORDER BY total DESC
```

### Weekly Selection Analysis

```sql
SELECT
  DATE_FORMAT(selected_date, '%Y-W%u') as week,
  COUNT(*) as selected_count,
  SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published_count
FROM content_pipeline
WHERE selected_date IS NOT NULL
AND selected_date > DATE_SUB(NOW(), INTERVAL 12 WEEK)
GROUP BY week
ORDER BY week DESC
```

---

## Data Management Best Practices

### Deduplication Strategy

**RSS GUID:**
- Always check if `guid` exists before inserting
- Use RSS feed's `<guid>` or `<id>` element
- Fallback to `url` if no GUID available

**Example Check:**
```sql
SELECT COUNT(*) FROM content_pipeline WHERE guid = 'article-guid-here'
```

### Archiving Strategy

**Auto-Archive Criteria:**
- Status = `research` AND created_date > 45 days ago
- Status = `research` AND quality_score < 5
- Run weekly via `weekly_selection.json` workflow

**Manual Archive:**
- User decides research item not relevant
- Duplicate discovered after initial insert
- Source article deleted or moved

### Data Retention

**Keep Forever:**
- All `published` items (historical record)
- All `generated` items (drafts for future use)

**Archive After 90 Days:**
- `research` items (stale content)
- `selected` items never processed (abandoned)

**Delete Never:**
- Even archived items are kept for analytics
- Future: consider export/backup before deletion if storage becomes issue

---

## Schema Migration Notes

### From Notion to n8n Data Tables

**Content Pipeline Database → content_pipeline Table:**

**Migrated Fields:**
- Title → title
- Status → status (with value mapping)
- Content Pillar → content_pillar
- Relevance/Actionability/Depth Scores → same names
- GitHub Draft URL → github_path + github_commit_url (split)

**Removed Fields:**
- Relations (Parent Post, etc.) - not needed
- Rollups (Atomized Pieces Count, etc.) - calculated in workflows
- Multi-select (AI Agents Used) - simplified
- Performance tracking (moved to separate analytics)
- Voice Profile flags (part of AI prompt context)

**New Fields:**
- guid (for deduplication)
- source_name (denormalized from rss_sources)
- target_channel (routing decision)
- word_count_target (generation parameter)

**Not Migrated:**
- Historical Notion data (archived in Notion, read-only)
- Starting fresh with clean pipeline

### Content Assets Database → Removed

**Rationale:**
- Was tracking repurposed content (blog → LinkedIn variants)
- Caused complexity without clear value
- Duplicate prevention now handled by slug checks in GitHub
- Atomization tracking moved to file structure (`content/atomized/[slug]/`)

---

## Performance Tuning

### Query Optimization

**Indexed Columns** (automatic in n8n Data Tables):
- `id` (primary key)
- `guid` (unique constraint)
- `status` (frequently filtered)

**Best Practices:**
- Always filter by `status` first (most selective)
- Use date range filters to limit result set
- Avoid `SELECT *` when you only need specific columns
- Use `LIMIT` on queries that might return many rows

### Storage Management

**Current Usage Estimate:**
- rss_sources: ~1KB per row × 20 feeds = 20KB
- content_pipeline: ~2KB per row × 500 items = 1MB
- **Total: ~1.02MB (well under 50MB limit)**

**Growth Projection:**
- Add ~100 items/month to pipeline
- Archive old items quarterly
- Estimate 5-10MB usage after 1 year

**Mitigation If Approaching Limit:**
- Hard delete `archived` items older than 1 year
- Export historical data to GitHub JSON backups
- Compress `description` field (reduce excerpt length)

---

## Troubleshooting

### Issue: Duplicate Articles in Pipeline

**Symptoms:** Same article appears multiple times

**Diagnosis:**
```sql
SELECT guid, COUNT(*) as count
FROM content_pipeline
GROUP BY guid
HAVING count > 1
```

**Fix:**
```sql
-- Keep oldest entry, delete duplicates
DELETE FROM content_pipeline
WHERE id NOT IN (
  SELECT MIN(id) FROM content_pipeline GROUP BY guid
)
```

**Prevention:** Ensure "Check If Exists" node in `rss_to_pipeline.json` queries by `guid` before insert

### Issue: Orphaned Selected Items

**Symptoms:** Items with status = 'selected' but no target_channel after weeks

**Diagnosis:**
```sql
SELECT * FROM content_pipeline
WHERE status = 'selected'
AND target_channel IS NULL
AND selected_date < DATE_SUB(NOW(), INTERVAL 14 DAY)
```

**Fix:**
```sql
-- Return to research or archive
UPDATE content_pipeline
SET status = 'research', selected_date = NULL
WHERE status = 'selected'
AND target_channel IS NULL
AND selected_date < DATE_SUB(NOW(), INTERVAL 14 DAY)
```

### Issue: Status Values Inconsistent

**Symptoms:** Status field has unexpected values (typos, old values)

**Diagnosis:**
```sql
SELECT DISTINCT status FROM content_pipeline
```

**Expected:** research, selected, generated, published, archived

**Fix:**
```sql
-- Standardise typos
UPDATE content_pipeline SET status = 'research' WHERE status = 'Research'
UPDATE content_pipeline SET status = 'archived' WHERE status = 'archive'
```

---

## Quick Reference Card

### RSS Sources Table

**Purpose:** Feed configuration
**Size:** ~20 rows
**Key Fields:** name, url, content_pillar, priority, active

**Common Operations:**
- Get active feeds: `WHERE active = true`
- Disable feed: `UPDATE SET active = false WHERE id = '...'`
- Add feed: `INSERT INTO...`

### Content Pipeline Table

**Purpose:** Content workflow queue
**Size:** ~100-500 rows (active), archived items accumulate
**Key Fields:** guid (unique), title, status, target_channel

**Lifecycle:** research → selected → generated → published (or archived)

**Common Operations:**
- Weekly selection: `WHERE status = 'research' AND created_date > 45 days`
- Ready for generation: `WHERE status = 'selected' AND target_channel IS NOT NULL`
- Archive stale: `UPDATE SET status = 'archived' WHERE...`

**Performance:** 8ms average query time, 50MB storage limit

---

## Appendix: Field Validation Rules

### rss_sources

| Field | Validation |
|-------|------------|
| id | Must be valid UUID v4 |
| name | 1-200 characters, no special chars except spaces/hyphens |
| url | Valid HTTP/HTTPS URL, must return RSS/Atom XML |
| content_pillar | One of 5 exact values (see schema) |
| priority | One of: High, Medium, Low (case-sensitive) |
| active | Boolean (checkbox) |
| notes | 0-500 characters, optional |
| created_date | Valid date, YYYY-MM-DD format |

### content_pipeline

| Field | Validation |
|-------|------------|
| id | Must be valid UUID v4 |
| guid | Unique across table, typically URL or hash |
| title | 1-300 characters |
| url | Valid HTTP/HTTPS URL |
| source_name | Must match a rss_sources.name |
| content_pillar | One of 5 exact values |
| description | 0-1000 characters, optional |
| quality_score | Float 1.0-10.0 or NULL (composite AI score) |
| status | One of: research, selected, generated, published, archived |
| target_channel | Single or comma-separated: blog, linkedin, newsletter, or NULL |
| word_count_target | Integer 200-3000 or NULL |
| created_date | Valid date, YYYY-MM-DD format |
| github_path | Relative path in repo, e.g. "content/drafts/slug.md" |
| github_commit_url | Full GitHub commit URL or NULL |
| notes | 0-1000 characters, optional |

---

*For workflow usage of these tables, see `/automation/docs/workflow_specifications.md`.*

*For architecture overview, see `/automation/docs/workflow_architecture.md`.*

*For quick start guide, see `/automation/docs/quick_start_guide.md`.*
