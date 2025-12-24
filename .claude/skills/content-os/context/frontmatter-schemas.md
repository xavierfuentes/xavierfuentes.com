# Frontmatter Schemas

Reference schemas for Content OS file types.

## Idea Files (`content/ideas/*.md`)

```yaml
---
id: "2025-01-slug"                    # Required: unique stable identifier
pillar: technology-strategy           # Required: one of 5 pillars
status: idea                          # Required: idea | drafting | ready_for_projection | published | archived
primary_channel: personal_blog        # Required: personal_blog | linkedin | junglebrief
secondary_channels: []                # Optional: array of additional channels
target_audience: founder_3_20_engineers  # Recommended: short code
target_outcome: inbound_leads         # Recommended: inbound_leads | newsletter_signup | authority | pipeline_warm
seo_keyword: ""                       # Optional: primary search term
lead_magnet: ""                       # Optional: connected lead magnet
notes: ""                             # Optional: 1-3 sentence angle/context
---
```

## Blog Post Files (`content/drafts/*.md`, `content/posts/*.md`)

```yaml
---
# Ghost Required
title: "Blog Post Title"
slug: "blog-post-slug"
status: draft                         # draft | published | scheduled
visibility: public                    # public | members | paid

# Content OS Metadata (Recommended)
idea_id: "2025-01-slug"              # Must match source idea id
pillar: technology-strategy
target_audience: founder_3_20_engineers
target_outcome: inbound_leads

# Ghost Optional
meta_title: ""
meta_description: ""                  # 150-160 characters
feature_image: ""
featured: false
excerpt: ""
custom_excerpt: ""
tags: []
authors: []
created_at: ""                        # ISO 8601
updated_at: ""
published_at: ""
---
```

## LinkedIn Files (`content/linkedin/*.md`)

```yaml
---
idea_id: "2025-01-slug"              # Required: link to source idea
pillar: technology-strategy           # Required: same as idea
status: draft                         # Required: draft | ready_for_review | ready_for_posting | posted
sequence: 1                           # Optional: ordering within mini-series
target_audience: ""                   # Optional
target_outcome: ""                    # Optional
---
```

## Newsletter Files (`content/junglebrief/*.md`)

```yaml
---
issue_number: 1                       # Required: sequential issue number
issue_date: 2025-01-05               # Required: YYYY-MM-DD
status: draft                         # Required: draft | ready_for_review | scheduled | sent
idea_id: ""                          # Optional: primary source idea
idea_ids: []                         # Optional: all ideas in this issue
content_since: ""                    # Optional: date range start
pillar: ""                           # Optional: primary pillar
target_audience: ""                  # Optional
target_outcome: ""                   # Optional
---
```

## Status Transitions

```
Ideas:      idea → drafting → ready_for_projection → published → archived
Posts:      draft → published | scheduled
LinkedIn:   draft → ready_for_review → ready_for_posting → posted
Newsletter: draft → ready_for_review → scheduled → sent
```
