# /promote Command

Move a draft to published status.

## Usage

```
/promote [slug]
```

## What It Does

1. Finds the file in `content/drafts/` matching the slug
2. Validates frontmatter
3. Changes `status: draft` → `status: published`
4. Moves file from `content/drafts/` to `content/posts/`
5. Runs `/publish` to sync to Ghost

## Example

```
/promote tech-debt-denial
```

Output:
```
Promoting: tech-debt-denial

✓ Validated frontmatter
✓ Updated status to published
✓ Moved to content/posts/2024-01-15-tech-debt-denial.md
✓ Published to Ghost

Post is now live at: https://xavierfuentes.com/tech-debt-denial/
```

## Pre-requisites

- File must exist in `content/drafts/`
- Slug must match frontmatter slug
- Frontmatter must pass validation

## Options

```
/promote [slug] --dry-run    # Show what would happen
/promote [slug] --no-publish # Move but don't sync to Ghost
```

## Common Issues

### File not found
- Check the slug matches exactly
- Ensure file is in `content/drafts/` not `content/posts/`

### Validation fails
- Run `/validate` to see specific errors
- Fix frontmatter before promoting

### Ghost sync fails
- Check Ghost API credentials
- Verify Ghost is accessible

## Manual Alternative

If the command isn't available, manually:

1. Open the draft file
2. Change `status: draft` to `status: published`
3. Move file: `mv content/drafts/file.md content/posts/`
4. Run `npm run publish`

## Related Commands

- `/validate` - Check file before promoting
- `/publish` - Sync all content to Ghost
