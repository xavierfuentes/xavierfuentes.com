# Content OS Skill

This skill provides operational commands for XavierFuentes.com's Content OS—the system that manages ideas, blog posts, LinkedIn content, and The Jungle Brief newsletter.

## When to Use This Skill

Use this skill for **operational tasks** in the content pipeline:
- Publishing and validating content
- Checking pipeline status
- Moving content between stages
- Quick status checks and reports

**Do NOT use this skill for:**
- Creating or drafting content (use agents: idea-builder, drafting)
- Strategic decisions about what to write (use agent: strategy)
- Channel projections (use agents: projection-blog, projection-linkedin, projection-junglebrief)
- Editorial review (use agent: editorial)

## Available Commands

| Command | Purpose |
|---------|---------|
| `/publish` | Sync content to Ghost CMS via publish script |
| `/validate` | Run frontmatter validation on all content files |
| `/pipeline` | Show content pipeline status and pillar distribution |
| `/promote [slug]` | Move a draft to posts and set status to published |
| `/weekly` | Generate weekly review summary for Monday planning |

## Routing Logic

When the user invokes a command:

1. **`/publish`** → Execute `workflows/publish.md`
2. **`/validate`** → Execute `workflows/validate.md`
3. **`/pipeline`** → Execute `workflows/pipeline-status.md`
4. **`/promote`** → Execute `workflows/promote-draft.md`
5. **`/weekly`** → Execute `workflows/weekly-review.md`

## Context Files

This skill includes context files that commands can reference:

- `context/frontmatter-schemas.md` - Frontmatter schemas for ideas, posts, LinkedIn, newsletter
- `context/pillar-definitions.md` - Content pillar definitions and distribution targets
- `context/quality-checklist.md` - Quality checklist for content review

## Integration with Agents

This skill complements (not replaces) the Content OS agents:

```
User Intent → Routing Decision

"I have an idea about X"        → idea-builder agent
"What should I write next?"     → strategy agent
"Draft this idea"               → drafting agent
"Create blog post from idea"    → projection-blog agent
"Create LinkedIn posts"         → projection-linkedin agent
"Review this for quality"       → editorial agent

"Publish to Ghost"              → /publish command (this skill)
"Check validation"              → /validate command (this skill)
"Show me the pipeline"          → /pipeline command (this skill)
"Move draft to published"       → /promote command (this skill)
"Monday planning review"        → /weekly command (this skill)
```

## Directory Context

```
content/
├── ideas/          # Canonical idea files (source of truth)
├── drafts/         # Blog post drafts for Ghost preview
├── posts/          # Published Ghost posts
├── pages/          # Ghost pages
├── linkedin/       # LinkedIn projections
└── junglebrief/    # Newsletter issues

scripts/
├── publish.js      # Ghost sync script
└── validate.js     # Frontmatter validation
```
