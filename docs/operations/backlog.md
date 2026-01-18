# Content OS Backlog

A persistent task list that survives between Claude sessions. Agents should read this at the start of strategic work and update it when tasks are completed or added.

**Last Updated:** 17/01/2026

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

---

## Next Up

Prioritised tasks to tackle next.

| Priority | Task | Idea/File | Notes |
|----------|------|-----------|-------|
| High | Polish Stakeholder Comms draft | `2025-01-stakeholder-comms-managing-up` | Replace hypothetical with real story, add personal close |
| High | Create LinkedIn projections | `2025-12-claude-code-project-framework` | 4 posts: CLAUDE.md, classification, handoff, over-engineering |
| Medium | Polish Tech Debt draft | `2025-01-tech-debt-product-lifecycle` | Add warmth, personal moment |

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
| Content OS improvements round 2 | `.claude/`, `scripts/` | 17/01/2026 |
| Major Content OS refactor: agents, skills, hooks | `.claude/` | 17/01/2026 |
| Post Build vs Buy LinkedIn series (3/4 posted) | `content/linkedin/2025-01-build-vs-buy-framework.md` | 15/01/2026 |
| Publish First 90 Days article | `2025-01-first-90-days-technical-leader` | 01/2026 |
| Fix agent YAML frontmatter (enable 6 broken agents) | `.claude/agents/*.md` | 13/01/2026 |
| Publish Build vs Buy article | `2025-01-build-vs-buy-framework` | 13/01/2026 |
| Create Build vs Buy lead magnet | `content/assets/build-vs-buy-decision-framework.html` | 13/01/2026 |
| Create Build vs Buy LinkedIn projections | `content/linkedin/2025-01-build-vs-buy-framework.md` | 13/01/2026 |
| Add design hooks to settings | `.claude/settings.json` | 13/01/2026 |
| Verify MCP memory author profile populated | Memory server | 31/12/2025 |

---

## Notes

### Case Study Needs (Cross-Cutting)

Real examples needed across multiple pieces:

- ~~**Build vs Buy**: Team that built when should've bought; migration from built to bought~~ ✓ Done (Nando's KDS, LinearB, Snowflake)
- **First 90 Days**: Leadership transition that failed fast; one that succeeded through restraint
- **Stakeholder Comms**: Over-communication that transformed a board relationship
- **Tech Debt**: Team that eliminated tech debt sprints with before/after metrics

### Content OS Improvements Round 2 (17/01/2026)

**Critical Fixes:**
- Fixed MCP memory path (`.mcp.json` → `.claude/data/memory.jsonl`)
- Fixed backlog hook regex (fewer false positives)
- Reverted tech-debt idea to `drafting` status (had unresolved B+ feedback)

**New Automation:**
- Created `scripts/sync-check.js` — validates idea-draft-post status alignment
- Extended `scripts/validate.js` — now checks lead magnet existence + word counts
- Extended `scripts/pipeline.js` — now shows LinkedIn/newsletter cadence + backlog priorities

**Documentation:**
- Added lead-magnet agent to `.claude/agents/README.md`
- Added memory.md reference to pipeline SKILL.md
- Added Lead Magnets section to content-standards.md

**New Commands:**
- `npm run sync-check` — Status alignment validation
- `npm run pipeline` — Now includes cadence tracking

### Content OS Refactor (17/01/2026)

Major refactoring completed:

**New Files Created:**
- `.claude/global-rules.md` — Centralised rules (UK English, protected dirs, quality checklist)
- `.claude/content-standards.md` — Word counts, character limits, publishing cadence
- `.claude/path-constants.md` — All directory paths and key files
- `.claude/agents/README.md` — Agent discovery guide with decision tree
- `.claude/skills/README.md` — Skill index and auto-loading explanation
- `.claude/agents/lead-magnet.md` — New agent for PDF generation
- `scripts/pipeline.js` — `/pipeline` command showing status and pillar distribution

**Key Improvements:**
- Status flow unified (`ready_for_projection` added to canonical schema)
- Agent responsibilities clarified (drafting → projection-blog → editorial boundaries)
- Editorial agent now READ-ONLY (generates reports, doesn't implement)
- Hook regex fixed (no more false positives on "framework")
- Backlog path corrected in settings
- Mermaid workflow diagrams added to CLAUDE.md and workflow.md
- All agents refactored to reference global rules (removed 7x duplication)

### Content Calendar Notes

- **Claude Code Framework** is timely — Claude Code adoption accelerating, publish soon
- ~~**Build vs Buy** is evergreen — can publish anytime~~ ✓ Published 13/01/2026
- **AI Strategy** aligns with Q1 2026 budget cycles — good January publish

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
