# Content Workflow

## Simplified Status Flow

```
idea → drafting → published → archived
```

### Where Content Lives

| Location | Purpose | Edit here? |
|----------|---------|------------|
| `content/ideas/` | Lightweight planning (metadata + outline) | Planning only |
| `content/drafts/` | Blog posts you're writing and editing | **Yes** |
| `content/posts/` | Published blog posts | After publishing |
| `content/linkedin/` | LinkedIn posts | Yes |
| `content/junglebrief/` | Newsletter issues | Yes |

### Status Definitions

| Status | Meaning | Next Action |
|--------|---------|-------------|
| idea | Captured concept, outline created | Pick for drafting |
| drafting | Draft exists in `content/drafts/` | Review, edit, polish |
| published | Blog post is live | Monitor performance |
| archived | No longer relevant | None |

## Weekly Rhythm

### Monday: Strategy + Planning (1 hour)

**Strategy Review (30 min):**

- Run `/pipeline` to see current distribution
- Review ideas in `status: idea`
- Pick 1-2 to work on this week
- Check for stale items

**Publishing Calendar (30 min):**

- Schedule content for the week
- Plan: 1 blog post, 3 LinkedIn posts

### Tuesday-Thursday: Execution

**Writing:**

- Create/edit drafts in `content/drafts/`
- Update idea status to `drafting` when you start

**LinkedIn:**

- Create LinkedIn posts (Tue framework, Wed take, Thu lesson)

**Publishing:**

- Review drafts, move to `content/posts/` when ready
- Run `/publish` to sync to Ghost

### Friday: Light Touch

- Quick review of week's performance
- Capture any new ideas
- No heavy writing

### Weekend: Newsletter

- Assemble Jungle Brief issue (bi-weekly)
- Draw from published content
- Schedule for Monday/Tuesday send

## Agent Handoffs

```
idea-builder → creates idea file (status: idea)
                    ↓
strategy-agent → reviews, proposes for drafting
                    ↓
drafting-agent → creates draft in content/drafts/
                    ↓
projection-blog → polishes for SEO
                    ↓
editorial-agent → reviews quality
                    ↓
You → publish (move to posts/, run /publish)
```

## Key Principle

**Drafts are the working document.** Ideas stay lean (metadata + outline). All blog writing and editing happens in `content/drafts/`.
