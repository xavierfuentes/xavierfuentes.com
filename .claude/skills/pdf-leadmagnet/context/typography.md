# Typography Guide for Lead Magnets

## Font Pairing Recommendations

### Option 1: Sora + Source Sans 3 (Recommended)

**Display**: Sora — Geometric, modern, distinctive
**Body**: Source Sans 3 — Highly readable, professional

```css
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Source+Sans+3:wght@400;600&display=swap');

:root {
  --font-display: 'Sora', sans-serif;
  --font-body: 'Source Sans 3', sans-serif;
}
```

### Option 2: Space Grotesk + IBM Plex Sans

**Display**: Space Grotesk — Tech-forward, bold
**Body**: IBM Plex Sans — Clean, versatile

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Sans:wght@400;500&display=swap');

:root {
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'IBM Plex Sans', sans-serif;
}
```

### Option 3: Outfit + Nunito Sans

**Display**: Outfit — Friendly, approachable
**Body**: Nunito Sans — Warm, readable

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;700&family=Nunito+Sans:wght@400;600&display=swap');

:root {
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Nunito Sans', sans-serif;
}
```

## Font Files for Offline Use

Download TTF files for PDF generation (fonts.google.com):

```
fonts/
├── Sora-Regular.ttf
├── Sora-SemiBold.ttf
├── Sora-Bold.ttf
├── SourceSans3-Regular.ttf
└── SourceSans3-SemiBold.ttf
```

Embed in CSS:

```css
@font-face {
  font-family: 'Sora';
  src: url('fonts/Sora-Regular.ttf') format('truetype');
  font-weight: 400;
}

@font-face {
  font-family: 'Sora';
  src: url('fonts/Sora-SemiBold.ttf') format('truetype');
  font-weight: 600;
}

@font-face {
  font-family: 'Sora';
  src: url('fonts/Sora-Bold.ttf') format('truetype');
  font-weight: 700;
}
```

## Type Scale

### For Print/PDF (A4)

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Cover Title | 36-48pt | 700 | 1.1 |
| Cover Subtitle | 18-24pt | 400 | 1.3 |
| Chapter Title | 28-32pt | 700 | 1.2 |
| Section Heading (H2) | 20-24pt | 600 | 1.2 |
| Subsection (H3) | 16-18pt | 600 | 1.3 |
| Body Text | 11-12pt | 400 | 1.5-1.6 |
| Captions/Small | 9-10pt | 400 | 1.4 |
| Page Numbers | 9pt | 400 | 1 |

### Minimum Sizes

- **Body text**: Never below 11pt
- **Captions**: Never below 9pt
- **Interactive elements**: 12pt minimum for readability

## Line Height Rules

```css
/* Headings - tighter */
h1, h2, h3 { line-height: 1.2; }

/* Body - comfortable */
p, li { line-height: 1.5; }

/* Dense content (tables, lists) */
.compact { line-height: 1.3; }

/* Pull quotes */
blockquote { line-height: 1.4; }
```

## Letter Spacing

```css
/* Headings - slightly tighter */
h1, h2 { letter-spacing: -0.02em; }

/* All caps - looser */
.uppercase {
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Body - default */
p { letter-spacing: normal; }
```

## Paragraph Settings

```css
p {
  margin-bottom: 1em;
  max-width: 65ch; /* Optimal line length */
  text-align: left; /* Don't justify - causes rivers */
}

/* First paragraph after heading - no indent */
h2 + p, h3 + p {
  text-indent: 0;
}
```

## Emphasis Hierarchy

1. **Bold** (`<strong>`) — Primary emphasis
2. *Italic* (`<em>`) — Secondary emphasis, titles
3. `Code` (`<code>`) — Technical terms, commands
4. CAPS — Sparingly, for labels only
5. Colour — Accent colour for key terms

```css
strong { font-weight: 600; }
em { font-style: italic; }
code {
  font-family: 'IBM Plex Mono', monospace;
  background: #f4f4f4;
  padding: 0.1em 0.3em;
  border-radius: 3px;
  font-size: 0.9em;
}
```

## Heading Styles

```css
h1 {
  font-family: var(--font-display);
  font-size: 32pt;
  font-weight: 700;
  color: var(--brand-primary);
  margin-top: 0;
  margin-bottom: 1rem;
}

h2 {
  font-family: var(--font-display);
  font-size: 22pt;
  font-weight: 600;
  color: var(--brand-primary);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--brand-accent);
}

h3 {
  font-family: var(--font-display);
  font-size: 16pt;
  font-weight: 600;
  color: var(--text-primary);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
```

## Lists

```css
ul, ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* Nested lists */
li > ul, li > ol {
  margin-top: 0.5rem;
  margin-bottom: 0;
}
```

## Tables

```css
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 11pt;
}

th {
  font-family: var(--font-display);
  font-weight: 600;
  text-align: left;
  padding: 0.75rem;
  background: var(--brand-primary);
  color: white;
}

td {
  padding: 0.75rem;
  border-bottom: 1px solid #e0e0e0;
}

tr:nth-child(even) {
  background: #f8f9fa;
}
```

## Accessibility Notes

- Maintain 4.5:1 contrast ratio for body text
- Maintain 3:1 contrast ratio for large text (18pt+)
- Don't rely solely on colour for meaning
- Use actual heading elements (not just styled text)
- Keep line length under 75 characters
