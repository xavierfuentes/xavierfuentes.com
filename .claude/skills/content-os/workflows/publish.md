# /publish Command

Sync content to Ghost CMS.

## What This Command Does

1. Runs `npm run publish` to sync markdown files to Ghost
2. Reports what changed (created, updated, unchanged)
3. Shows any errors or warnings

## Execution Steps

1. **Pre-flight check**: Verify we're in the project root
2. **Run publish script**: Execute `npm run publish`
3. **Parse output**: Extract created/updated/unchanged counts
4. **Report results**: Summarise what happened

## Usage

```
/publish
```

## Expected Output

```
Publishing to Ghost...

Results:
- Created: 2 posts
- Updated: 1 post
- Unchanged: 5 posts
- Errors: 0

Posts synced successfully.
```

## Important Notes

- The repo is the source of truth; Ghost is downstream
- Files in `content/drafts/` sync as Ghost drafts (preview only)
- Files in `content/posts/` with `status: published` go live
- Edits made directly in Ghost Admin will be overwritten on next publish
