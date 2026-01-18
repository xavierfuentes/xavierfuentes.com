# Agents

Agents are specialised workers that perform specific content operations. Each agent has a defined purpose, knows which skills to load, and produces consistent outputs.

## Agent Index

| Agent | When to Use | Example Trigger |
|-------|-------------|-----------------|
| `idea-builder` | Capture new content ideas | "I have an idea about X" |
| `strategy` | Review backlog, check pillar distribution | "What should I draft next?" |
| `drafting` | Create full blog drafts from ideas | "Draft the X idea into a post" |
| `projection-blog` | Polish drafts for SEO and Ghost | "Optimise X draft for SEO" |
| `projection-linkedin` | Create LinkedIn posts from ideas | "Turn X into LinkedIn posts" |
| `projection-junglebrief` | Assemble newsletter issues | "Create this week's Jungle Brief" |
| `editorial` | Review quality and consistency | "Review X for quality" |
| `lead-magnet` | Create PDF/HTML lead magnets from ideas | "Create the lead magnet for X idea" |

## Quick Decision Tree

```
Need to capture a new content concept?
  └─> idea-builder

Need to decide what to work on next?
  └─> strategy

Need to write a full blog post from an idea?
  └─> drafting

Need to polish a draft for publication?
  └─> projection-blog

Need to create LinkedIn content?
  └─> projection-linkedin

Need to assemble a newsletter issue?
  └─> projection-junglebrief

Need quality review before publishing?
  └─> editorial

Need to create a downloadable lead magnet (PDF checklist, framework, ebook)?
  └─> lead-magnet
```

## Typical Content Journey

```
                                    ┌─────────────────────┐
                                    │                     │
                                    v                     │
┌──────────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌─────────┐
│ idea-builder │───>│ strategy │───>│ drafting │───>│projection│───>│editorial│───> publish
│              │    │          │    │          │    │   blog   │    │         │
└──────────────┘    └──────────┘    └──────────┘    └──────────┘    └─────────┘
                                          │
                                          │         ┌──────────┐
                                          ├────────>│projection│───> LinkedIn
                                          │         │ linkedin │
                                          │         └──────────┘
                                          │
                                          │         ┌──────────┐
                                          └────────>│projection│───> Newsletter
                                                    │junglebrief│
                                                    └──────────┘
```

**Flow summary:**
1. **Capture** - `idea-builder` creates structured idea files in `content/ideas/`
2. **Prioritise** - `strategy` reviews backlog and selects ideas for drafting
3. **Draft** - `drafting` expands ideas into full blog posts in `content/drafts/`
4. **Project** - Projection agents adapt content for each channel
5. **Review** - `editorial` checks quality and consistency
6. **Publish** - Use `/publish` command to sync to Ghost

## Agent Capabilities Summary

### idea-builder

**Purpose:** Capture new content ideas through an interactive questionnaire.

**Input:** Rough topic or concept from the user.

**Output:** Structured idea file in `content/ideas/` with complete frontmatter and skeleton outline.

**Skills Used:** `pipeline` (for idea template and frontmatter schemas).

**Key Questions Asked:**
- Working title and topic
- Pillar assignment
- Primary and secondary channels
- Target audience and outcome
- Contrarian angle or key promise

---

### strategy

**Purpose:** Maintain the idea backlog, ensure pillar distribution, and select ideas for drafting.

**Input:** Current idea files in `content/ideas/`.

**Output:** Analysis of pillar distribution, recommendations for what to draft next, updated idea metadata.

**Skills Used:** `pipeline` (for pillar definitions and workflow rules).

**Capabilities:**
- Calculate current pillar distribution vs targets
- Flag incomplete metadata
- Propose ideas to advance to drafting
- Create ideas from research items

---

### drafting

**Purpose:** Create full blog drafts from structured ideas.

**Input:** Idea file with status `idea` or `drafting`.

**Output:** Complete blog post in `content/drafts/` following the 7-section structure.

**Skills Used:** `blog` (for voice and structure), `pipeline` (for pillar context).

**Key Behaviours:**
- Reads idea for context, writes draft separately (keeps ideas lean)
- Follows 7-section structure: Hook, Context, Framework, Case Study, Implementation, Pitfalls, Next Steps
- Updates idea status to `drafting`

---

### projection-blog

**Purpose:** Polish drafts for SEO and publication readiness.

**Input:** Draft file in `content/drafts/`.

**Output:** SEO-optimised draft with complete Ghost frontmatter.

**Skills Used:** `blog` (for SEO guidelines), `ghost` (for sync workflow).

**Capabilities:**
- Optimise title and meta description
- Add internal links
- Ensure frontmatter completeness
- Suggest `unsplash_prompt` for feature image

---

### projection-linkedin

**Purpose:** Create 2-3 LinkedIn posts from canonical drafts.

**Input:** Idea file with `status: ready_for_projection` or draft content.

**Output:** LinkedIn projection file in `content/linkedin/` with multiple posts separated by `---`.

**Skills Used:** `linkedin` (for voice, format, and weekly rhythm).

**Weekly Rhythm:**
- Tuesday: Framework or template share
- Wednesday: Industry observation or hot take
- Thursday: Personal lesson or behind-the-scenes

---

### projection-junglebrief

**Purpose:** Assemble The Jungle Brief newsletter issues from ideas and posts.

**Input:** Recent ideas and published posts (auto-detected since last issue).

**Output:** Newsletter issue file in `content/newsletter/`.

**Skills Used:** `newsletter` (for voice, format, and curation guidelines).

**Issue Structure:**
1. Industry Round-Up
2. One Deep Insight
3. Template/Tool of the Week
4. Curated Reading List with commentary

---

### editorial

**Purpose:** Review content for quality, consistency, and strategic alignment.

**Input:** Any content files (ideas, drafts, LinkedIn, newsletter).

**Output:** Quality assessment, consistency checks, specific improvement suggestions.

**Skills Used:** `blog`, `linkedin`, `newsletter` (for voice standards), `pipeline` (for strategic alignment).

**Review Areas:**
- Idea-to-projection consistency
- Quality checklist (passes "so what?" test, specific advice, etc.)
- Cross-links and CTAs
- Back-propagation flags (when projections improve on source)

---

### lead-magnet

**Purpose:** Create professional PDF lead magnets (checklists, cheatsheets, ebooks) from idea files.

**Input:** Idea file with `lead_magnet` field specified, or draft content to convert into a gated asset.

**Output:** PDF file in `content/assets/` plus intermediate markdown file.

**Skills Used:** `pdf-leadmagnet` (for generation script and templates), `pipeline` (for idea context and frontmatter).

**Template Types:**
- **checklist**: Action items, step-by-step processes (1-3 pages)
- **cheatsheet**: Decision frameworks, quick reference guides (1-2 pages)
- **ebook**: Multi-chapter guides, comprehensive playbooks (5-30+ pages)

## How Skills Load

**Skills are automatically loaded by agents - you do not need to do anything.**

When you invoke an agent (via the Task tool), the agent reads the relevant skill files from `.claude/skills/`. Each agent definition includes a "Skills Reference" section listing which context files and templates it uses.

For example, when `drafting` runs:
1. It loads `.claude/skills/blog/context/voice.md` for tone guidelines
2. It loads `.claude/skills/blog/context/structure.md` for the 7-section template
3. It uses these to produce consistent, on-brand content

You never need to manually load skills when using agents.

## Manual Skill Commands

Some skills provide slash commands for direct invocation:

| Command | Skill | Purpose |
|---------|-------|---------|
| `/pipeline` | pipeline | Show pipeline status, pillar distribution, stale items |
| `/publish` | ghost | Sync all content to Ghost CMS |
| `/validate` | ghost | Check frontmatter validity before publishing |
| `/promote [slug]` | ghost | Move draft to posts and publish |

Use these commands when you need a specific operation without running a full agent workflow.

## Invoking Agents

Agents are invoked via the Task tool. Example triggers:

```
"I have an idea about why engineering teams fail at estimation"
→ Task tool invokes idea-builder

"What's in the backlog? What should I draft next?"
→ Task tool invokes strategy

"Draft the first-90-days idea into a blog post"
→ Task tool invokes drafting

"Polish the build-vs-buy draft for SEO"
→ Task tool invokes projection-blog

"Create LinkedIn posts from the stakeholder-comms idea"
→ Task tool invokes projection-linkedin

"Create this week's Jungle Brief"
→ Task tool invokes projection-junglebrief

"Review the first-90-days draft before publishing"
→ Task tool invokes editorial
```

## Adding New Agents

To create a new agent:

1. Create a markdown file in `.claude/agents/` with YAML frontmatter
2. Define `name`, `description` (with usage examples), and `model`
3. Document which skills the agent uses
4. Define the agent's interaction protocol and scope
5. Include file management rules (what it MAY and MUST NOT do)

See existing agent files for the standard structure.
