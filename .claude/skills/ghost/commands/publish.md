# /publish Command

Sync all content from the repo to Ghost CMS.

## Usage

```
/publish
```

## What It Does

1. Reads all markdown files from `content/drafts/`, `content/posts/`, and `content/pages/`
2. Validates frontmatter for required fields
3. Converts markdown to HTML
4. Creates or updates posts/pages in Ghost via Admin API
5. Reports success/failure for each file

## Prerequisites

- `GHOST_URL` environment variable set
- `GHOST_ADMIN_API_KEY` environment variable set
- Valid frontmatter in all content files

## Pre-flight Checks

Before publishing, the script checks:
- [ ] Required frontmatter fields present (title, slug, status)
- [ ] Slugs are unique across all files
- [ ] Ghost API is reachable
- [ ] API key is valid

## Output

```
Publishing to Ghost...

✓ content/posts/2024-01-15-tech-debt.md → published
✓ content/posts/2024-01-10-hiring.md → updated
✗ content/drafts/2024-01-20-wip.md → validation error

Published: 2
Updated: 1
Errors: 1
```

## Error Recovery

If a publish fails:

1. Check the error message for the specific file
2. Run `/validate` to identify frontmatter issues
3. Fix the issue in the markdown file
4. Re-run `/publish`

## Implementation

Runs: `npm run publish`
Script: `scripts/publish.js`

## Related Commands

- `/validate` - Check frontmatter before publishing
- `/promote` - Move a draft to published status
