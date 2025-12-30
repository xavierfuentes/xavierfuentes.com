# Frontmatter Schemas

## Idea Files (`content/ideas/*.md`)

```yaml
---
id: "YYYY-MM-slug"           # Required, unique identifier
pillar: technology-strategy  # Required, enum
status: idea                 # Required, enum
primary_channel: personal_blog
secondary_channels:
  - linkedin
  - newsletter
target_audience: "cto_startup_scaleup"
target_outcome: "inbound_leads"
seo_keyword: "technical debt"        # Optional
lead_magnet: "tech-debt-assessment"  # Optional
notes: "Context and references"      # Optional
---
```

### Field Definitions

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| id | Yes | string | Format: YYYY-MM-slug |
| pillar | Yes | enum | See pillar definitions |
| status | Yes | enum | idea, drafting, ready_for_projection, published, archived |
| primary_channel | Yes | enum | personal_blog, linkedin, newsletter |
| secondary_channels | No | array | Any of the channel enums |
| target_audience | Yes | string | Short code describing persona |
| target_outcome | Yes | string | What success looks like |
| seo_keyword | No | string | Primary search term |
| lead_magnet | No | string | Which CTA to connect |
| notes | No | string | Freeform context |

### Status Flow

```
idea → drafting → ready_for_projection → published → archived
  ↑                                           |
  └───────────── (rare rework) ───────────────┘
```

## Blog Posts (`content/posts/*.md`, `content/drafts/*.md`)

```yaml
---
title: "Your Post Title"
slug: "your-post-slug"
status: draft
visibility: public
idea_id: "YYYY-MM-slug"              # Required, links to idea
pillar: technology-strategy          # From idea
target_audience: "cto_startup_scaleup"
target_outcome: "inbound_leads"
meta_title: "SEO title if different"
meta_description: "150-160 char description"
feature_image: "/images/your-image.jpg"
featured: false
tags:
  - Technical Leadership
  - Architecture
authors:
  - Xavi
---
```

### Ghost-Required Fields

| Field | Required | Notes |
|-------|----------|-------|
| title | Yes | Display title |
| slug | Yes | URL slug, kebab-case |
| status | Yes | draft, published, scheduled |
| visibility | Yes | public, members, paid |

### Content OS Fields

| Field | Required | Notes |
|-------|----------|-------|
| idea_id | Yes | Must match an idea file |
| pillar | Yes | From parent idea |
| target_audience | No | From parent idea |
| target_outcome | No | From parent idea |

## LinkedIn Posts (`content/linkedin/*.md`)

```yaml
---
idea_id: "YYYY-MM-slug"
pillar: technology-strategy
status: draft
sequence: 1                   # Optional, for series
target_audience: "cto_startup_scaleup"
target_outcome: "authority"
---
```

### Field Definitions

| Field | Required | Notes |
|-------|----------|-------|
| idea_id | Yes | Links to source idea |
| pillar | Yes | From parent idea |
| status | Yes | draft, ready_for_review, ready_for_posting, posted |
| sequence | No | Order within a mini-series |

## Newsletter Issues (`content/junglebrief/*.md`)

```yaml
---
idea_id: "YYYY-MM-slug"
issue_number: 14
status: draft
pillar: technology-strategy
target_audience: "cto_startup_scaleup"
target_outcome: "newsletter_engagement"
subject_line: "The technical debt denial problem"
---
```

### Field Definitions

| Field | Required | Notes |
|-------|----------|-------|
| idea_id | Yes | Primary idea explored |
| issue_number | Yes | Sequential number |
| status | Yes | draft, ready_for_review, scheduled, sent |
| subject_line | Yes | Email subject, <50 chars |

## Audience Codes

Standard codes for `target_audience`:

| Code | Description |
|------|-------------|
| cto_startup_scaleup | CTOs at 10-200 person companies |
| eng_manager_scaleup | Engineering managers at growing companies |
| tech_lead_senior | Senior developers moving to leadership |
| founder_technical | Technical founders, often first-time |
| founder_non_technical | Non-technical founders needing tech guidance |

## Outcome Codes

Standard codes for `target_outcome`:

| Code | Intent |
|------|--------|
| inbound_leads | Generate consultation enquiries |
| newsletter_signup | Convert to email subscriber |
| authority | Build thought leadership |
| pipeline_warm | Nurture existing leads |
| newsletter_engagement | Deepen subscriber relationship |
