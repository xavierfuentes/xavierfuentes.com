# Ghost Sync Behaviour

## Source of Truth

**The repo is the source of truth. Ghost is downstream.**

This means:
- All content edits should happen in markdown files
- `scripts/publish.js` syncs repo → Ghost
- Edits made in Ghost Admin will be overwritten

## Directory Mapping

| Repo Directory | Ghost Content Type |
|----------------|-------------------|
| `content/drafts/*.md` | Posts (draft status) |
| `content/posts/*.md` | Posts (published/scheduled) |
| `content/pages/*.md` | Pages |

## Publishing Workflow

### For New Posts

1. Create post in `content/drafts/` with `status: draft`
2. Edit and refine the content
3. When ready, move to `content/posts/`
4. Change `status: draft` → `status: published`
5. Run `/publish` or push to main

### For Existing Posts

1. Edit the markdown file directly
2. Run `/publish` to sync changes to Ghost
3. Ghost version will match repo exactly

### For Quick Fixes in Ghost Admin

If you must edit in Ghost Admin:
1. Make your edit in Ghost
2. Immediately update the corresponding markdown file
3. Push to repo to keep them in sync

**Warning:** If you don't update the markdown, your Ghost edit will be lost on next publish.

## Status Mapping

| Markdown Status | Ghost Status |
|-----------------|--------------|
| `draft` | Draft (not visible) |
| `published` | Published (live) |
| `scheduled` | Scheduled (needs `published_at`) |

## File Naming Convention

```
content/posts/YYYY-MM-DD-slug.md
```

- Date prefix helps with chronological sorting
- Slug must match frontmatter `slug` field
- Keep filenames URL-safe (no spaces, lowercase)

## What Gets Synced

**Synced from frontmatter:**
- title
- slug
- status
- visibility
- meta_title
- meta_description
- feature_image
- featured
- excerpt / custom_excerpt
- tags
- authors
- published_at
- updated_at

**Not synced (repo-only):**
- idea_id
- pillar
- target_audience
- target_outcome

These Content OS fields are preserved in markdown but not sent to Ghost.

## Conflict Resolution

If Ghost and repo diverge:

1. **Repo wins** - The publish script overwrites Ghost
2. **No merge** - There's no automatic merging
3. **Manual resolution** - If needed, copy from Ghost Admin before publishing

## Common Issues

### Post not appearing
- Check `status: published` in frontmatter
- Verify slug is unique
- Run `/validate` for errors

### Changes not syncing
- Ensure file is in correct directory
- Check for YAML syntax errors
- Verify Ghost API credentials

### Duplicate posts
- Matching is by slug, not filename
- Ensure slugs are unique across all posts
- Delete orphan posts in Ghost Admin

## Safety Rules

**Never:**
- Edit directly in Ghost Admin without updating markdown
- Change slugs of published posts (breaks links)
- Delete markdown files without unpublishing first

**Always:**
- Run `/validate` before `/publish`
- Keep repo and Ghost in sync
- Treat the repo as canonical
