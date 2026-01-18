# Path Constants

Canonical paths for all directories and key files in the Content OS.

---

## Content Directories

All content lives under `content/`:

| Path | Purpose | Status Flow |
|------|---------|-------------|
| `content/ideas/` | Stage 1: Lean idea files with metadata and outline | `idea` -> `drafting` |
| `content/drafts/` | Stage 2: Full blog content in development | `draft` -> `ready_for_review` |
| `content/posts/` | Stage 3: Published blog posts | `published` |
| `content/pages/` | Ghost static pages (about, services, etc.) | `published` |
| `content/linkedin/` | LinkedIn post projections | `draft` -> `posted` |
| `content/newsletter/` | The Jungle Brief issues | `draft` -> `sent` |
| `content/assets/` | Lead magnets, PDFs, downloads | - |

---

## Documentation Directories

All documentation lives under `docs/`:

| Path | Purpose |
|------|---------|
| `docs/strategy/` | Why: Content strategy and execution plans |
| `docs/guides/` | How: Writing and brand guidelines |
| `docs/operations/` | Ops: Backlog, audits, operational docs |

---

## Claude Configuration Directories

All Claude Code configuration lives under `.claude/`:

| Path | Purpose |
|------|---------|
| `.claude/agents/` | Subagent definitions (drafting, projection, etc.) |
| `.claude/skills/` | Domain skills with context and templates |
| `.claude/data/` | Runtime data (memory.jsonl) |

---

## Protected Directories (DO NOT EDIT)

These directories are managed externally:

| Path | Managed By |
|------|------------|
| `automation/workflows/*.json` | n8n UI |
| `workflows/n8n/*.json` | n8n UI |
| `scripts/` | Manual review only |

---

## Key Strategy Documents

Reference these for strategic decisions:

| Path | Purpose |
|------|---------|
| `CLAUDE.md` | Project root instructions |
| `docs/strategy/content-strategy.md` | Content pillars, audience, goals |
| `docs/strategy/execution-strategy.md` | Publishing rhythm, workflow, metrics |

---

## Key Guide Documents

Reference these for quality and style:

| Path | Purpose |
|------|---------|
| `docs/guides/writing-guide.md` | Voice, tone, quality checklist |
| `docs/guides/brand-guide.md` | Visual identity and brand rules |

---

## Operational Files

Track work and status:

| Path | Purpose |
|------|---------|
| `docs/operations/backlog.md` | Persistent task backlog across sessions |
| `docs/operations/content-os-audit.md` | System health and improvement notes |

---

## Skill Directories

Each skill has a consistent structure:

```
.claude/skills/{skill-name}/
├── SKILL.md              # Skill definition
├── context/              # Reference documents
│   ├── voice.md          # Voice and tone
│   ├── format.md         # Format guidelines
│   └── ...
├── templates/            # Output templates
│   └── {type}.md
└── commands/             # Slash commands (optional)
    └── {command}.md
```

### Available Skills

| Skill | Path |
|-------|------|
| Pipeline | `.claude/skills/pipeline/` |
| Blog | `.claude/skills/blog/` |
| Ghost | `.claude/skills/ghost/` |
| LinkedIn | `.claude/skills/linkedin/` |
| Newsletter | `.claude/skills/newsletter/` |
| PDF Lead Magnet | `.claude/skills/pdf-leadmagnet/` |

---

## Frontmatter Schema Reference

| Schema | Location |
|--------|----------|
| All schemas | `.claude/skills/pipeline/context/frontmatter.md` |
| Pillar definitions | `.claude/skills/pipeline/context/pillars.md` |

---

## Memory and State

| Path | Purpose |
|------|---------|
| `.claude/data/memory.jsonl` | Project-local MCP memory |
