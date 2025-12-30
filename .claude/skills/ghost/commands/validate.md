# /validate Command

Check frontmatter validity across all content files.

## Usage

```
/validate
```

## What It Checks

### Required Fields (Posts)

- `title` - Post title
- `slug` - URL slug (kebab-case)
- `status` - draft, published, or scheduled
- `visibility` - public, members, or paid

### Required Fields (Ideas)

- `id` - Unique identifier
- `pillar` - Valid pillar enum
- `status` - Valid status enum
- `primary_channel` - Valid channel enum
- `target_audience` - Audience code
- `target_outcome` - Outcome code

### Uniqueness

- All slugs must be unique across posts and pages
- All idea IDs must be unique

### Enum Validation

**Pillars:**
- technology-strategy
- leadership-management
- execution-delivery
- founder-lessons
- market-ai-trends

**Statuses (ideas):**
- idea, drafting, ready_for_projection, published, archived

**Statuses (posts):**
- draft, published, scheduled

**Channels:**
- personal_blog, linkedin, newsletter

## Output

```
Validating content files...

content/posts/
  ✓ 2024-01-15-tech-debt.md
  ✓ 2024-01-10-hiring.md
  ✗ 2024-01-20-wip.md - missing required field: slug

content/ideas/
  ✓ 2024-01-ai-tooling.md
  ✗ 2024-01-untitled.md - invalid pillar: 'tech-strategy'

Errors: 2
Warnings: 0
```

## Common Errors

| Error | Fix |
|-------|-----|
| missing required field | Add the field to frontmatter |
| invalid enum value | Check spelling against allowed values |
| duplicate slug | Change one of the conflicting slugs |
| duplicate idea_id | Ensure each idea has unique ID |

## When to Run

- Before `/publish` to catch issues early
- After creating new content files
- As part of CI/CD pipeline

## Implementation

Runs: `npm run validate`
Script: `scripts/validate.js`

## Related Commands

- `/publish` - Sync to Ghost after validation passes
- `/promote` - Move draft to posts (runs validation first)
