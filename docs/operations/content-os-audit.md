# Content OS Audit Report

**Generated:** 24/12/2025
**Purpose:** Evaluate static/dynamic data distribution across agents and skills

---

## Executive Summary

The Content OS has data scattered across three locations:
1. `docs/` - Strategy documents and templates
2. `.claude/skills/content-os/` - Skill context and commands
3. `.claude/agents/` - Agent definitions

**Key Finding:** Significant duplication exists. Some critical data is in `docs/` but not in `.claude/skills/` where agents can reliably access it.

---

## Static Data Inventory

### Location 1: `docs/`

| File | Purpose | Should Move to Skills? |
|------|---------|------------------------|
| `content_strategy.md` | Pillars, SEO, lead gen, quality checklist | **Partial** - pillars already in skills, quality checklist already in skills |
| `execution_strategy.md` | Weekly rhythm, budgets, phases | No - operational, not agent context |
| `writing_guide.md` | Voice, tone, length, authenticity rules | **Yes** - critical for drafting/projection agents |
| `agents.md` | Agent overview, file patterns | **No** - redundant with `.claude/agents/` |
| `content-os-schedule.ics` | Calendar events | No - for human use |
| `templates/idea.md` | Idea file template | **Move** - agents reference this |
| `templates/blog-post-draft.md` | Blog post template | **Move** - agents reference this |
| `templates/linkedin-post.md` | LinkedIn template | **Move** - agents reference this |
| `templates/junglebrief-issue.md` | Newsletter template | **Move** - agents reference this |

### Location 2: `.claude/skills/content-os/context/`

| File | Purpose | Complete? |
|------|---------|-----------|
| `frontmatter-schemas.md` | All frontmatter schemas | ✓ Complete |
| `pillar-definitions.md` | Pillar targets and details | ✓ Complete |
| `quality-checklist.md` | Review checklist | ✓ Complete |
| `mcp-recommendations.md` | MCP integrations | ✓ Complete |

**Missing from skills context:**
- `writing-guide.md` (voice, tone, length guidelines)
- `templates/` directory with all templates

### Location 3: `.claude/agents/`

| Agent | Has Own File? | References External Docs? |
|-------|---------------|---------------------------|
| `idea-builder.md` | ✓ | References `docs/templates/idea.md` |
| `strategy.md` | ✓ | References `docs/content_strategy.md`, `docs/execution_strategy.md` |
| `drafting.md` | ✓ | References `docs/content_strategy.md`, `docs/writing_guide.md` |
| `projection-blog.md` | ✓ | References `docs/templates/blog-post-draft.md` |
| `projection-linkedin.md` | ✓ | References templates |
| `projection-junglebrief.md` | ✓ | References templates |
| `editorial.md` | ✓ | References strategy docs |

### Location 4: `automation/docs/`

| File | Purpose | Should Move? |
|------|---------|--------------|
| `workflow_architecture.md` | n8n architecture | No - n8n specific |
| `data_table_schemas.md` | n8n table schemas | No - n8n specific |
| `workflow_specifications.md` | n8n node specs | No - n8n specific |
| `quick_start_guide.md` | n8n setup guide | No - n8n specific |

**Verdict:** `automation/docs/` is correctly scoped to n8n. Leave as-is.

---

## Agent Data Completeness Report

### idea-builder

| Data Type | Status | Location | Notes |
|-----------|--------|----------|-------|
| Agent definition | ✓ | `.claude/agents/idea-builder.md` | Complete |
| Frontmatter schema | ✓ | `.claude/skills/content-os/context/frontmatter-schemas.md` | Available |
| Pillar definitions | ✓ | `.claude/skills/content-os/context/pillar-definitions.md` | Available |
| Idea template | ⚠️ | `docs/templates/idea.md` | Should be in skills |
| **Missing** | | | None critical |

### strategy

| Data Type | Status | Location | Notes |
|-----------|--------|----------|-------|
| Agent definition | ✓ | `.claude/agents/strategy.md` | Complete |
| Content strategy | ⚠️ | `docs/content_strategy.md` | Large doc, agent reads it |
| Execution strategy | ⚠️ | `docs/execution_strategy.md` | Large doc, agent reads it |
| Pillar targets | ✓ | `.claude/skills/content-os/context/pillar-definitions.md` | Available (duplicate) |
| **Missing** | | | Consider extracting key metrics to skills |

### drafting

| Data Type | Status | Location | Notes |
|-----------|--------|----------|-------|
| Agent definition | ✓ | `.claude/agents/drafting.md` | Complete |
| Writing guide | ⚠️ | `docs/writing_guide.md` | **Critical - should be in skills** |
| Content structure | ✓ | In agent definition | 7-section template included |
| Quality checklist | ✓ | `.claude/skills/content-os/context/quality-checklist.md` | Available |
| **Missing** | ❌ | | `writing-guide.md` not in skills context |

### projection-blog

| Data Type | Status | Location | Notes |
|-----------|--------|----------|-------|
| Agent definition | ✓ | `.claude/agents/projection-blog.md` | Complete |
| Blog template | ⚠️ | `docs/templates/blog-post-draft.md` | Should be in skills |
| Frontmatter schema | ✓ | `.claude/skills/content-os/context/frontmatter-schemas.md` | Available |
| SEO guidelines | ⚠️ | `docs/content_strategy.md` | Scattered, not consolidated |
| **Missing** | | | Consider `seo-guidelines.md` in skills |

### projection-linkedin

| Data Type | Status | Location | Notes |
|-----------|--------|----------|-------|
| Agent definition | ✓ | `.claude/agents/projection-linkedin.md` | Complete |
| LinkedIn template | ⚠️ | `docs/templates/linkedin-post.md` | Should be in skills |
| Length guidelines | ⚠️ | `docs/writing_guide.md` | Should be in skills |
| Weekly rhythm | ⚠️ | `docs/execution_strategy.md` | Tue/Wed/Thu pattern |
| **Missing** | | | Templates not in skills |

### projection-junglebrief

| Data Type | Status | Location | Notes |
|-----------|--------|----------|-------|
| Agent definition | ✓ | `.claude/agents/projection-junglebrief.md` | Complete |
| Newsletter template | ⚠️ | `docs/templates/junglebrief-issue.md` | Should be in skills |
| Issue structure | ✓ | In agent definition | Deep insight + tool + links |
| **Missing** | | | Template not in skills |

### editorial

| Data Type | Status | Location | Notes |
|-----------|--------|----------|-------|
| Agent definition | ✓ | `.claude/agents/editorial.md` | Complete |
| Quality checklist | ✓ | `.claude/skills/content-os/context/quality-checklist.md` | Available |
| Writing guide | ⚠️ | `docs/writing_guide.md` | Should be in skills |
| **Missing** | | | Writing guide not in skills |

---

## Skill Command Completeness Report

### /publish

| Data Type | Status | Notes |
|-----------|--------|-------|
| Command definition | ✓ | `.claude/skills/content-os/workflows/publish.md` |
| Script reference | ✓ | References `npm run publish` |
| **Complete** | ✓ | |

### /validate

| Data Type | Status | Notes |
|-----------|--------|-------|
| Command definition | ✓ | `.claude/skills/content-os/workflows/validate.md` |
| Script reference | ✓ | References `npm run validate` |
| **Complete** | ✓ | |

### /pipeline

| Data Type | Status | Notes |
|-----------|--------|-------|
| Command definition | ✓ | `.claude/skills/content-os/workflows/pipeline-status.md` |
| Pillar targets | ✓ | Can reference `pillar-definitions.md` |
| **Complete** | ✓ | |

### /promote

| Data Type | Status | Notes |
|-----------|--------|-------|
| Command definition | ✓ | `.claude/skills/content-os/workflows/promote-draft.md` |
| **Complete** | ✓ | |

### /weekly

| Data Type | Status | Notes |
|-----------|--------|-------|
| Command definition | ✓ | `.claude/skills/content-os/workflows/weekly-review.md` |
| Weekly rhythm | ⚠️ | Could reference schedule explicitly |
| **Complete** | ✓ | |

---

## Recommended Actions

### High Priority (Move to Skills)

1. **Create `.claude/skills/content-os/context/writing-guide.md`**
   - Copy from `docs/writing_guide.md`
   - Critical for: drafting, projection-*, editorial agents

2. **Create `.claude/skills/content-os/templates/` directory**
   - Move/copy templates from `docs/templates/`
   - `idea.md`, `blog-post-draft.md`, `linkedin-post.md`, `junglebrief-issue.md`

### Medium Priority (Consolidate)

3. **Remove `docs/agents.md`**
   - Redundant with `.claude/agents/` definitions
   - Or convert to a human-readable overview only

4. **Extract key metrics to skills context**
   - Create `.claude/skills/content-os/context/targets.md`
   - Include: pillar targets, content frequency, length guidelines
   - Consolidates scattered data from content_strategy.md and execution_strategy.md

### Low Priority (Nice to Have)

5. **Create `.claude/skills/content-os/context/seo-guidelines.md`**
   - Extract from content_strategy.md
   - Keywords, meta description guidelines, internal linking rules

6. **Add schedule reference to /weekly command**
   - Link to `docs/content-os-schedule.ics` or embed key events

---

## Proposed New Skills Structure

```
.claude/skills/content-os/
├── SKILL.md                    # Skill overview
├── context/
│   ├── frontmatter-schemas.md  # ✓ Exists
│   ├── pillar-definitions.md   # ✓ Exists
│   ├── quality-checklist.md    # ✓ Exists
│   ├── mcp-recommendations.md  # ✓ Exists
│   ├── writing-guide.md        # NEW - from docs/writing_guide.md
│   ├── targets.md              # NEW - consolidated metrics
│   └── seo-guidelines.md       # NEW - extracted from strategy
├── templates/
│   ├── idea.md                 # NEW - from docs/templates/
│   ├── blog-post.md            # NEW - from docs/templates/
│   ├── linkedin-post.md        # NEW - from docs/templates/
│   └── junglebrief-issue.md    # NEW - from docs/templates/
└── workflows/
    ├── publish.md              # ✓ Exists
    ├── validate.md             # ✓ Exists
    ├── pipeline-status.md      # ✓ Exists
    ├── promote-draft.md        # ✓ Exists
    └── weekly-review.md        # ✓ Exists
```

---

## Summary

| Category | Status |
|----------|--------|
| Agent definitions | ✓ Complete |
| Skill commands | ✓ Complete |
| Skill context | ⚠️ Missing writing guide |
| Templates | ⚠️ In wrong location |
| Strategy docs | ⚠️ Partially duplicated |
| Automation docs | ✓ Correctly scoped |

**Next Steps:**
1. Move writing guide to skills context
2. Move templates to skills
3. Consider removing `docs/agents.md` (redundant)
