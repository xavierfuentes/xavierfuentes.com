# Content Automation Architecture
## n8n Discovery Layer + Claude Content OS

**Last Updated:** 24/12/2024
**Version:** 5.0 (Simplified for Content OS integration)

---

## Executive Summary

This architecture defines a **simplified** automation system for XavierFuentes.com that works alongside the Content OS. n8n handles discovery and curation; Claude agents handle content creation.

**Key Principles:**
- **n8n for discovery:** RSS fetching, scoring, digest emails, housekeeping
- **Claude for creation:** Ideas, drafting, projections, editorial review
- **Ideas as source of truth:** All content flows from `content/ideas/*.md`
- **Human in the loop:** You decide what becomes content, not automation

**What Changed from v4.0:**
- Removed content generation workflows (Claude agents do this better)
- Removed weekly auto-selection (strategy-agent + you decide)
- Simplified from 6 workflows to 3
- Renamed `content_pipeline` to `research_items` (clearer purpose)
- Added export bridge for Claude to query research

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     n8n (Discovery Layer)                    │
│                                                              │
│  ┌──────────────┐    ┌───────────────┐    ┌──────────────┐  │
│  │ RSS to       │    │ Weekly        │    │ Pipeline     │  │
│  │ Research     │───▶│ Research      │───▶│ Maintenance  │  │
│  │ (hourly)     │    │ Digest (Sun)  │    │ (Sun)        │  │
│  └──────────────┘    └───────────────┘    └──────────────┘  │
│         │                    │                    │          │
│         ▼                    ▼                    ▼          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              research_items (Data Table)              │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│                              ▼                               │
│                    research_items.json                       │
│                    (export for Claude)                       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼ You review digest email

┌─────────────────────────────────────────────────────────────┐
│                   Content OS (Claude Agents)                 │
│                                                              │
│  ┌────────────┐   ┌──────────┐   ┌───────────────────────┐  │
│  │ idea-      │──▶│ drafting │──▶│ projection agents     │  │
│  │ builder    │   │ agent    │   │ (blog/linkedin/brief) │  │
│  └────────────┘   └──────────┘   └───────────────────────┘  │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              content/ideas/*.md (Source of Truth)     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## n8n Workflows

### Workflow 1: RSS to Research

**File:** `workflows/rss_to_research.json`

**Purpose:** Discover articles from RSS feeds, score for relevance, store in research_items table.

**Trigger:** Hourly (cron: `0 * * * *`)

**Process:**
1. Get active RSS sources from `rss_sources` table
2. Fetch each feed, parse RSS/Atom XML
3. Check for duplicates by GUID
4. Score new articles with GPT-4o-mini (cost-effective)
5. Insert into `research_items` with status `new`

**Output:** New research items in `research_items` table

---

### Workflow 2: Weekly Research Digest

**File:** `workflows/weekly_research_digest.json`

**Purpose:** Email you the top research items from the past week for review.

**Trigger:** Sunday 9am London time (cron: `0 9 * * 0`)

**Process:**
1. Get all items with status `new` from the past 7 days
2. Sort by quality score, take top 15
3. Group by content pillar
4. Build digest email with links and scores
5. Send to your email
6. Mark included items as status `reviewed`

**Output:** Email in your inbox with research to review

**What You Do:**
- Review the email
- For promising items, use `idea-builder` agent to create Ideas
- Link research item to idea by setting `idea_id` field

---

### Workflow 3: Pipeline Maintenance

**File:** `workflows/pipeline_maintenance.json`

**Purpose:** Archive stale items, export research for Claude access.

**Trigger:** Sunday 10am London time (cron: `0 10 * * 0`)

**Process:**
1. Find items to archive:
   - Status `new`/`reviewed` AND older than 45 days
   - Quality score < 5
   - Exclude items already linked to Ideas
2. Update status to `archived`
3. Export active research items to `research_items.json`

**Output:** Clean research table, JSON export for Claude

---

## Data Tables

### Table: `rss_sources`

Configuration table for RSS feeds. Unchanged from v4.0.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text | UUID primary key |
| `name` | text | Display name |
| `url` | text | Feed URL |
| `content_pillar` | text | Category mapping |
| `priority` | text | High/Medium/Low |
| `active` | checkbox | Enable/disable |
| `notes` | text | Optional notes |
| `created_date` | date | When added |

---

### Table: `research_items`

Research items discovered from RSS feeds.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text | UUID primary key |
| `guid` | text | RSS GUID for deduplication |
| `title` | text | Article title |
| `url` | text | Source URL |
| `source_name` | text | From rss_sources.name |
| `content_pillar` | text | From rss_sources.content_pillar |
| `description` | text | Article summary |
| `quality_score` | number | AI relevance score (1-10) |
| `status` | text | `new` / `reviewed` / `promoted` / `archived` |
| `created_date` | date | When discovered |
| `notes` | text | AI scoring reasoning |
| `idea_id` | text | Link to Content OS idea (if promoted) |

**Status Lifecycle:**
```
new ──────▶ reviewed ──────▶ promoted ──────▶ (linked to idea)
  │              │
  └──────────────┴──────▶ archived (45 days or low quality)
```

---

## Integration with Content OS

### Promoting Research to Ideas

When you find a promising research item:

1. **Review in digest email** - See title, score, source, notes
2. **Use idea-builder agent** - "Create an idea from this research: [URL]"
3. **Agent creates idea** - New file in `content/ideas/`
4. **Link back** - Set `idea_id` in research_items table (optional)

### Claude Querying Research

The `pipeline_maintenance` workflow exports active research to JSON:

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
    ...
  },
  "items": [...]
}
```

Claude agents can read this to suggest ideas or check what research exists.

---

## Weekly Rhythm

| Day | n8n | You + Claude |
|-----|-----|--------------|
| **Mon** | - | Review digest email, promote 2-3 items to Ideas with idea-builder |
| **Tue-Thu** | - | Draft ideas, create projections |
| **Fri** | - | Editorial review, publish ready content |
| **Sun 9am** | Send digest email | - |
| **Sun 10am** | Archive stale items, export research | - |

---

## Removed Workflows

These workflows from v4.0 have been removed:

| Workflow | Why Removed | Replacement |
|----------|-------------|-------------|
| `weekly_content_selection.json` | Auto-selection was too rigid | You + strategy-agent decide |
| `content_generation.json` | AI drafts lacked context | drafting-agent with full context |
| `blog_to_linkedin_promo.json` | Generated low-quality promos | projection-linkedin agent |
| `newsletter_digest_compiler.json` | Over-automated | projection-junglebrief agent |
| `research_to_draft.json` | Redundant with content_generation | drafting-agent |
| `rss_to_pipeline.json` | Renamed to rss_to_research | - |

---

## Cost Analysis

### n8n Costs

| Component | Cost/Month |
|-----------|------------|
| n8n Cloud Pro | £30-60 |
| GPT-4o-mini (scoring) | ~£2 (100 articles × £0.02) |
| **Total** | **~£35-65/month** |

### Savings vs v4.0

| v4.0 | v5.0 | Savings |
|------|------|---------|
| £100+/month | £35-65/month | 35-65% |
| 6 workflows | 3 workflows | 50% less complexity |
| GPT-4o for generation | - | ~£8/month saved |

---

## Setup Checklist

### n8n Data Tables

- [ ] Create `rss_sources` table with schema above
- [ ] Create `research_items` table (renamed from content_pipeline)
- [ ] Populate RSS sources (10-20 feeds)

### Workflows

- [ ] Import `rss_to_research.json`
- [ ] Import `weekly_research_digest.json`
- [ ] Import `pipeline_maintenance.json`
- [ ] Configure email credentials
- [ ] Configure OpenAI API key
- [ ] Test each workflow manually
- [ ] Activate workflows

### Content OS

- [ ] Ensure `.claude/` skills are configured
- [ ] Test idea-builder agent with sample research
- [ ] Verify CLAUDE.md has correct agent definitions

---

## Troubleshooting

### Digest email not arriving

- Check email credentials in n8n
- Verify workflow is activated
- Check execution logs for errors
- Confirm `research_items` table has items with status `new`

### Scoring failing

- Verify OpenAI API key is valid
- Check API quota/billing
- Review error logs in n8n
- Default score (5.0) will be applied if scoring fails

### Research items not appearing

- Check RSS feed URLs are valid and accessible
- Verify `rss_sources` table has `active: true`
- Check "continueOnFail" is set on HTTP request node
- Review XML parsing errors in logs

---

## Related Documentation

- `/CLAUDE.md` - Content OS specification
- `/automation/docs/data_table_schemas.md` - Detailed table schemas
- `/automation/docs/workflow_specifications.md` - Node-by-node specs
- `/automation/docs/quick_start_guide.md` - Setup walkthrough

---

*This architecture supports the Content OS defined in `/CLAUDE.md`.*

*n8n surfaces research. You and Claude create content.*
