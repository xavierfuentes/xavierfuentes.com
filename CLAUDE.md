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
  - Lightweight planning files: metadata + problem/angle/outline.
  - Used for strategic planning and tracking pillar distribution.
  - NOT where you write full drafts — keep these lean.
- `content/drafts/`
  - **Where you write and edit blog content.**
  - Ghost-synced drafts that you review and refine.
  - Move to `content/posts/` when ready to publish.
- `content/posts/`
  - Published blog posts (Ghost-synced).
  - Only move files here when ready to go live.
- `content/pages/`
  - Ghost pages (e.g. About, Work With Me).
- `content/linkedin/`
  - LinkedIn posts derived from Ideas (1+ posts per Idea).
- `content/junglebrief/`
  - The Jungle Brief newsletter issues.
- `content/lead-magnets/`
  - Source markdown and generated PDFs for downloadable resources.
  - Checklists, cheatsheets, ebooks tied to blog content.

IDEA FRONTMATTER (content/ideas/*.md):
- `id` (string, required): unique stable identifier (e.g. `2025-01-fractional-cto-positioning`).
- `pillar` (enum, required): `technology-strategy` | `leadership-management` | `execution-delivery` | `founder-lessons` | `market-ai-trends`.
- `status` (enum): `idea` | `drafting` | `published` | `archived`.
- `primary_channel` (enum): `personal_blog` | `linkedin` | `newsletter`.
- `secondary_channels` (string[]): any of `personal_blog`, `linkedin`, `newsletter`.
- `target_audience` (string): short code (e.g. `founder_3_20_engineers`, `eng_manager_scaleup`).
- `target_outcome` (string): e.g. `inbound_leads`, `newsletter_signup`, `authority`, `pipeline_warm`.
- `seo_keyword` (string, optional): primary search term if relevant.
- `lead_magnet` (enum, optional): `checklist` | `cheatsheet` | `ebook` — triggers PDF creation for this idea.
- `notes` (string, optional): freeform context and references.

BODY OF IDEA FILE:
- Problem statement: what pain point does this address?
- Angle: your unique take or contrarian position.
- Rough outline: key sections/points to cover.
- Keep it lean — the full draft lives in `content/drafts/`.

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
1. **Idea capture**: Create lightweight idea file in `content/ideas/` (metadata + problem/angle/outline).
2. **Draft creation**: Write the full blog post in `content/drafts/` (this is where you edit).
3. **Review & refine**: Edit the draft directly — this is your working document.
4. **Channel projections**: Create LinkedIn/newsletter versions from the draft.
5. **Lead magnet** (optional): Create PDF companion in `content/lead-magnets/` if idea has `lead_magnet` set.
6. **Publish**: Move draft to `content/posts/` and run publish script.

LEAD MAGNETS:
When to create a lead magnet:
- **Checklist**: "How to" posts with clear steps (e.g., "First 90 Days as CTO")
- **Cheatsheet**: Framework posts with decision matrices (e.g., "Build vs Buy")
- **Ebook**: Deep-dive authority pieces or multi-part series

Workflow:
1. Set `lead_magnet: checklist|cheatsheet|ebook` in the idea frontmatter.
2. Write lead magnet content in `content/lead-magnets/{slug}.md`.
3. Generate PDF using `.claude/skills/pdf-leadmagnet/scripts/generate.py`.
4. Reference the PDF in the blog post CTA.

WHERE TO EDIT:
- **Blog content**: Edit in `content/drafts/*.md` — this is your working document.
- **Ideas**: Only update metadata or outline — keep lean, don't duplicate content.
- **LinkedIn/Newsletter**: Edit in their respective directories.

SIMPLIFIED STATUS FLOW:
```
Idea (idea) → Drafting (drafting) → Published (published)
     ↓
 [Create draft file in content/drafts/]
```

WEEKLY RHYTHM (PRAGMATIC VERSION):
- Monday:
  - Review new research and capture ideas in `content/ideas/`.
  - Pick 1–2 ideas to work on this week.
- Tuesday–Thursday:
  - Write/edit blog drafts in `content/drafts/`.
  - Create 2–3 LinkedIn posts from the same themes.
  - Review and publish when ready.
- Weekend:
  - Compose newsletter issue from published content.
  - Light performance review.

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
  - Reads: `content/ideas/*.md` for context.
  - Reads/Writes: `content/drafts/*.md`.
  - Responsibilities:
    - Create blog drafts from idea outlines.
    - Write directly in `content/drafts/` — this is where content lives.
    - Follow structure: Hook → Context → Framework → Case Study → Implementation → Pitfalls → Next Steps.
    - Update idea `status` to `drafting` when work begins.
  - The draft file is the working document, not the idea file.

- `projection-agent-blog`:
  - Reads: `content/ideas/*.md` for metadata, `content/drafts/*.md` for content.
  - Reads/Writes: `content/drafts/*.md`.
  - Responsibilities:
    - Polish existing drafts for SEO and lead generation.
    - Ensure Ghost frontmatter is complete.
    - Add `unsplash_prompt` for feature image.
    - Files stay in `content/drafts/` until manually moved to `content/posts/`.

- `projection-agent-linkedin`:
  - Reads: `content/ideas/*.md`, `content/drafts/*.md`.
  - Reads/Writes: `content/linkedin/*.md`.
  - Responsibilities:
    - Create LinkedIn posts from ideas or blog drafts.
    - Produce 2–3 posts per idea, each with strong hook and high-signal body.
    - Respect cadence: framework Tuesday, industry take Wednesday, lesson Thursday.

- `projection-agent-junglebrief` (later phase):
  - Reads: `content/ideas/*.md`, `content/posts/*.md`.
  - Reads/Writes: `content/junglebrief/*.md`.
  - Responsibilities:
    - Assemble Jungle Brief issues/sections from Ideas and existing posts.
    - Ensure each issue aligns with strategy: one deep insight, a template/tool, and curated links.
    - Link sections back to `idea_id` where applicable.

- `editorial-agent`:
  - Reads: `content/drafts/*.md`, `content/linkedin/*.md`, `content/junglebrief/*.md`.
  - Writes: suggestions and light edits within draft files.
  - Responsibilities:
    - Review drafts for quality, voice consistency, and clarity.
    - Suggest cross-links, CTAs, and improvements.
    - Final decisions are always yours.

HARD RULES FOR ALL AGENTS:
- NEVER edit `automation/workflows/*.json`. These are managed via n8n UI.
- DO NOT touch `scripts/publish.js` or `scripts/validate.js` unless explicitly requested.
- `content/drafts/` is where blog content lives — edit there, not in ideas.
- `content/ideas/` is for lightweight planning only — keep lean.
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

GHOST MCP USAGE RULES:
- The Ghost MCP server is available for **read-only operations only**.
- **NEVER use Ghost MCP to create, edit, or delete posts/pages** — all publishing flows through Git.
- Allowed MCP operations:
  - Browse/read posts (check publish status, view stats)
  - Browse/read members (subscriber counts, engagement)
  - Browse newsletters (delivery stats, open rates)
  - Debug issues (verify content synced correctly)
- Forbidden MCP operations:
  - `Add Post`, `Edit Post`, `Delete Post`
  - `Add Page`, `Edit Page`, `Delete Page`
  - Any write operation that bypasses the Git workflow
- If asked to "publish directly" or "update Ghost", always use the Git workflow instead:
  1. Edit the markdown file in `content/drafts/` or `content/posts/`
  2. Commit and push to trigger GitHub Actions
  3. Or run `npm run publish` locally

REMINDER:
- This repo is the source of truth for content and strategy.
- External tools (n8n, Ghost Admin, LinkedIn, newsletter platform) should be treated as consumers of this content OS, not the other way around.