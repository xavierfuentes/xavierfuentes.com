# Quick Start Guide
## n8n Research Discovery Setup

**Last Updated:** 24/12/2024
**Version:** 2.0 (Simplified for Content OS)

---

## Overview

This guide walks you through setting up the research discovery system. n8n discovers and scores research; you and Claude create content.

**Setup Time:** ~1 hour

**What You'll Have:**
- Hourly RSS scanning with AI scoring
- Weekly research digest email
- Automatic housekeeping

---

## Prerequisites

- n8n Cloud Pro account (or self-hosted with Data Tables)
- OpenAI API key
- Email account for notifications

---

## Step 1: Create Data Tables (15 min)

### 1.1 Create `rss_sources` Table

1. n8n → Data Tables → Create New Table
2. Name: `rss_sources`
3. Add columns:

| Column | Type | Required |
|--------|------|----------|
| id | Text | Yes |
| name | Text | Yes |
| url | Text | Yes |
| content_pillar | Text | Yes |
| priority | Text | Yes |
| active | Checkbox | Yes |
| notes | Text | No |
| created_date | Date | Yes |

### 1.2 Create `research_items` Table

1. Create New Table
2. Name: `research_items`
3. Add columns:

| Column | Type | Required |
|--------|------|----------|
| id | Text | Yes |
| guid | Text | Yes |
| title | Text | Yes |
| url | Text | Yes |
| source_name | Text | Yes |
| content_pillar | Text | Yes |
| description | Text | No |
| quality_score | Number | No |
| status | Text | Yes |
| created_date | Date | Yes |
| notes | Text | No |
| idea_id | Text | No |

### 1.3 Add RSS Sources

Add 10-20 feeds. Example starters:

| Name | URL | Pillar | Priority |
|------|-----|--------|----------|
| Martin Fowler | `https://martinfowler.com/feed.atom` | Technology Strategy | High |
| Pragmatic Engineer | `https://blog.pragmaticengineer.com/rss/` | Leadership & Management | High |
| Will Larson | `https://lethain.com/feeds/all.atom.xml` | Leadership & Management | High |
| First Round Review | `https://review.firstround.com/rss` | Founder Lessons | Medium |
| Simon Willison | `https://simonwillison.net/atom/everything/` | Market & AI Trends | Medium |

Generate UUIDs at: https://www.uuidgenerator.net/

---

## Step 2: Configure Credentials (10 min)

### 2.1 OpenAI API Key

1. n8n → Settings → Credentials → Add
2. Type: OpenAI
3. Name: `OpenAI - Research Scoring`
4. Paste your API key

### 2.2 Email (for digest)

1. Add Credential
2. Type: SMTP or Gmail
3. Name: `Email - Digest`
4. Configure your email settings

---

## Step 3: Import Workflows (15 min)

### 3.1 RSS to Research

1. n8n → Workflows → Import from File
2. Upload `workflows/rss_to_research.json`
3. Update OpenAI credential reference
4. Save

### 3.2 Weekly Research Digest

1. Import `workflows/weekly_research_digest.json`
2. Update email credential
3. Set `DIGEST_EMAIL` environment variable (or hardcode your email)
4. Save

### 3.3 Pipeline Maintenance

1. Import `workflows/pipeline_maintenance.json`
2. Save

---

## Step 4: Test (15 min)

### Test RSS to Research

1. Open the workflow
2. Click "Execute Workflow"
3. Check:
   - RSS feeds fetched successfully
   - Articles scored by AI
   - New rows in `research_items` table

### Test Weekly Digest

1. Open the workflow
2. Execute manually
3. Check your email for digest

### Test Maintenance

1. Open the workflow
2. Execute manually
3. Verify no errors

---

## Step 5: Activate

1. Open each workflow
2. Toggle "Active" to ON
3. Confirm schedules:
   - RSS to Research: Hourly
   - Weekly Digest: Sunday 9am
   - Maintenance: Sunday 10am

---

## Using the System

### Weekly Rhythm

| Day | What Happens |
|-----|--------------|
| Sun 9am | Digest email arrives with top 15 research items |
| Sun 10am | Stale items archived, research exported |
| Mon | Review digest, promote promising items to Ideas |
| Tue-Thu | Draft and project content |

### Promoting Research to Ideas

When you see interesting research in your digest:

1. Open Claude Code
2. Say: "Create an idea from this research: [paste URL]"
3. The `idea-builder` agent creates a new Idea file
4. Optionally update `idea_id` in n8n to link them

---

## Troubleshooting

### No items in digest

- Check RSS sources are `active: true`
- Verify RSS URLs are valid
- Run RSS workflow manually and check logs

### Scoring errors

- Verify OpenAI API key
- Check API quota
- Default score (5.0) applied if scoring fails

### Email not sending

- Check email credentials
- Verify SMTP settings
- Check spam folder

---

## Costs

| Component | Monthly |
|-----------|---------|
| n8n Cloud Pro | £30-60 |
| GPT-4o-mini scoring | ~£2 |
| **Total** | **~£35-65** |

---

## What's NOT Automated

The system discovers and scores research. Content creation is handled by Claude agents:

- **idea-builder**: Create Ideas from research
- **drafting-agent**: Expand Ideas into drafts
- **projection-blog**: Create Ghost posts
- **projection-linkedin**: Create LinkedIn posts
- **projection-junglebrief**: Create newsletter issues

This separation keeps automation simple and gives you control over what becomes content.

---

## Next Steps

1. Let workflows run for a week
2. Review your first digest email
3. Promote 2-3 items to Ideas
4. Adjust RSS sources based on what's useful

---

*For detailed schemas: `/automation/docs/data_table_schemas.md`*

*For architecture: `/automation/docs/workflow_architecture.md`*

*For node specs: `/automation/docs/workflow_specifications.md`*
