# Content Standards

Consolidated length, format, and cadence standards for all content channels.

---

## Blog Posts

### Word Count Guidelines

| Content Type | Word Count | Notes |
|--------------|------------|-------|
| **Default** | 1,500-1,800 | Standard framework or tactical post |
| Framework/how-to | 1,500-2,000 | Step-by-step guides, templates |
| Thought leadership | 1,800-2,200 | Authority pieces, industry perspectives |
| Case study deep-dive | 2,000-2,500 | Detailed real-world analysis |
| Opinion/hot take | 800-1,200 | Shorter, punchy commentary |

### SEO Requirements

| Element | Limit |
|---------|-------|
| Title | Under 60 characters |
| Meta description | 150-160 characters |

### Structure

Seven-section template (see `.claude/skills/blog/context/structure.md`):
1. Hook (1-2 paragraphs)
2. Context (1-2 paragraphs)
3. Framework (main body)
4. Case Study (optional)
5. Implementation
6. Pitfalls
7. Next Steps / CTA

---

## LinkedIn Posts

### Character Guidelines

| Metric | Guideline |
|--------|-----------|
| **Optimal** | 1,200-1,800 characters |
| Hook (first line) | Under 140 characters |
| Maximum | 2,000 characters (engagement drops beyond) |
| Minimum | 500 characters (algorithm penalises) |

**Note:** LinkedIn counts characters, not words. Includes spaces.

### Structure

```
[Hook - pattern-interrupting first line]

[2-3 short paragraphs developing the idea]

[Practical takeaway or recommendation]

[Question to prompt engagement OR soft CTA]
```

### Formatting

- Maximum 2-3 sentences per paragraph
- Line break between every paragraph
- Bold sparingly for emphasis
- Maximum 3 hashtags at the end
- Avoid emojis unless explicitly brand-aligned

---

## Newsletter (The Jungle Brief)

### Issue Length

| Section | Words | Reading Time |
|---------|-------|--------------|
| Opening Hook | 20-50 | 10 sec |
| Deep Insight | 500-700 | 2-3 min |
| Template/Tool | 200-300 | 1 min |
| Curated Links | 300-400 | 1-2 min |
| **Total** | **1,200-1,500** | **5-7 min** |

### Structure

1. **Opening Hook** - Bold statement, no preamble
2. **Deep Insight** - Main content, more personal than blog
3. **Template or Tool** - Practical utility
4. **Curated Links** - 3-5 links with commentary
5. **Sign-off** - Brief, personal close

---

## Lead Magnets

### Types

| Type | Length | Purpose |
|------|--------|---------|
| Checklist | 1-2 pages | Quick reference for processes/frameworks |
| Cheatsheet | 1 page | At-a-glance reference card |
| Ebook | 5-15 pages | Deep-dive guides with detailed content |

### Design Standards

See `.claude/skills/pdf-leadmagnet/` for design templates and styling guidelines.

### File Naming Convention

```
content/assets/YYYY-MM-slug.{pdf,html,md}
```

**Examples:**
- `content/assets/2026-01-first-90-days-checklist.pdf`
- `content/assets/2026-02-technical-debt-cheatsheet.pdf`
- `content/assets/2026-03-hiring-playbook.pdf`

---

## File Naming Conventions

### Pattern

```
YYYY-MM-slug.md
```

### Examples

| Type | Example |
|------|---------|
| Blog post | `2026-01-first-90-days-cto-playbook.md` |
| Idea | `2026-01-build-vs-buy-framework.md` |
| LinkedIn | `2026-01-technical-debt-truth.md` |
| Newsletter | `2026-01-issue-001.md` |

### Rules

- Use lowercase throughout
- Separate words with hyphens
- No special characters
- Keep slugs concise but descriptive
- Match slug to content title where possible

---

## Publishing Cadence

### Target Rhythm

| Channel | Frequency | Volume |
|---------|-----------|--------|
| Blog | 2-3 per month | Flexible scheduling, quality over calendar |
| LinkedIn | 2-3 per week | Tue/Wed/Thu optimal for B2B |
| Newsletter | Bi-weekly | Moving to weekly when stable |

### Weekly Schedule

| Day | Activity |
|-----|----------|
| Monday AM | Strategy review, pipeline check |
| Tuesday | LinkedIn post + blog editing (bi-weekly) |
| Wednesday | LinkedIn post |
| Thursday | LinkedIn post |
| Sunday | Newsletter compilation |

### LinkedIn Timing

- **Tuesday**: Framework share or template (peak B2B day)
- **Wednesday**: Industry hot take or observation
- **Thursday**: Personal lesson or behind-the-scenes

---

## Formatting Rules

### General

- Use subheadings (H2, H3) for scannability
- Break up long paragraphs (3-4 sentences max)
- Use bullet lists and numbered lists where helpful
- One idea per paragraph

### Blog-Specific

- **Bold** for key phrases (scannable)
- *Italics* sparingly for emphasis
- `Code` for technical terms, commands, file names
- Code blocks for templates and examples

### LinkedIn-Specific

- Use line breaks for readability
- Avoid complex markdown (doesn't render)
- No headers, code blocks, or long lists
- White space is essential for mobile

---

## Content Type Mapping

| Idea Type | Primary Channel | Secondary Channel |
|-----------|-----------------|-------------------|
| Framework/how-to | Blog | LinkedIn teaser |
| Opinion/hot take | LinkedIn | Newsletter mention |
| Personal lesson | LinkedIn | Newsletter deep insight |
| Industry trend | Blog | LinkedIn + Newsletter |
| Tool/template | Newsletter | Blog reference |
