# Skills

Skills are domain-specific knowledge modules that provide context, templates, and guidelines for content operations. Agents automatically load the skills they need.

## What Are Skills?

Skills are NOT executable code. They are **structured knowledge** that agents reference when performing tasks:

- **Context files** - Guidelines, definitions, rules (e.g., voice, SEO, pillar definitions)
- **Templates** - Starting points for content creation (e.g., blog post template, idea template)
- **Reference material** - Brand guides, workflow documentation, API references

When you ask Claude to create a blog post, the `blog` skill provides the voice guidelines, structure template, and SEO rules that shape the output.

## Skill Index

| Skill | Purpose | Used By | Manual Commands |
|-------|---------|---------|-----------------|
| `pipeline` | Idea structure, pillar definitions, workflow | idea-builder, strategy | `/pipeline` |
| `blog` | Blog voice, structure, SEO | drafting, projection-blog, editorial | - |
| `ghost` | Publishing workflow, API sync | projection-blog | `/publish`, `/validate`, `/promote` |
| `linkedin` | LinkedIn voice, format, weekly rhythm | projection-linkedin, editorial | - |
| `newsletter` | Newsletter voice, issue format, curation | projection-junglebrief, editorial | - |
| `pdf-leadmagnet` | PDF generation for lead magnets | drafting (manual) | - |

## How Skills Work

### Automatic Loading

When an agent runs, it reads the skill files it needs. You do not manually load skills.

For example, when `projection-linkedin` runs:
1. Agent reads `.claude/skills/linkedin/context/voice.md` for LinkedIn tone
2. Agent reads `.claude/skills/linkedin/context/format.md` for length limits
3. Agent reads `.claude/skills/linkedin/context/rhythm.md` for posting schedule
4. Agent uses `.claude/skills/linkedin/templates/post.md` as a starting structure

All of this happens automatically based on the agent's "Skills Reference" section.

### Manual Commands

Some skills expose commands for direct use:

```
/pipeline    → Show idea backlog, pillar distribution, stale items
/publish     → Sync content to Ghost CMS
/validate    → Check frontmatter before publishing
/promote     → Move draft to posts and publish
```

Use these when you need a specific operation without invoking a full agent.

## Skill Structure

Every skill follows this directory structure:

```
.claude/skills/
└── skill-name/
    ├── SKILL.md         # Main skill definition
    ├── context/         # Guidelines and reference docs
    │   ├── voice.md
    │   ├── structure.md
    │   └── ...
    └── templates/       # Starting templates
        ├── post.md
        └── ...
```

### SKILL.md

The main skill file contains:
- **Frontmatter** - `name` and `description` for skill discovery
- **When to Use** - Situations where this skill applies
- **Quick Reference** - Key facts for fast lookup
- **Context Files** - List of context documents
- **Templates** - List of available templates
- **Commands** - Any manual commands the skill provides

### context/

Context files contain guidelines, definitions, and rules. Examples:
- `voice.md` - Tone, style, and language guidelines
- `structure.md` - Content structure and formatting rules
- `seo.md` - Search optimisation guidelines
- `pillars.md` - Content pillar definitions and targets
- `workflow.md` - Process and status flow documentation

### templates/

Templates provide starting structures for content. Examples:
- `post.md` - Blog post with frontmatter and section headers
- `idea.md` - Idea file with all metadata fields
- `issue.md` - Newsletter issue structure

## Skill vs Agent

| Aspect | Agent | Skill |
|--------|-------|-------|
| **What it is** | A worker that performs tasks | A knowledge module with guidelines |
| **Does it act?** | Yes - reads, writes, edits files | No - provides context only |
| **Location** | `.claude/agents/*.md` | `.claude/skills/*/` |
| **Invoked by** | Task tool (or user request) | Agents (automatically) |
| **Example** | `drafting` creates blog posts | `blog` provides voice guidelines |

**Simple rule:**
- **Agents** are workers (verbs): capture, draft, project, review
- **Skills** are knowledge (nouns): voice, structure, format, workflow

## Skill Details

### pipeline

**Purpose:** Manage the content pipeline from idea to publication.

**Context Files:**
- `pillars.md` - Content pillar definitions and distribution targets
- `frontmatter.md` - Schemas for all content file types
- `workflow.md` - Status flow and weekly rhythm

**Templates:**
- `idea.md` - Idea file with full frontmatter structure

**Key Concepts:**
- Idea statuses: `idea` → `drafting` → `ready_for_projection` → `published` → `archived`
- Pillar targets: Technology Strategy 30%, Leadership 25%, Execution 20%, Founder 15%, Trends 10%

---

### blog

**Purpose:** Create authoritative, SEO-optimised blog posts for Ghost CMS.

**Context Files:**
- `voice.md` - Blog tone and style guidelines
- `structure.md` - 7-section post structure
- `seo.md` - Meta descriptions, keywords, internal linking

**Templates:**
- `post.md` - Blog post with Ghost frontmatter

**Key Concepts:**
- Target length: 1,500-2,000 words
- Structure: Hook → Context → Framework → Case Study → Implementation → Pitfalls → Next Steps

---

### ghost

**Purpose:** Publish content to Ghost CMS and manage sync.

**Context Files:**
- `sync.md` - How repo-to-Ghost sync works
- `api.md` - Ghost Admin API reference

**Key Concepts:**
- Repo is source of truth (Ghost Admin edits will be overwritten)
- Publish flow: Edit in repo → `/validate` → `/publish`

---

### linkedin

**Purpose:** Create punchy, engaging LinkedIn posts.

**Context Files:**
- `voice.md` - LinkedIn tone (punchier than blog)
- `format.md` - Length limits, hook structure
- `rhythm.md` - Weekly posting schedule (Tue/Wed/Thu)

**Templates:**
- `post.md` - LinkedIn post template

**Key Concepts:**
- Target length: 1,200-1,800 characters (not words)
- Hook: Under 140 characters (before "See more")
- Weekly rhythm: Framework (Tue), Hot take (Wed), Lesson (Thu)

---

### newsletter

**Purpose:** Create The Jungle Brief newsletter issues.

**Context Files:**
- `voice.md` - Newsletter tone (curated, direct, insider)
- `format.md` - Issue structure and sections
- `curation.md` - Link selection and commentary guidelines

**Templates:**
- `issue.md` - Full newsletter issue template

**Key Concepts:**
- Frequency: Bi-weekly (moving to weekly)
- Structure: Industry Round-Up, Deep Insight, Template/Tool, Curated Links
- Target length: 5-7 minute read

---

### pdf-leadmagnet

**Purpose:** Generate professional PDF lead magnets.

**Templates:**
- `ebook` - Multi-page guides
- `checklist` - Actionable step-by-step lists
- `cheatsheet` - Quick reference documents

**Key Concepts:**
- Generated via `generate.py` script
- Uses brand colours (Deep Jungle, Golden Amber)
- Output to `content/assets/`

## Extending Skills

### Adding Context Files

To add new guidelines to an existing skill:

1. Create a new markdown file in the skill's `context/` directory
2. Update `SKILL.md` to reference the new file
3. Update any agents that should use this context

Example: Adding brand voice variations to the blog skill:
```
.claude/skills/blog/context/voice-variations.md
```

### Adding Templates

To add a new template:

1. Create a new markdown file in the skill's `templates/` directory
2. Include complete frontmatter with all required fields
3. Add placeholder sections with clear instructions
4. Update `SKILL.md` to list the new template

### Creating New Skills

To create a new skill:

1. Create a new directory in `.claude/skills/`
2. Create `SKILL.md` with frontmatter (`name`, `description`)
3. Add `context/` directory with relevant guidelines
4. Add `templates/` directory with starting structures
5. Update relevant agents to reference the new skill

Follow the existing skill structure for consistency.
