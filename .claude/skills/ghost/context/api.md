# Ghost Admin API Reference

## Overview

The Ghost Admin API is used by `scripts/publish.js` to sync content from this repo to Ghost.

## Authentication

**Required environment variables:**
- `GHOST_URL` - Your Ghost site URL (e.g., `https://xavierfuentes.com`)
- `GHOST_ADMIN_API_KEY` - Admin API key from Ghost settings

**API key format:** `{id}:{secret}` (64 character hex string)

## Endpoints Used

### Posts

| Operation | Endpoint | Method |
|-----------|----------|--------|
| List all | `/ghost/api/admin/posts/` | GET |
| Get one | `/ghost/api/admin/posts/{id}/` | GET |
| Create | `/ghost/api/admin/posts/` | POST |
| Update | `/ghost/api/admin/posts/{id}/` | PUT |
| Delete | `/ghost/api/admin/posts/{id}/` | DELETE |

### Pages

| Operation | Endpoint | Method |
|-----------|----------|--------|
| List all | `/ghost/api/admin/pages/` | GET |
| Get one | `/ghost/api/admin/pages/{id}/` | GET |
| Create | `/ghost/api/admin/pages/` | POST |
| Update | `/ghost/api/admin/pages/{id}/` | PUT |

## Post Object Fields

```json
{
  "title": "Post Title",
  "slug": "post-slug",
  "status": "published",
  "visibility": "public",
  "html": "<p>Content here</p>",
  "feature_image": "/images/hero.jpg",
  "featured": false,
  "meta_title": "SEO Title",
  "meta_description": "SEO description",
  "tags": [{"name": "Tag Name"}],
  "authors": [{"email": "author@email.com"}],
  "published_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T12:00:00.000Z"
}
```

## Source Format

The publish script converts markdown to HTML before sending. Ghost stores HTML, not markdown.

**Supported markdown:**
- Standard CommonMark
- GitHub-flavored markdown (tables, fenced code)
- Front matter is stripped before conversion

## Rate Limits

Ghost Admin API has rate limits:
- 100 requests per minute for reads
- 50 requests per minute for writes

The publish script handles this by batching updates.

## Error Handling

Common API errors:

| Code | Meaning | Resolution |
|------|---------|------------|
| 401 | Invalid API key | Check GHOST_ADMIN_API_KEY |
| 404 | Post/page not found | Verify slug exists |
| 422 | Validation error | Check frontmatter fields |
| 429 | Rate limited | Wait and retry |

## Matching Logic

The publish script matches posts by slug:

1. Fetch all posts from Ghost
2. For each markdown file:
   - If slug exists in Ghost → Update
   - If slug doesn't exist → Create
3. Orphaned Ghost posts (no matching markdown) are left alone

## Content OS Fields

These frontmatter fields are **not sent to Ghost** (repo-only):
- `idea_id`
- `pillar`
- `target_audience`
- `target_outcome`

They're stripped during publish but preserved in the markdown files.

## Manual API Testing

```bash
# Get all posts
curl -H "Authorization: Ghost ${GHOST_ADMIN_API_KEY}" \
  "${GHOST_URL}/ghost/api/admin/posts/"

# Get single post by slug
curl -H "Authorization: Ghost ${GHOST_ADMIN_API_KEY}" \
  "${GHOST_URL}/ghost/api/admin/posts/slug/your-post-slug/"
```

## Webhook Events

Ghost can send webhooks on content changes. Not currently used but available for:
- Post published
- Post updated
- Post deleted

Could be used for CI/CD integration in future.
