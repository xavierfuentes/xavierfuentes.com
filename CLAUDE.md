CONTEXT: XavierFuentes.com – Personal website for fractional CTO services and thought leadership content targeting CTOs, Engineering Managers, Tech Leaders, Product Managers, and Founders.

LOCALE:
- UK English only (colour, optimise, realise, whilst, amongst).
- London timezone (GMT/BST).
- Dates in DD/MM/YYYY format.

PRIMARY BUSINESS GOAL:
- Turn XavierFuentes.com + LinkedIn into a lead generation engine for coaching and fractional CTO opportunities whilst building durable thought leadership in technology strategy and entrepreneurship.

CORE METRICS:
- Monthly unique visitors: 10,000 within 12 months.
- Newsletter subscribers: 2,500 by year-end.
- LinkedIn: +50% profile views, steadily growing engagement.
- Leads: 3–5 qualified enquiries per month (consultations/projects).

CONTENT PILLARS (strict distribution over time):
- Technology Strategy: 30%
- Leadership & Management: 25%
- Execution & Delivery: 20%
- Founder Lessons: 15%
- Market & AI Trends: 10%

CHANNELS:
- Personal blog on Ghost (this repo → Ghost Admin API).
- LinkedIn personal profile.
- The Jungle Brief (newsletter, initially bi-weekly to weekly).
- Future: madmonkey.club and other syndications (not first-class yet).

################################################################################
# CONTENT OS – FILE LAYOUT & DATA MODEL
################################################################################

All content and strategy live inside the `content/` directory of this repo.

DIRECTORIES:
- `content/ideas/`
  - Canonical "Idea" files – the source of truth for pillar content.
  - Each Idea contains metadata, notes, and (optionally) a canonical draft.
- `content/drafts/`
  - Blog post drafts for Ghost Admin preview.
  - Projection agents create posts here first with `status: draft`.
  - Move to `content/posts/` and change `status: published` when ready to go live.
- `content/posts/`
  - Ghost-ready blog posts (published or scheduled).
  - Only move files here when ready to publish.
- `content/pages/`
  - Ghost pages (e.g. About, Work With Me).
- `content/linkedin/`
  - LinkedIn projections derived from Ideas (1+ posts per Idea).
- `content/junglebrief/`
  - The Jungle Brief newsletter issues and/or sections derived from Ideas where relevant.

IDEA FRONTMATTER (content/ideas/*.md):
- `id` (string, required): unique stable identifier (e.g. `2025-01-fractional-cto-positioning`).
- `pillar` (enum, required): `technology-strategy` | `leadership-management` | `execution-delivery` | `founder-lessons` | `market-ai-trends`.
- `status` (enum): `idea` | `drafting` | `ready_for_projection` | `published` | `archived`.
- `primary_channel` (enum): `personal_blog` | `linkedin` | `newsletter`.
- `secondary_channels` (string[]): any of `personal_blog`, `linkedin`, `newsletter`.
- `target_audience` (string): short code (e.g. `founder_3_20_engineers`, `eng_manager_scaleup`).
- `target_outcome` (string): e.g. `inbound_leads`, `newsletter_signup`, `authority`, `pipeline_warm`.
- `seo_keyword` (string, optional): primary search term if relevant.
- `lead_magnet` (string, optional): which lead magnet or CTA this should connect to.
- `notes` (string, optional): freeform context and references.

BODY OF IDEA FILE:
- Canonical notes, outline, and (optionally) a neutral long-form draft.
- This draft is channel-agnostic and may be longer/more detailed than final outputs.

BLOG POST FRONTMATTER (content/posts/*.md):
- Required by Ghost tooling:
  - `title` (string)
  - `slug` (string, kebab-case)
  - `status` (enum): `draft` | `published` | `scheduled`
  - `visibility` (enum): `public` | `members` | `paid`
- Strongly recommended OS fields:
  - `idea_id` (string): must match the `id` of a file in `content/ideas/`.
  - `pillar` (enum): same as Idea.
  - `target_audience` (string): same code style as Idea.
  - `target_outcome` (string): e.g. `inbound_leads`, `newsletter_signup`.
- Optional Ghost fields:
  - `meta_title`, `meta_description`, `feature_image`, `featured`, `excerpt`, `custom_excerpt`, `tags`, `authors`, `created_at`, `updated_at`, `published_at`.

LINKEDIN FRONTMATTER (content/linkedin/*.md):
- `idea_id` (string, required): link back to canonical Idea.
- `pillar` (enum): same as Idea.
- `status` (enum): `draft` | `ready_for_review` | `ready_for_posting` | `posted`.
- `sequence` (number, optional): ordering within a mini-series.
- `target_audience` (string, optional).
- `target_outcome` (string, optional).

BODY OF LINKEDIN FILE:
- One or more posts separated by `---` lines, each with:
  - A strong hook.
  - Body copy (short, punchy, high-signal).
  - Optional CTA or question.
- No markdown footguns: keep to simple headings, paragraphs, and bullet lists that copy-paste cleanly into LinkedIn.

NEWSLETTER FRONTMATTER (content/junglebrief/*.md):
- `idea_id` (string, optional): if this issue/section is derived from a canonical Idea.
- `status` (enum): `draft` | `ready_for_review` | `scheduled` | `sent`.
- `issue_number` (number, optional).
- `pillar` (enum, optional).
- `target_audience` (string, optional).
- `target_outcome` (string, optional).

################################################################################
# WORKFLOW – HOW CONTENT SHOULD FLOW
################################################################################

HIGH-LEVEL FLOW:
1. Research / inspiration (RSS, experience, audience questions).
2. Idea creation in `content/ideas/`.
3. Canonical draft development in the Idea file.
4. Channel projections:
   - Blog: `content/posts/*.md` (Ghost-ready).
   - LinkedIn: `content/linkedin/*.md`.
   - Newsletter: `content/junglebrief/*.md`.
5. Manual review + editing.
6. Publishing:
   - Blog → via `scripts/publish.js` → Ghost.
   - LinkedIn → manual posting/scheduling.
   - Newsletter → current email tool of choice.

WEEKLY RHYTHM (PRAGMATIC VERSION):
- Monday:
  - Review new research and propose/update 2–3 Ideas in `content/ideas/`.
  - Select 1–2 Ideas to move to `status: drafting`.
- Tuesday–Thursday:
  - Drafting: expand selected Ideas into canonical drafts.
  - Projection:
    - 1 blog draft (or refine existing one) from an Idea.
    - 2–3 LinkedIn posts from the same or neighbouring Ideas.
  - You review and publish when ready (no auto-publishing).
- Weekend:
  - Compose newsletter issue (initially bi-weekly) largely from existing Ideas and published content.
  - Light performance review (what resonated, what didn't).

PERSISTENT BACKLOG:
- `content/BACKLOG.md` tracks tasks that persist between Claude sessions.
- Agents should read this at session start and update it when work is completed or new tasks are discovered.
- The backlog tracks: In Progress, Ready for Review, Next Up, and Blocked items.
- Use this to maintain continuity across sessions and ensure nothing is forgotten.

MCP MEMORY SERVER:
- The `memory` MCP server provides persistent knowledge graph storage across sessions.
- Data stored in `.claude/memory.json` (project-local, git-tracked).
- Use it for: author preferences, content relationships, session context, voice/style notes.
- NOT for task tracking (use `content/BACKLOG.md` for that).

Key entities:
- `author_profile` — Xavier's Insights Discovery profile (Type 26: Motivating Inspirer)
  - Strengths: big-picture thinking, story-driven, energetic, democratic
  - Tendencies to watch: detail avoidance, many starts, opinion over facts
- `voice_preferences` — Accumulated voice/style decisions
- `content_relationships` — Links between ideas, posts, and series

Tools:
- `mcp__memory__search_nodes` — Find entities by name/content
- `mcp__memory__open_nodes` — Read full entity content
- `mcp__memory__create_entities` — Create or update entities

AGENT USAGE:
- At session start: Query `author_profile` and `voice_preferences` before drafting or projecting content
- During work: Reference memory for voice authenticity ("Does this sound like Xavier?")
- At session end: Store any new voice decisions or content relationships discovered
- All content agents (drafting, projection-blog, projection-linkedin, editorial) should use memory context

################################################################################
# AGENT RESPONSIBILITIES
################################################################################

AGENT NAMES AND SCOPES:

- `idea-builder`:
  - Reads: `CLAUDE.md`, `docs/content_strategy.md`, `docs/templates/idea.md`.
  - Reads/Writes: `content/ideas/*.md`.
  - Responsibilities:
    - Capture new content ideas interactively.
    - Create structured Idea files with complete frontmatter and skeleton body.
    - Ensure downstream agents have everything they need to proceed.
  - This is the front door for new content - use before strategy-agent or drafting-agent.

- `strategy-agent`:
  - Reads: `docs/content_strategy.md`, `docs/execution_strategy.md`, `CLAUDE.md`.
  - Reads/Writes: `content/ideas/*.md` only.
  - Responsibilities:
    - Create and maintain Ideas, filling: `id`, `pillar`, `target_audience`, `target_outcome`, `seo_keyword`, `lead_magnet`, outline/notes.
    - Enforce pillar distribution (30/25/20/15/10) across the active Idea backlog.
    - Propose which 1–2 Ideas should move into `status: drafting` next.
  - Never edits posts, LinkedIn, Jungle Brief, or automation.

- `drafting-agent`:
  - Reads/Writes: the body and `status` of individual `content/ideas/*.md`.
  - Responsibilities:
    - Expand outlines into canonical drafts for Ideas with `status: drafting`.
    - Follow long-form structure: Hook → Context → Framework → Case Study → Implementation → Pitfalls → Next Steps.
    - Move Ideas through: `status: idea → drafting → ready_for_projection` when appropriate.
  - Does not create or modify any channel projection files.

- `projection-agent-blog`:
  - Reads: `content/ideas/*.md`, `docs/templates/blog-post-draft.md`.
  - Reads/Writes: `content/drafts/*.md`.
  - Responsibilities:
    - For Ideas with `status: ready_for_projection` and `primary_channel: personal_blog`, create or update a Ghost post draft file.
    - Set Ghost frontmatter (`title`, `slug`, `status: draft`, `visibility`) plus OS metadata (`idea_id`, `pillar`, `target_audience`, `target_outcome`).
    - Adapt the canonical draft into a blog article that obeys SEO + lead-gen guidance from `docs/content_strategy.md`.
    - Files stay in `content/drafts/` until manually moved to `content/posts/` for publishing.

- `projection-agent-linkedin`:
  - Reads: `content/ideas/*.md`.
  - Reads/Writes: `content/linkedin/*.md`.
  - Responsibilities:
    - For the same Ideas, create or update a LinkedIn projection file (typically one file per Idea or mini-series).
    - Populate frontmatter: `idea_id`, `pillar`, `status`, optional `sequence`, `target_audience`, `target_outcome`.
    - Produce 2–3 posts separated by `---`, each with a strong hook, high-signal body, and optional CTA.
    - Respect cadence and tone: framework Tuesday, industry take Wednesday, lesson Thursday; no “link-only promos”.

- `projection-agent-junglebrief` (later phase):
  - Reads: `content/ideas/*.md`, `content/posts/*.md`.
  - Reads/Writes: `content/junglebrief/*.md`.
  - Responsibilities:
    - Assemble Jungle Brief issues/sections from Ideas and existing posts.
    - Ensure each issue aligns with strategy: one deep insight, a template/tool, and curated links.
    - Link sections back to `idea_id` where applicable.

- `editorial-agent`:
  - Reads: `content/ideas/*.md`, `content/posts/*.md`, `content/linkedin/*.md`, `content/junglebrief/*.md`.
  - Writes: comments/suggestions and light edits within those files (no publishing or automation changes).
  - Responsibilities:
    - Check consistency between canonical Ideas and channel projections.
    - Flag where changes in a projection should be reflected back into the Idea.
    - Suggest cross-links, CTAs, and sequencing, but leave final decisions to you.

HARD RULES FOR ALL AGENTS:
- NEVER edit `automation/workflows/*.json`. These are managed via n8n UI.
- DO NOT touch `scripts/publish.js` or `scripts/validate.js` unless explicitly requested.
- Treat `content/ideas/` as the primary strategic brain; everything else is a projection.
- Preserve UK spelling, target personas, and the tone/quality guidelines below.

################################################################################
# SKILLS AND COMMANDS
################################################################################

The Content OS uses the Skills vs Commands vs Agents framework:
- **Agents** handle creative/strategic work (drafting, projection, editorial review).
- **Skills** are domain containers with context files.
- **Commands** are quick operational tasks nested inside skills.

AVAILABLE COMMANDS (via `/command` syntax):

| Command | Purpose |
|---------|---------|
| `/publish` | Sync content to Ghost CMS via publish script |
| `/validate` | Run frontmatter validation on all content files |
| `/pipeline` | Show content pipeline status and pillar distribution |
| `/promote [slug]` | Move a draft to posts and set status to published |
| `/weekly` | Generate weekly review summary for Monday planning |

WHEN TO USE WHAT:

```
User Intent                         → Use
─────────────────────────────────────────────────────────
"I have an idea about X"            → idea-builder agent
"What should I write next?"         → strategy agent
"Draft this idea"                   → drafting agent
"Create blog post from idea"        → projection-blog agent
"Create LinkedIn posts"             → projection-linkedin agent
"Review this for quality"           → editorial agent
─────────────────────────────────────────────────────────
"Publish to Ghost"                  → /publish command
"Check validation"                  → /validate command
"Show me the pipeline"              → /pipeline command
"Move draft to published"           → /promote command
"Monday planning review"            → /weekly command
```

SKILL CONTEXT FILES (`.claude/skills/content-os/context/`):
- `frontmatter-schemas.md` - Frontmatter schemas for all file types
- `pillar-definitions.md` - Content pillar definitions and targets
- `quality-checklist.md` - Quality checklist for content review
- `mcp-recommendations.md` - Recommended MCP integrations

################################################################################
# TONE, QUALITY, AND STYLE
################################################################################

QUALITY CHECKLIST (EVERY PIECE, ANY CHANNEL):
- [ ] Passes the “so what?” test (clear, consequential insight).
- [ ] Contains specific, actionable advice.
- [ ] Demonstrates expertise without consulting speak.
- [ ] Includes personal insight or experience where relevant.
- [ ] Avoids obvious, generic advice.
- [ ] Has a clear next step or CTA (especially for pillar content).

TONE:
- More of:
  - Specific examples and numbers.
  - Personal failures and lessons.
  - Contrarian but well-supported opinions.
  - Practical templates, frameworks, and checklists.
- Less of:
  - Abstract theorising.
  - Generic industry commentary.
  - Overly hedged, caveat-laden writing.

LINKEDIN-SPECIFIC:
- 3 posts/week is an ideal target, but quality > quota.
- Post types:
  - Tuesday: framework/template.
  - Wednesday: industry take or observation.
  - Thursday: personal lesson or behind-the-scenes.
- All original content – not just “new blog post, here’s the link”.

################################################################################
# IMPLEMENTATION NOTES
################################################################################

- Ghost integration:
  - `content/drafts/*.md` and `content/posts/*.md` are published via `scripts/publish.js`.
  - `content/pages/*.md` are also published (as Ghost pages).
  - All other `content/` directories are for the content OS and external projections.
- Validation:
  - `scripts/validate.js` is the authority on allowed frontmatter fields for posts/pages.
  - `idea_id`, `pillar`, `target_audience`, `target_outcome` are allowed and encouraged on posts.

GHOST SYNC BEHAVIOUR:
- **The repo is the source of truth.** Ghost is downstream.
- When `scripts/publish.js` runs, it overwrites Ghost posts based on the markdown files.
- Publishing directly in Ghost UI works but will be reverted on next publish if the markdown file differs.
- Edits made in Ghost Admin (title, content, etc.) will be overwritten by the repo version.
- **Never edit posts directly in Ghost Admin** unless you also update the corresponding markdown file.
- To publish a draft:
  1. Move file from `content/drafts/` to `content/posts/`
  2. Change `status: draft` to `status: published` in frontmatter
  3. Push to main (or run `npm run publish`)

REMINDER:
- This repo is the source of truth for content and strategy.
- External tools (n8n, Ghost Admin, LinkedIn, newsletter platform) should be treated as consumers of this content OS, not the other way around.