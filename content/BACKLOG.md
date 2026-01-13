# Content OS Backlog

A persistent task list that survives between Claude sessions. Agents should read this at the start of strategic work and update it when tasks are completed or added.

**Last Updated:** 13/01/2026

---

## In Progress

Tasks currently being worked on.

| Task | Idea/File | Notes | Started |
|------|-----------|-------|---------|
| — | — | — | — |

---

## Ready for Review

Content ready for human review before publishing.

| Task | Idea/File | Notes | Created |
|------|-----------|-------|---------|
| Review Claude Code blog draft | `2025-12-claude-code-project-framework` | Blog projection created, ~1,800 words | 30/12/2025 |
| Review LinkedIn posts for Build vs Buy | `content/linkedin/2025-01-build-vs-buy-framework.md` | 4 posts ready to schedule | 13/01/2026 |

---

## Next Up

Prioritised tasks to tackle next.

| Priority | Task | Idea/File | Notes |
|----------|------|-----------|-------|
| High | Create LinkedIn projections | `2025-12-claude-code-project-framework` | 4 posts: CLAUDE.md, classification, handoff, over-engineering |
| Medium | Polish First 90 Days draft | `2025-01-first-90-days-technical-leader` | Add personal anecdotes, punch up hook |
| Medium | Polish Tech Debt draft | `2025-01-tech-debt-product-lifecycle` | Add warmth, personal moment |
| Medium | Polish Stakeholder Comms draft | `2025-01-stakeholder-comms-managing-up` | Needs real examples |
| Low | Create First 90 Days lead magnet | `2025-01-first-90-days-technical-leader` | Checklist already referenced in LinkedIn posts |

---

## Blocked / Waiting

Tasks waiting on something.

| Task | Blocked By | Notes |
|------|------------|-------|
| Publish AI Strategy piece | Lead magnet (course) doesn't exist yet | CTA references gated course |

---

## Completed (Recent)

Keep last 10 completed tasks for context.

| Task | Idea/File | Completed |
|------|-----------|-----------|
| Fix agent YAML frontmatter (enable 6 broken agents) | `.claude/agents/*.md` | 13/01/2026 |
| Publish Build vs Buy article | `2025-01-build-vs-buy-framework` | 13/01/2026 |
| Create Build vs Buy lead magnet | `content/lead-magnets/build-vs-buy-decision-framework.html` | 13/01/2026 |
| Create Build vs Buy LinkedIn projections | `content/linkedin/2025-01-build-vs-buy-framework.md` | 13/01/2026 |
| Add design hooks to settings | `.claude/settings.json` | 13/01/2026 |
| Verify MCP memory author profile populated | Memory server | 31/12/2025 |
| Fix GitHub Actions auto-publish trigger | `.github/workflows/publish-content.yml` | 31/12/2025 |
| Fix manual workflow trigger to publish all content | `.github/workflows/publish-content.yml` | 31/12/2025 |
| Set up MCP memory server | `.mcp.json` | 30/12/2025 |
| Create persistent backlog system | `content/BACKLOG.md` | 30/12/2025 |
| Create Claude Code blog projection | `2025-12-claude-code-project-framework` | 30/12/2025 |

---

## Notes

### Case Study Needs (Cross-Cutting)

Real examples needed across multiple pieces:

- ~~**Build vs Buy**: Team that built when should've bought; migration from built to bought~~ ✓ Done (Nando's KDS, LinearB, Snowflake)
- **First 90 Days**: Leadership transition that failed fast; one that succeeded through restraint
- **Stakeholder Comms**: Over-communication that transformed a board relationship
- **Tech Debt**: Team that eliminated tech debt sprints with before/after metrics

### Content Calendar Notes

- **Claude Code Framework** is timely — Claude Code adoption accelerating, publish soon
- ~~**Build vs Buy** is evergreen — can publish anytime~~ ✓ Published 13/01/2026
- **AI Strategy** aligns with Q1 2025 budget cycles — good January publish

---

## How Agents Should Use This File

**At session start:** Read this file to understand pending work and priorities.

**During work:** Move tasks between sections as status changes.

**At session end:** Update with any new tasks discovered or progress made.

**Format for new tasks:**
```markdown
| Priority | Task | Idea/File | Notes |
|----------|------|-----------|-------|
| High/Med/Low | [What needs doing] | `idea-slug` or file path | [Context] |
```
