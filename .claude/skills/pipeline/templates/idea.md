# Idea File Template

Copy to `content/ideas/YYYY-MM-your-slug.md`

**Key principle:** Ideas are lightweight planning files. Full drafts live in `content/drafts/`.

## Frontmatter

```yaml
---
id: "YYYY-MM-your-slug"
pillar: technology-strategy
status: idea
primary_channel: personal_blog
secondary_channels:
  - linkedin
  - newsletter
target_audience: cto_startup_scaleup
target_outcome: inbound_leads
seo_keyword: ""
lead_magnet: ""
notes: |
  Context, references, and inspiration sources.
---
```

## Body Structure (Keep Lean)

```markdown
# [Idea Title]

## Problem

[What pain point does this address? 2-3 sentences.]

## Angle

[Your unique take or contrarian position. What makes this interesting?]

## Outline

1. **Hook**: [Opening angle or provocative statement]
2. **Context**: [What the reader needs to understand first]
3. **Framework**: [The main thing you're teaching]
4. **Example**: [Concrete illustration — note if real case study needed]
5. **Implementation**: [How to apply this]
6. **Pitfalls**: [What to watch out for]
7. **Next Steps**: [What the reader should do]

## Notes

- [Source/inspiration]
- [Related ideas]
- [Case study opportunities: NEEDED or personal experience]
```

## Frontmatter Reference

| Field | Required | Values |
|-------|----------|--------|
| id | Yes | YYYY-MM-slug format |
| pillar | Yes | technology-strategy, leadership-management, execution-delivery, founder-lessons, market-ai-trends |
| status | Yes | idea, drafting, published, archived |
| primary_channel | Yes | personal_blog, linkedin, newsletter |
| secondary_channels | No | Array of channels |
| target_audience | Yes | Audience code (see frontmatter.md) |
| target_outcome | Yes | Outcome code (see frontmatter.md) |
| seo_keyword | No | Primary search term for blog |
| lead_magnet | No | Which CTA to connect |
| notes | No | Freeform context |

## Status Transitions

```
idea     → Ready for strategy review
drafting → Draft exists in content/drafts/
published → Blog post is live
archived  → No longer relevant
```

When status changes to `drafting`:
1. Create a draft file in `content/drafts/YYYY-MM-slug.md`
2. Write and edit the draft there
3. Keep the idea file lean — don't duplicate content

## Quality Checklist for Ideas

Before moving to `drafting`:

- [ ] Problem is clear and specific
- [ ] Angle passes "so what?" test
- [ ] Target audience would care about this
- [ ] Pillar assignment is accurate
- [ ] Outline has enough structure to develop
