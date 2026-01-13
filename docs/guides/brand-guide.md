# Mad Monkey Club Brand Guide

The unified visual identity for Xavier Fuentes' content ecosystem.

## Brand Architecture

```
Mad Monkey Club (parent company)
├── Infinite Monkey (blog at xavierfuentes.com)
├── The Jungle Brief (newsletter)
└── Lead Magnets (PDFs, checklists, guides)
```

All channels share the same visual language whilst serving different purposes.

## Brand Personality

**Professional but bold** — serious expertise delivered with character and confidence.

- Authoritative without being corporate
- Distinctive without being gimmicky
- The jungle theme adds warmth and memorability
- Content is the hero; design supports, doesn't distract

## Colour Palette

### Primary Colours

| Name | Hex | Usage |
|------|-----|-------|
| **Deep Jungle** | `#0d2818` | Primary backgrounds, headers, navigation |
| **Forest** | `#1a3c34` | Secondary backgrounds, cards, sections |
| **Golden Amber** | `#d4a05e` | Accent colour, CTAs, links, highlights |

### Supporting Colours

| Name | Hex | Usage |
|------|-----|-------|
| **Dark Forest** | `#1a2e1a` | Primary text |
| **Muted Green** | `#4a5a4a` | Secondary text, captions |
| **Warm White** | `#faf9f7` | Page backgrounds |
| **Light Sage** | `#e8ece8` | Borders, dividers, subtle backgrounds |

### Functional Colours

| Name | Hex | Usage |
|------|-----|-------|
| **Burnt Orange** | `#c44536` | Warnings, alerts, important notices |
| **Success Green** | `#2d6a4f` | Success states, positive indicators |

### CSS Custom Properties

```css
:root {
  /* Primary */
  --brand-primary: #0d2818;
  --brand-secondary: #1a3c34;
  --brand-accent: #d4a05e;

  /* Text */
  --text-primary: #1a2e1a;
  --text-secondary: #4a5a4a;
  --text-light: #6a7a6a;

  /* Backgrounds */
  --background: #faf9f7;
  --background-alt: #f0f2f0;
  --background-dark: #0d2818;

  /* Borders */
  --border-color: #e8ece8;

  /* Functional */
  --color-warning: #c44536;
  --color-success: #2d6a4f;
}
```

## Typography

### Font Pairing

**Display/Headings**: Sora
- Modern, geometric, distinctive
- Weights: 600 (semibold), 700 (bold)

**Body**: Source Sans 3
- Highly readable, professional
- Weights: 400 (regular), 600 (semibold)

**Monospace** (code): IBM Plex Mono
- Clean, technical

### Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Source+Sans+3:wght@400;600&family=IBM+Plex+Mono:wght@400&display=swap');
```

### Type Scale (Web)

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.5rem (40px) | 700 | 1.2 |
| H2 | 1.75rem (28px) | 600 | 1.25 |
| H3 | 1.25rem (20px) | 600 | 1.3 |
| Body | 1.125rem (18px) | 400 | 1.6 |
| Small | 0.875rem (14px) | 400 | 1.5 |

### Type Scale (PDF/Print)

| Element | Size | Weight |
|---------|------|--------|
| Cover Title | 36-48pt | 700 |
| Chapter Title | 28-32pt | 700 |
| Section (H2) | 20-24pt | 600 |
| Body | 11-12pt | 400 |

## Logo Usage

### Primary: Wordmark

**"Infinite Monkey"** (blog) and **"The Jungle Brief"** (newsletter) use text-based logos in Sora Bold.

- Primary: Deep Jungle (#0d2818) on light backgrounds
- Reversed: Warm White (#faf9f7) on dark backgrounds
- Accent the "∞" symbol in Golden Amber when possible

### Future: Monkey Mark

When developed, the monkey mark should be:
- Abstract/geometric, not cartoonish
- Work at small sizes (favicons, social avatars)
- Incorporate subtle "infinite" (∞) motif if possible

## Channel-Specific Applications

### Infinite Monkey (Blog)

**Purpose**: Long-form thought leadership, SEO, lead generation

- Header: Deep Jungle background, Warm White text
- Accent: Golden Amber for links, buttons, highlights
- Cards/content: Warm White background
- Subscribe button: Golden Amber with Deep Jungle text

**Ghost Theme Settings:**
```
Accent colour: #d4a05e
Background: #faf9f7 (or white)
```

### The Jungle Brief (Newsletter)

**Purpose**: Curated insights, direct relationship building

- Header banner: Deep Jungle with Golden Amber accent line
- Section headers: Forest (#1a3c34) backgrounds
- Body: Warm White background for readability
- CTAs: Golden Amber buttons

### Lead Magnets (PDFs)

**Purpose**: Email capture, demonstrate expertise

- Cover: Deep Jungle background, white text, Golden Amber accent
- Interior: Warm White background, standard hierarchy
- Callout boxes: Tinted backgrounds using brand colours
- CTAs: Golden Amber highlights

## Component Styles

### Buttons

**Primary Button**
```css
.btn-primary {
  background: var(--brand-accent);
  color: var(--brand-primary);
  font-family: var(--font-display);
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  border: none;
}

.btn-primary:hover {
  background: #c4914e; /* Slightly darker amber */
}
```

**Secondary Button**
```css
.btn-secondary {
  background: transparent;
  color: var(--brand-accent);
  border: 2px solid var(--brand-accent);
  font-family: var(--font-display);
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
}
```

### Callout Boxes

**Tip/Pro-tip**
- Background: Golden Amber at 10% opacity
- Left border: Golden Amber (4px)

**Warning**
- Background: Burnt Orange at 10% opacity
- Left border: Burnt Orange (4px)

**Key Takeaway**
- Background: Deep Jungle
- Text: White
- Full-width block

### Links

```css
a {
  color: var(--brand-accent);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}

a:hover {
  text-decoration-thickness: 2px;
}
```

## Voice & Tone (Writing Style)

This brand guide focuses on visual identity. See `docs/content_strategy.md` for:
- Writing voice guidelines
- Content pillar definitions
- Target audience personas

## Ghost Blog Setup

**Ghost Admin → Settings → Design:**
- Accent colour: `#d4a05e`
- Site title: "Infinite Monkey"

**Code Injection (Settings → Code Injection → Site Header):**

```html
<style>
  :root {
    --ghost-accent-color: #d4a05e;
  }

  .gh-head {
    background: #0d2818;
  }

  .gh-head a {
    color: #faf9f7;
  }

  body {
    font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1a2e1a;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Sora', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #0d2818;
  }

  a {
    color: #d4a05e;
  }

  .gh-head-button {
    background: #d4a05e !important;
    color: #0d2818 !important;
  }
</style>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
```

## Related Resources

| Resource | Location |
|----------|----------|
| PDF templates | `.claude/skills/pdf-leadmagnet/templates/` |
| Typography guide | `.claude/skills/pdf-leadmagnet/context/typography.md` |
| Design principles | `.claude/skills/pdf-leadmagnet/context/design-principles.md` |
| Content strategy | `docs/content_strategy.md` |
