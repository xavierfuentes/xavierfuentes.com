# Idea File Template

Copy to `content/ideas/YYYY-MM-your-slug.md`

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

## Body Structure

```markdown
# [Idea Title]

## Core Insight

[One paragraph capturing the central idea. What's the "so what?" that makes this worth writing about?]

## Why Now

[Why is this relevant? What prompted this idea? Recent experience, trend, conversation?]

## Outline

1. **Hook/Opening**
   - [Opening angle or provocative statement]

2. **Context**
   - [What the reader needs to understand first]

3. **Core Framework/Insight**
   - [The main thing you're teaching]

4. **Example/Story**
   - [Concrete illustration]

5. **Implementation**
   - [How to apply this]

6. **Pitfalls**
   - [What to watch out for]

7. **Next Steps**
   - [What the reader should do now]

## Canonical Draft

[When status moves to `drafting`, develop the full draft here. This is channel-agnostic—longer and more detailed than final outputs. Projection agents will adapt it for specific channels.]

---

## Editorial Notes

### Voice & Angle Decisions
- [Key decisions about tone, angle, or framing to preserve]
- [What makes this piece distinctively "Xavier"]

### Case Study Opportunities
- [NEEDED] [Description of real case study that would strengthen this piece]
- [Personal experience that could be included]

### Feedback Log
- [DD/MM/YYYY]: [Feedback or editorial note — add new entries at the top]

---

## References

- [Source 1]
- [Source 2]
```

## Frontmatter Reference

| Field | Required | Values |
|-------|----------|--------|
| id | Yes | YYYY-MM-slug format |
| pillar | Yes | technology-strategy, leadership-management, execution-delivery, founder-lessons, market-ai-trends |
| status | Yes | idea, drafting, ready_for_projection, published, archived |
| primary_channel | Yes | personal_blog, linkedin, newsletter |
| secondary_channels | No | Array of channels |
| target_audience | Yes | Audience code (see frontmatter.md) |
| target_outcome | Yes | Outcome code (see frontmatter.md) |
| seo_keyword | No | Primary search term for blog |
| lead_magnet | No | Which CTA to connect |
| notes | No | Freeform context |

## Status Transitions

```
idea           → Ready for strategy review
drafting       → Being developed (canonical draft in progress)
ready_for_projection → Draft complete, create channel content
published      → All projections created/published
archived       → No longer relevant
```

## Quality Checklist for Ideas

Before moving to `drafting`:

- [ ] Core insight is clear and specific
- [ ] Passes "so what?" test
- [ ] Target audience would care about this
- [ ] Pillar assignment is accurate
- [ ] Outline has enough structure to develop
