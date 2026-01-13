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

CONTENT PILLARS:
See `.claude/skills/pipeline/context/pillars.md` for full definitions.
- Technology Strategy: 30%
- Leadership & Management: 25%
- Execution & Delivery: 20%
- Founder Lessons: 15%
- Market & AI Trends: 10%

CHANNELS:
- Personal blog on Ghost (this repo → Ghost Admin API).
- LinkedIn personal profile.
- The Jungle Brief (newsletter, initially bi-weekly to weekly).

################################################################################
# PROJECT STRUCTURE
################################################################################

content/                    # All content files
├── ideas/                  # Stage 1: Planning (lean files)
├── drafts/                 # Stage 2: Writing (full content)
├── posts/                  # Stage 3: Published to Ghost
├── pages/                  # Static Ghost pages
├── linkedin/               # LinkedIn projections
├── newsletter/             # The Jungle Brief issues
└── assets/                 # Lead magnets, PDFs, downloads

docs/                       # Documentation
├── strategy/               # Why: content & execution strategy
├── guides/                 # How: writing & brand guides
└── operations/             # Ops: backlog, audits

.claude/                    # Claude Code configuration
├── agents/                 # Subagent definitions
├── skills/                 # Domain skills with context/templates
└── data/                   # Runtime data (memory)

workflows/                  # n8n automation
├── n8n/                    # Workflow exports and docs
└── data/                   # Research items

See `content/README.md` for detailed content workflow.

################################################################################
# FRONTMATTER SCHEMAS
################################################################################

See `.claude/skills/pipeline/context/frontmatter.md` for complete schemas.

Quick reference:
- Ideas: `id`, `pillar`, `status`, `primary_channel`, `target_audience`, `target_outcome`
- Posts: `title`, `slug`, `status`, `visibility`, `idea_id`, `pillar`
- LinkedIn: `idea_id`, `pillar`, `status`
- Newsletter: `issue_number`, `issue_date`, `status`

################################################################################
# WORKFLOW
################################################################################

HIGH-LEVEL FLOW:
1. **Idea capture** → `content/ideas/` (metadata + outline)
2. **Draft creation** → `content/drafts/` (full blog content)
3. **Channel projections** → `content/linkedin/`, `content/newsletter/`
4. **Lead magnet** (optional) → `content/assets/`
5. **Publish** → Move to `content/posts/`, run `/publish`

See `docs/strategy/execution-strategy.md` for weekly rhythm.

PERSISTENT BACKLOG:
- `docs/operations/backlog.md` tracks tasks across Claude sessions.
- Read at session start, update when work completes.

################################################################################
# AGENTS AND SKILLS
################################################################################

AGENTS (invoke via Task tool):
- `idea-builder` – Capture new content ideas
- `strategy` – Manage backlog, pillar distribution
- `drafting` – Create blog drafts from ideas
- `projection-blog` – Polish drafts for SEO
- `projection-linkedin` – Create LinkedIn posts
- `projection-junglebrief` – Assemble newsletter issues
- `editorial` – Review content quality

SKILLS (invoke via Skill tool or `/command`):
- `pipeline` – Pipeline status, pillar tracking
- `blog` – Blog voice, structure, templates
- `ghost` – Publishing commands (`/publish`, `/validate`, `/promote`)
- `linkedin` – LinkedIn format and rhythm
- `newsletter` – Newsletter format and curation

COMMANDS:
| Command | Purpose |
|---------|---------|
| `/publish` | Sync content to Ghost CMS |
| `/validate` | Check frontmatter validity |
| `/pipeline` | Show pipeline status |
| `/promote [slug]` | Move draft to published |

################################################################################
# QUALITY STANDARDS
################################################################################

See `docs/guides/writing-guide.md` for full guidelines.

Every piece must:
- [ ] Pass the "so what?" test (clear, consequential insight)
- [ ] Contain specific, actionable advice
- [ ] Demonstrate expertise without consulting speak
- [ ] Include personal insight or experience
- [ ] Avoid obvious, generic advice
- [ ] Have a clear next step or CTA

################################################################################
# HARD RULES
################################################################################

1. **NEVER edit `workflows/n8n/*.json`** – managed via n8n UI.
2. **NEVER use Ghost MCP to write** – all publishing flows through Git.
3. **Edit in `content/drafts/`** – not in ideas (keep ideas lean).
4. **UK English always** – colour, optimise, realise, whilst, amongst.
5. **Repo is source of truth** – Ghost is downstream, will be overwritten.

GHOST SYNC:
- `scripts/publish.js` syncs `content/drafts/`, `content/posts/`, `content/pages/` to Ghost.
- Ghost Admin edits will be overwritten on next publish.
- To publish: move draft to posts/, set `status: published`, push or run `npm run publish`.

MCP MEMORY:
- Data in `.claude/data/memory.jsonl` (project-local).
- Use for: author profile, voice preferences, content relationships.
- Query `author_profile` before drafting for voice authenticity.
