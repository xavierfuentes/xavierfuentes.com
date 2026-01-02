# Content Structure Guide

## Document Anatomy

Every lead magnet follows this general structure:

```
1. Cover Page
2. Welcome/Intro Section
3. Content Sections (varies by type)
4. CTA/Next Steps Section
5. About the Author (optional)
```

## Cover Page

### Required Elements

- **Title** — Clear, benefit-focused
- **Subtitle** — Expands on the promise
- **Author/Brand** — Credibility signal
- **Logo** — Brand recognition

### Optional Elements

- Visual element (geometric shape, pattern)
- Tagline or URL
- Edition/version number

### Layout Template

```
┌─────────────────────────────────────────────┐
│                                             │
│                            [Logo]           │
│                                             │
│                                             │
│                                             │
│   THE TITLE OF YOUR                         │
│   LEAD MAGNET                               │
│                                             │
│   A subtitle that explains exactly          │
│   what the reader will get                  │
│                                             │
│                                             │
│                                             │
│   ─────────────────                         │
│                                             │
│   Xavier Fuentes                            │
│   xavierfuentes.com                         │
│                                             │
└─────────────────────────────────────────────┘
```

## Welcome Section

**Purpose**: Set expectations and build credibility.

### Structure

1. **Opening hook** — Why this matters (2-3 sentences)
2. **What you'll learn** — Bullet list of outcomes
3. **Who this is for** — Target audience
4. **Brief credibility** — Why trust this author

### Example

```markdown
## Welcome

You're about to make one of the most consequential decisions
of your company's technical journey. Build vs buy choices
have sunk startups and saved them.

**In this guide, you'll learn:**

- The hidden costs most teams miss when building
- A framework for making defensible decisions
- Red flags that signal "buy" regardless of team capability
- How to present your recommendation to stakeholders

**This guide is for** CTOs, engineering managers, and technical
founders making technology decisions at companies with 10-200
engineers.

I've made this decision dozens of times across startups and
scale-ups. Some I got right. Some I got expensively wrong.
This framework is what I wish I'd had earlier.
```

## Content Sections

### Ebook Structure

```
Chapter 1: The Problem
  - Context and stakes
  - Common misconceptions

Chapter 2: The Framework
  - Core methodology
  - Step-by-step process

Chapter 3: Application
  - Case studies
  - Examples

Chapter 4: Implementation
  - Practical steps
  - Templates

Chapter 5: Pitfalls
  - What to avoid
  - Warning signs
```

### Checklist Structure

```
Section 1: Phase Name
  □ Action item with brief context
  □ Action item with brief context
  □ Action item with brief context

Section 2: Phase Name
  □ Action item with brief context
  □ Action item with brief context

[Repeat for each phase]
```

### Cheatsheet Structure

```
┌─────────────────┬─────────────────┐
│ Category 1      │ Category 2      │
├─────────────────┼─────────────────┤
│ • Item          │ • Item          │
│ • Item          │ • Item          │
│ • Item          │ • Item          │
└─────────────────┴─────────────────┘

Quick Reference Table
─────────────────────────────────────
Situation  │ Action    │ Notes
─────────────────────────────────────
Scenario A │ Do X      │ Context
Scenario B │ Do Y      │ Context
```

## Callout Types

### Tip Box

```markdown
::: tip
Pro tip content that helps the reader succeed.
:::
```

Styling: Light accent background, accent left border

### Warning Box

```markdown
::: warning
Warning content about common mistakes or risks.
:::
```

Styling: Light red/orange background, warning left border

### Note Box

```markdown
::: note
Additional context or clarification.
:::
```

Styling: Light grey background, subtle left border

### Key Takeaway Box

```markdown
::: key-takeaway
The essential point the reader must remember.
:::
```

Styling: Prominent accent styling, possibly full-width

## Pull Quotes

Use for impactful statements:

```markdown
> "The best technical leaders I know have walked away from
> roles that looked great on paper."
```

Styling: Larger text, accent colour quotation marks, centered

## CTA Section

### Purpose

Convert reader to next action (newsletter, consultation, related resource).

### Structure

```markdown
## What's Next?

[Brief transition from content to action]

**Ready to [specific outcome]?**

[Primary CTA with clear benefit]

**Want more insights like this?**

[Secondary CTA - newsletter signup]

**Need hands-on help?**

[Tertiary CTA - consultation/services]
```

### Example

```markdown
## What's Next?

You now have a framework for making better build vs buy
decisions. But frameworks only work when you use them.

**Ready to apply this to your current decision?**

Download the companion spreadsheet with the full scoring
matrix pre-built: [link]

**Want more frameworks like this?**

Subscribe to The Jungle Brief for weekly insights on
technology leadership: xavierfuentes.com/newsletter

**Need help with a specific decision?**

Book a free 30-minute consultation to talk through your
situation: xavierfuentes.com/consult
```

## Footer Structure

Every page (except cover) should include:

```
─────────────────────────────────────────────────
Xavier Fuentes | xavierfuentes.com           [3]
```

- Author/brand name (left)
- Website URL (optional, center or left)
- Page number (right)

## Page Break Guidelines

### Force Break Before

- New chapters
- Major sections
- CTA section

### Force Break After

- Cover page
- Table of contents
- Full-page visuals

### Avoid Breaking

- Headings (keep with following content)
- Callout boxes
- Tables
- Code blocks
- Lists (keep together if short)

```css
.page-break-before { page-break-before: always; }
.page-break-after { page-break-after: always; }
.avoid-break { page-break-inside: avoid; }
```

## Content Length Guidelines

| Type | Ideal Length | Max Length |
|------|--------------|------------|
| Ebook | 10-20 pages | 30 pages |
| Checklist | 1-2 pages | 4 pages |
| Cheatsheet | 1-2 pages | 2 pages |

Shorter is usually better. Respect the reader's time.
