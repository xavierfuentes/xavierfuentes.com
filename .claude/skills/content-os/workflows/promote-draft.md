# /promote Command

Move a draft to posts and set status to published.

## What This Command Does

1. Finds the specified draft in `content/drafts/`
2. Moves it to `content/posts/`
3. Updates `status: draft` to `status: published`
4. Optionally runs publish to sync to Ghost

## Usage

```
/promote [slug]
```

Examples:
```
/promote 2025-01-fractional-cto-positioning
/promote fractional-cto-positioning
```

## Execution Steps

1. **Find draft**: Locate file matching slug in `content/drafts/`
2. **Confirm**: Show file details and ask for confirmation
3. **Update frontmatter**: Change `status: draft` to `status: published`
4. **Move file**: Move from `content/drafts/` to `content/posts/`
5. **Ask about publish**: Offer to run `/publish` to sync to Ghost

## Expected Output

```
Found draft: content/drafts/2025-01-fractional-cto-positioning.md

  Title: "What a Fractional CTO Actually Does (And When You Need One)"
  Pillar: technology-strategy
  Idea ID: 2025-01-fractional-cto-positioning

Promoting to published...

✓ Updated status to: published
✓ Moved to: content/posts/2025-01-fractional-cto-positioning.md

Run /publish to sync to Ghost? (y/n)
```

## Pre-flight Checks

Before promoting, verify:
- [ ] File exists in `content/drafts/`
- [ ] Has required Ghost frontmatter (title, slug, status, visibility)
- [ ] Has Content OS metadata (idea_id, pillar)

## Important Notes

- This is the final step before content goes live
- The file must have been reviewed (consider running editorial agent first)
- After promoting, run `/publish` to sync to Ghost
