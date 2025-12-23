# Agents – XavierFuentes.com Content OS

## 1. Agent overview

- `idea-builder` – interactively collects inputs from you and creates new idea files under `content/ideas/`.
- `strategy` – maintains the idea backlog under `content/ideas/`.
- `drafting` – turns selected ideas into full canonical drafts.
- `projection-blog` – turns an idea into a Ghost-ready blog post.
- `projection-linkedin` – turns an idea into 2–3 LinkedIn posts.
- `projection-junglebrief` – (later) assembles Jungle Brief issues.
- `editorial` – checks consistency and suggests improvements.

## 2. File scopes and patterns

### 2.1 Ideas

- Directory: `content/ideas/`
- Filename pattern: `YYYY-MM-slug.md`
  - Example: `2025-01-fractional-cto-positioning.md`
- Frontmatter:
  - `id` – must match filename without `.md`.
  - `pillar` – `technology-strategy` | `leadership-management` | `execution-delivery` | `founder-lessons` | `market-ai-trends`.
  - `status` – `idea` | `drafting` | `ready_for_projection` | `published` | `archived`.
  - `primary_channel` – `personal_blog` | `linkedin` | `junglebrief`.
  - `secondary_channels` – array of the same values.
  - `target_audience`, `target_outcome`, `seo_keyword`, `lead_magnet`, `notes` – optional but strongly encouraged.

### 2.2 Blog posts (Ghost)

- Directory: `content/posts/`
- Filename pattern: `YYYY-MM-slug.md`
  - Ideally reuse the idea slug, e.g. `2025-01-fractional-cto-positioning.md`.
- Frontmatter:
  - Required for Ghost:
    - `title`, `slug`, `status`, `visibility`.
  - OS metadata:
    - `idea_id` – must equal the `id` of a file in `content/ideas/`.
    - `pillar`, `target_audience`, `target_outcome`.

### 2.3 LinkedIn projections

- Directory: `content/linkedin/`
- Filename pattern: `idea-id-linkedin.md`
  - Example: `2025-01-fractional-cto-positioning-linkedin.md`
- Frontmatter:
  - `idea_id` – required.
  - `pillar` – same as idea.
  - `status` – `draft` | `ready_for_review` | `ready_for_posting` | `posted`.
  - `sequence` – optional number if part of a mini-series.
  - `target_audience`, `target_outcome` – optional.
- Body:
  - Multiple posts separated by `---`.
  - Each post: hook, body, optional CTA or question.

### 2.4 Jungle Brief projections (later)

- Directory: `content/junglebrief/`
- Filename pattern: `issue-XX.md` (e.g. `issue-01.md`).
- Frontmatter:
  - `issue_number`, `status`, optional `idea_id` and `pillar` per issue or per section.

## 3. Agent actions vs files

- `idea-builder`
  - Interacts with you to gather a small, fixed set of inputs:
    - Working title / rough topic.
    - Pillar (`technology-strategy`, `leadership-management`, `execution-delivery`, `founder-lessons`, `market-ai-trends`).
    - Primary channel (`personal_blog`, `linkedin`, `junglebrief`).
    - Target audience (short descriptor).
    - Target outcome (`inbound_leads`, `newsletter_signup`, `authority`, `pipeline_warm`).
    - 1–3 sentence angle / contrarian point of view.
  - Derives:
    - Filename and `id` as `YYYY-MM-slug`.
    - Sensible defaults for `seo_keyword` and `lead_magnet` when possible.
  - Writes:
    - A new `content/ideas/YYYY-MM-slug.md` file with full frontmatter and a standard outline skeleton.
  - Sets:
    - `status: idea` or `status: drafting` depending on how concrete your inputs are.

- `strategy`
  - Reads: `docs/content_strategy.md`, `docs/execution_strategy.md`, `CLAUDE.md`.
  - Reads/Writes: `content/ideas/*.md` (frontmatter + body).

- `drafting`
  - Reads/Writes: `content/ideas/*.md` (outline + draft; updates `status`).

- `projection-blog`
  - Reads: one idea file.
  - Reads/Writes: one post file under `content/posts/` for that idea.

- `projection-linkedin`
  - Reads: one idea file.
  - Reads/Writes: one LinkedIn file under `content/linkedin/` for that idea.

- `projection-junglebrief`
  - Reads: multiple ideas and posts.
  - Reads/Writes: one Jungle Brief issue file.

- `editorial`
  - Reads: ideas, posts, LinkedIn, Jungle Brief.
  - Writes: small edits and suggestions only.

## 4. State transitions (Ideas)

- `strategy`:
  - Creates new ideas with `status: idea`.
  - Marks selected ideas as `status: drafting`.
- `drafting`:
  - Moves ideas from `status: drafting` to `status: ready_for_projection` when the canonical draft is solid.
- `projection-*`:
  - Do not change idea `status` except to propose `published` once key projections exist.
- `editorial`:
  - May recommend `status: published` but does not change automation or publishing scripts.
