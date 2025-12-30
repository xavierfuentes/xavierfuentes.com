# Content Workflow

## Status Flow

```
idea → drafting → ready_for_projection → published → archived
```

### Status Definitions

| Status | Meaning | Next Action |
|--------|---------|-------------|
| idea | Captured concept, not yet developed | Review in strategy session |
| drafting | Being developed into canonical draft | Complete draft with drafting-agent |
| ready_for_projection | Canonical draft complete, ready for channels | Create channel projections |
| published | All projections published | Monitor performance |
| archived | No longer relevant or completed lifecycle | None |

## Weekly Rhythm

### Monday: Strategy + Planning (1 hour)

**Strategy Review (30 min):**
- Run `/pipeline` to see current distribution
- Review ideas in `status: idea`
- Select 1-2 to move to `status: drafting`
- Check for stale items (>2 weeks in drafting)

**Publishing Calendar (30 min):**
- Schedule specific content for the week
- Plan: 1 blog post, 3 LinkedIn posts
- Assign publication dates

### Tuesday-Thursday: Execution

**Drafting (as needed):**
- Work on ideas in `status: drafting`
- Move to `ready_for_projection` when complete

**Projection (as needed):**
- Create blog post from `ready_for_projection` ideas
- Create LinkedIn posts (Tue framework, Wed take, Thu lesson)

**Publishing:**
- Review and publish scheduled content
- Move files to appropriate status

### Friday: Light Touch

- Quick review of week's performance
- Capture any new ideas from the week
- No heavy writing

### Weekend: Newsletter

- Assemble Jungle Brief issue (bi-weekly)
- Draw from published content and ideas
- Schedule for Monday/Tuesday send

## Projection Workflow

When an idea reaches `ready_for_projection`:

1. **Primary channel first**
   - If `primary_channel: personal_blog` → create blog post
   - If `primary_channel: linkedin` → create LinkedIn posts

2. **Secondary channels**
   - Work through `secondary_channels` array
   - Each projection links back via `idea_id`

3. **Update idea status**
   - Once all projections created: `status: published`
   - (Even if posts are still drafts in their channels)

## Backlog Health Checks

Run periodically:

**Stale drafting (>2 weeks):**
- Either complete or return to `idea` status
- Consider if scope is too large

**Ready but not projected (>1 week):**
- Create projections or reconsider priority

**Old ideas (>3 months in `idea` status):**
- Validate still relevant
- Consider archiving

## Handoffs Between Agents

```
idea-builder → creates idea file with status: idea
                    ↓
strategy-agent → reviews, sets status: drafting
                    ↓
drafting-agent → develops, sets status: ready_for_projection
                    ↓
projection-* agents → create channel files
                    ↓
editorial-agent → reviews consistency
                    ↓
You → publish (manual step)
```

Each agent should only modify its designated files and statuses.
