# Blog Post Template

Copy to `content/drafts/YYYY-MM-slug.md` for new posts.

```yaml
---
# Required for Ghost
title: "Your SEO-Optimised Title Here"
slug: your-slug-in-kebab-case
status: draft
visibility: public

# Content OS Linkage (required)
idea_id: "2025-MM-your-idea-id"
pillar: technology-strategy
target_audience: cto_startup_scaleup
target_outcome: inbound_leads

# SEO (recommended)
meta_title: "SEO Title (50-60 chars)"
meta_description: "Compelling description for search results. 150-160 characters."

# Display (optional)
featured: false
excerpt: "Short excerpt for listings and social."
tags:
  - Technology Strategy
---
```

## Post Structure

```markdown
[Opening hook - 1-2 paragraphs. Grab attention. Introduce the problem.]

## Why This Matters

[Context - why should readers care? What's at stake?]

## The Framework

[Main content. Use subheadings, bullets, numbered steps.]

### Component One

[Detail]

### Component Two

[Detail]

## Real-World Application

[Case study or hypothetical. If hypothetical, frame clearly:
"Consider a scenario where a Series B startup..."]

## How to Implement

1. **First step**: What to do
2. **Second step**: What to do
3. **Third step**: What to do

## Common Mistakes

- **Mistake one**: Why it's a problem
- **Mistake two**: Why it's a problem

## Next Steps

[Key takeaways + CTA]
```

## Frontmatter Reference

| Field | Required | Notes |
|-------|----------|-------|
| title | Yes | SEO-optimised, under 60 chars |
| slug | Yes | Kebab-case, match idea slug |
| status | Yes | draft / published / scheduled |
| visibility | Yes | public / members / paid |
| idea_id | Yes | Link to source idea |
| pillar | Yes | One of 5 pillars |
| target_audience | Recommended | From idea |
| target_outcome | Recommended | From idea |
| meta_description | Recommended | 150-160 chars |
| featured | Optional | true/false |
| tags | Optional | Array of tags |
