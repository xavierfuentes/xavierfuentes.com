# n8n Data Tables Schema Documentation

**Last Updated:** 24/12/2024
**Version:** 2.0 (Simplified for Content OS)

---

## Overview

This document defines the schemas for the two n8n Data Tables used in the research discovery system:

1. **rss_sources** - RSS feed configuration
2. **research_items** - Research discovery queue (renamed from content_pipeline)

**Key Changes from v1.0:**
- Renamed `content_pipeline` → `research_items` (clearer purpose)
- Simplified status values: `new` / `reviewed` / `promoted` / `archived`
- Removed content generation fields (target_channel, word_count_target, github_path)
- Added `idea_id` to link research items to Content OS ideas

---

## Table 1: rss_sources

### Purpose

Configuration table for RSS/Atom feed sources. Defines which feeds to monitor, their content pillar mapping, and priority.

### Schema

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | text | Yes | UUID v4 primary key |
| `name` | text | Yes | Human-readable feed name |
| `url` | text | Yes | Full RSS/Atom feed URL (unique) |
| `content_pillar` | text | Yes | One of the 5 pillars (see below) |
| `priority` | text | Yes | High / Medium / Low |
| `active` | checkbox | Yes | Whether to fetch this feed |
| `notes` | text | No | Optional notes about feed focus |
| `created_date` | date | Yes | When feed was added |

### Content Pillar Values

Must match one of these exactly:
- `Technology Strategy`
- `Leadership & Management`
- `Execution & Delivery`
- `Founder Lessons`
- `Market & AI Trends`

### Example Data

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Martin Fowler's Blog",
    "url": "https://martinfowler.com/feed.atom",
    "content_pillar": "Technology Strategy",
    "priority": "High",
    "active": true,
    "notes": "Architecture patterns, refactoring, enterprise development",
    "created_date": "2024-12-01"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "name": "Pragmatic Engineer",
    "url": "https://blog.pragmaticengineer.com/rss/",
    "content_pillar": "Leadership & Management",
    "priority": "High",
    "active": true,
    "notes": "Engineering culture, compensation, org design",
    "created_date": "2024-12-01"
  }
]
```

### Common Queries

```sql
-- Get all active feeds
SELECT * FROM rss_sources WHERE active = true ORDER BY priority DESC

-- Get feeds by pillar
SELECT * FROM rss_sources
WHERE content_pillar = 'Technology Strategy' AND active = true

-- Disable a feed
UPDATE rss_sources SET active = false WHERE id = 'uuid-here'
```

---

## Table 2: research_items

### Purpose

Research items discovered from RSS feeds. This is the discovery queue that surfaces interesting content for you to review and potentially promote to Ideas in the Content OS.

**Note:** This table does NOT track content creation. That's handled by the Content OS (`content/ideas/*.md`).

### Schema

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | text | Yes | UUID v4 primary key |
| `guid` | text | Yes | RSS item GUID for deduplication (unique) |
| `title` | text | Yes | Article title from RSS |
| `url` | text | Yes | Source article URL |
| `source_name` | text | Yes | From rss_sources.name |
| `content_pillar` | text | Yes | From rss_sources.content_pillar |
| `description` | text | No | Article summary/excerpt (max 500 chars) |
| `quality_score` | number | No | AI relevance score 1-10 |
| `status` | text | Yes | Lifecycle state (see below) |
| `created_date` | date | Yes | When discovered in RSS |
| `notes` | text | No | AI scoring reasoning |
| `idea_id` | text | No | Link to Content OS idea if promoted |

### Status Values

| Status | Description | Next Action |
|--------|-------------|-------------|
| `new` | Just discovered from RSS | Appears in weekly digest email |
| `reviewed` | Included in digest email | Promote to idea or let archive |
| `promoted` | Linked to a Content OS idea | Work on idea in Content OS |
| `archived` | Stale (45+ days) or low quality (<5) | None |

### Lifecycle

```
    new ──────────▶ reviewed ──────────▶ promoted
     │                 │                    │
     │                 │                    └── idea_id set, linked to Content OS
     │                 │
     └─────────────────┴──────▶ archived (auto after 45 days or score < 5)
```

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
    "quality_score": 8.5,
    "status": "new",
    "created_date": "2024-12-20",
    "notes": "Strong framework example, directly relevant to CTO decision-making",
    "idea_id": null
  },
  {
    "id": "650e8400-e29b-41d4-a716-446655440002",
    "guid": "https://blog.pragmaticengineer.com/engineering-strategy/",
    "title": "Engineering Strategy at Scale",
    "url": "https://blog.pragmaticengineer.com/engineering-strategy/",
    "source_name": "Pragmatic Engineer",
    "content_pillar": "Leadership & Management",
    "description": "How large tech companies approach engineering strategy...",
    "quality_score": 9.0,
    "status": "promoted",
    "created_date": "2024-12-15",
    "notes": "Exceptional depth, multiple actionable frameworks",
    "idea_id": "2024-12-engineering-strategy-scaleups"
  }
]
```

### Common Queries

```sql
-- Get new items for weekly digest (top 15 from last 7 days)
SELECT * FROM research_items
WHERE status = 'new'
AND created_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY quality_score DESC
LIMIT 15

-- Get items ready to archive
SELECT * FROM research_items
WHERE status IN ('new', 'reviewed')
AND (
  created_date < DATE_SUB(NOW(), INTERVAL 45 DAY)
  OR quality_score < 5
)
AND idea_id IS NULL

-- Mark as reviewed
UPDATE research_items SET status = 'reviewed' WHERE id = 'uuid-here'

-- Promote to idea
UPDATE research_items
SET status = 'promoted', idea_id = '2024-12-my-idea-slug'
WHERE id = 'uuid-here'

-- Archive stale items
UPDATE research_items
SET status = 'archived'
WHERE status IN ('new', 'reviewed')
AND created_date < DATE_SUB(NOW(), INTERVAL 45 DAY)
AND idea_id IS NULL

-- Count by pillar
SELECT content_pillar, COUNT(*) as count
FROM research_items
WHERE status != 'archived'
GROUP BY content_pillar
```

---

## Migration from content_pipeline

If you have an existing `content_pipeline` table from v1.0:

### Fields to Keep (renamed)

| Old Field | New Field | Notes |
|-----------|-----------|-------|
| `id` | `id` | Unchanged |
| `guid` | `guid` | Unchanged |
| `title` | `title` | Unchanged |
| `url` | `url` | Unchanged |
| `source_name` | `source_name` | Unchanged |
| `content_pillar` | `content_pillar` | Unchanged |
| `description` | `description` | Unchanged |
| `quality_score` | `quality_score` | Unchanged |
| `status` | `status` | Map values (see below) |
| `created_date` | `created_date` | Unchanged |
| `notes` | `notes` | Unchanged |
| - | `idea_id` | New field, set to null |

### Status Value Mapping

| Old Status | New Status |
|------------|------------|
| `research` | `new` |
| `selected` | `reviewed` |
| `generated` | `promoted` (if has github_path) or `archived` |
| `published` | `promoted` |
| `archived` | `archived` |

### Fields to Remove

These fields are no longer needed (content creation is handled by Content OS):

- `target_channel` - Ideas handle channel routing
- `word_count_target` - Not needed
- `github_path` - Content lives in `content/ideas/`
- `github_commit_url` - Not needed

### Migration Script

```sql
-- Create new table
CREATE TABLE research_items AS
SELECT
  id, guid, title, url, source_name, content_pillar,
  description, quality_score,
  CASE status
    WHEN 'research' THEN 'new'
    WHEN 'selected' THEN 'reviewed'
    WHEN 'generated' THEN 'promoted'
    WHEN 'published' THEN 'promoted'
    ELSE 'archived'
  END as status,
  created_date, notes,
  NULL as idea_id
FROM content_pipeline;

-- Or in n8n: export content_pipeline, transform, import as research_items
```

---

## Data Retention

### Keep Indefinitely

- All items with `idea_id` set (linked to Content OS)
- `rss_sources` configuration

### Auto-Archive (via pipeline_maintenance workflow)

- Items with status `new` or `reviewed` older than 45 days
- Items with quality_score < 5
- Exception: items with `idea_id` set are never auto-archived

### Storage Estimates

| Table | Est. Size/Row | Est. Rows | Total |
|-------|---------------|-----------|-------|
| rss_sources | ~500 bytes | 20 | ~10 KB |
| research_items | ~1 KB | 500 active | ~500 KB |
| **Total** | | | **~510 KB** |

Well under n8n's 50 MB limit.

---

## Integration with Content OS

### Linking Research to Ideas

When you promote a research item to an Idea using the `idea-builder` agent:

1. Agent creates `content/ideas/YYYY-MM-my-idea-slug.md`
2. You can optionally update `research_items.idea_id` with the idea slug
3. This creates a bidirectional link for tracking

### Querying from Claude

The `pipeline_maintenance` workflow exports `research_items.json`:

```json
{
  "generated_at": "2024-12-24T10:00:00Z",
  "total_count": 45,
  "by_status": {
    "new": 12,
    "reviewed": 30,
    "promoted": 3
  },
  "by_pillar": {
    "Technology Strategy": 18,
    "Leadership & Management": 15,
    "Execution & Delivery": 7,
    "Founder Lessons": 3,
    "Market & AI Trends": 2
  },
  "items": [
    {
      "id": "...",
      "title": "...",
      "url": "...",
      "quality_score": 8.5,
      "status": "new",
      "content_pillar": "Technology Strategy",
      "notes": "..."
    }
  ]
}
```

Claude agents can read this to:
- Suggest which research to promote
- Check what research exists before creating new ideas
- Balance content across pillars

---

## Quick Reference

### rss_sources

```
Purpose: Feed configuration
Key fields: name, url, content_pillar, priority, active
Queries: WHERE active = true
```

### research_items

```
Purpose: Research discovery queue
Key fields: title, url, quality_score, status, idea_id
Status lifecycle: new → reviewed → promoted OR → archived
Archiving: 45 days old OR score < 5
```

---

*For workflow details, see `/automation/docs/workflow_specifications.md`*

*For architecture overview, see `/automation/docs/workflow_architecture.md`*
