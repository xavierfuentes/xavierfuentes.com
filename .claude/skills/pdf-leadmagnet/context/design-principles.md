# Design Principles for Lead Magnets

## Core Philosophy

Lead magnets should feel **premium and distinctive** — not like generic corporate PDFs. The goal is to create something the reader wants to keep, reference, and share.

## Visual Identity

### Avoid These Clichés

- Purple gradients (overused in tech/SaaS)
- Inter, Roboto, Arial (too generic)
- Stock photo covers
- Excessive iconography
- Cluttered layouts
- Thin, low-contrast text

### Embrace Instead

- **Bold colour blocking** — Large areas of solid colour
- **Generous whitespace** — Let content breathe
- **Strong typography** — Type as design element
- **Minimal decoration** — Content is the hero
- **Consistent rhythm** — Predictable spacing patterns

## Colour Strategy

### Three-Colour System

1. **Primary** — Dominant brand colour (backgrounds, headers)
2. **Neutral** — Text and subtle elements (dark greys, off-whites)
3. **Accent** — Highlights, CTAs, callouts (single vibrant colour)

### Recommended Palette Base

```
Primary:   #1a1a2e (deep navy/charcoal)
Secondary: #16213e (slightly lighter)
Accent:    #e94560 (vibrant coral/red)
Text:      #1a1a2e (dark) / #4a4a6a (secondary)
Background: #ffffff / #f8f9fa
```

### Colour Usage Rules

- Cover page: Bold use of primary colour
- Body pages: White/light background, primary for headings
- Callouts: Tinted backgrounds using accent at 10-15% opacity
- CTAs: Accent colour for action elements

## Layout Principles

### Whitespace

- **Page margins**: 15mm minimum (20mm preferred for ebooks)
- **Section spacing**: 2rem between major sections
- **Paragraph spacing**: 1rem between paragraphs
- **List item spacing**: 0.5rem between items

### Visual Hierarchy

Create hierarchy through:

1. **Scale** — Titles significantly larger than body (2x minimum)
2. **Weight** — Bold for emphasis, regular for body
3. **Space** — More space above important elements
4. **Colour** — Accent colour draws attention

### Grid System

- Single column for readability (ebook, checklist)
- Two columns for dense reference (cheatsheet)
- Consistent gutters (20px minimum)

## Component Styling

### Callout Boxes

```
┌─────────────────────────────────────┐
│ 💡 TIP                              │
│                                     │
│ Callout content with slightly       │
│ tinted background and left border.  │
└─────────────────────────────────────┘
```

- Left border (4px) in accent colour
- Background: accent at 5-10% opacity
- Padding: 1rem
- Rounded corners: 4px (subtle)

### Checklists

```
☐  Large, prominent checkbox (not tiny HTML default)
    Checkbox label with comfortable spacing

☑  Checked state uses accent colour
    Clear visual distinction
```

### Pull Quotes

```
"Large, impactful quote text that
 stands out from body copy."

 — Attribution
```

- Larger font size (1.25x body)
- Italic or distinct weight
- Accent colour for quotation marks or border
- Attribution in secondary text colour

## Cover Page Design

### Essential Elements

1. **Title** — Large, bold, commanding
2. **Subtitle** — Smaller, explains value proposition
3. **Author/Brand** — Establishes credibility
4. **Single Visual Element** — Optional geometric shape or pattern
5. **Logo** — Small, positioned consistently

### Cover Layout Pattern

```
┌─────────────────────────────────────┐
│                                     │
│  [Logo - top right, small]          │
│                                     │
│                                     │
│                                     │
│  LARGE TITLE                        │
│  GOES HERE                          │
│                                     │
│  Subtitle that explains the value   │
│                                     │
│                                     │
│                                     │
│  Author Name                        │
│  xavierfuentes.com                  │
│                                     │
└─────────────────────────────────────┘
```

## Quality Checklist

Before generating final PDF:

- [ ] Colours have sufficient contrast (WCAG AA minimum)
- [ ] Text is readable at intended print/screen size
- [ ] Whitespace is consistent throughout
- [ ] No orphaned headings (heading at bottom, content on next page)
- [ ] Images are high resolution (300dpi for print)
- [ ] Brand colours are applied consistently
- [ ] Page numbers are present and correct
- [ ] Links are styled distinctly (if included)
