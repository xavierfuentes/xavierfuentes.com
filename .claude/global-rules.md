# Global Rules

Universal rules that apply to all agents and skills. These rules are non-negotiable.

---

## Protected Directories (NEVER EDIT)

The following directories are managed externally and must never be modified by agents:

| Directory | Reason |
|-----------|--------|
| `automation/workflows/*.json` | Managed via n8n UI |
| `workflows/n8n/*.json` | Managed via n8n UI |
| `scripts/` | Infrastructure code requiring manual review |

**Exception:** Read-only access is permitted for context.

---

## Language and Locale Standards

### British English

All content must use UK English spelling and conventions:

- colour (not color)
- optimise (not optimize)
- realise (not realize)
- whilst (not while, where appropriate)
- amongst (not among, where appropriate)
- prioritise, organise, recognise, etc.

### Timezone

- London timezone (GMT/BST)
- Reference times in local London format

### Date Formats

| Context | Format | Example |
|---------|--------|---------|
| Prose (articles, posts) | DD/MM/YYYY | 15/01/2026 |
| Filenames | YYYY-MM-slug | 2026-01-first-90-days.md |
| Frontmatter dates | YYYY-MM-DD | 2026-01-15 |

---

## Publishing Workflow Rules

### Source of Truth

- **Repository is the source of truth** for all content
- Ghost CMS is downstream and will be overwritten on publish
- Any edits made directly in Ghost Admin will be lost

### Ghost MCP Usage

- **NEVER use Ghost MCP to write or edit content**
- Ghost MCP may only be used for:
  - Reading post metadata
  - Checking publication status
  - Browsing existing content
- All content changes flow through Git commits

### Publishing Flow

1. Content authored in `content/drafts/` or `content/posts/`
2. Frontmatter validated before publishing
3. Run `/publish` command or `npm run publish`
4. Script syncs to Ghost via Admin API

---

## Channel Boundaries

Each content type has a dedicated directory. Do not mix content types:

| Channel | Directory | Purpose |
|---------|-----------|---------|
| Blog drafts | `content/drafts/` | Work in progress blog posts |
| Blog published | `content/posts/` | Published blog posts |
| LinkedIn | `content/linkedin/` | LinkedIn post projections |
| Newsletter | `content/newsletter/` | The Jungle Brief issues |
| Static pages | `content/pages/` | Ghost static pages |
| Lead magnets | `content/assets/` | PDFs, downloads, resources |

### Ideas Stay Lean

- Idea files in `content/ideas/` contain metadata and outlines only
- Full content development happens in `content/drafts/`
- Never expand ideas into full drafts within the ideas directory

---

## Strategy Document References

These documents define strategy and standards. Consult before major content decisions:

| Document | Purpose |
|----------|---------|
| `CLAUDE.md` | Project context and agent instructions |
| `docs/strategy/content-strategy.md` | Content pillars, audience, goals |
| `docs/strategy/execution-strategy.md` | Publishing rhythm, workflow, metrics |
| `docs/guides/writing-guide.md` | Voice, tone, quality standards |
| `docs/guides/brand-guide.md` | Visual and brand identity |

---

## Universal Quality Checklist

Every piece of content must pass these checks before publishing:

- [ ] **"So what?" test** - Clear, consequential insight that matters to the reader
- [ ] **Specific and actionable** - Concrete advice, not vague platitudes
- [ ] **No fabricated case studies** - Only real examples or clearly hypothetical scenarios
- [ ] **Expertise without consulting speak** - Avoid jargon like "leverage", "synergy", "holistic"
- [ ] **Personal insight** - Authentic voice and real experience where claimed
- [ ] **Clear next step or CTA** - Reader knows what to do after reading
- [ ] **British English** - Spelling and conventions checked

---

## Case Study Rules

### Only include case studies when:

- The idea file explicitly mentions a real case study, OR
- You frame it as clearly hypothetical ("Consider a scenario where...")

### Never:

- Fabricate case studies and present them as real
- Invent specific companies, revenue figures, or outcomes

### When no real case study is available:

- Use hypothetical framing and keep it brief
- Or leave a placeholder: `[CASE STUDY: Real example needed - theme: X]`

---

## Hard Rules Summary

1. Repository is source of truth (Ghost is downstream)
2. Never use Ghost MCP to write content
3. Never edit protected directories
4. UK English always
5. Ideas stay lean; drafts get the full content
6. Each channel has its own directory
