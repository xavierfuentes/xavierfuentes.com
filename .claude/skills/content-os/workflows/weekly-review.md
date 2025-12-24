# /weekly Command

Generate the weekly review summary for Monday planning.

## What This Command Does

1. Analyses the content pipeline state
2. Reviews what was published last week
3. Checks pillar distribution health
4. Identifies stale content (stuck in one status too long)
5. Proposes ideas to move to drafting
6. Suggests focus areas for the week

## Execution Steps

1. **Published last week**: Find posts with `published_at` in the last 7 days
2. **LinkedIn activity**: Check `content/linkedin/` for recent posts
3. **Pipeline health**: Run pipeline status analysis
4. **Stale content check**: Find ideas stuck in `drafting` for >2 weeks
5. **Drafting candidates**: Propose 1-2 ideas to move from `idea` to `drafting`
6. **Generate report**: Present findings with recommendations

## Usage

```
/weekly
```

## Expected Output

```
Weekly Review - Monday 06/01/2025
=================================

LAST WEEK'S OUTPUT:
  Blog posts published: 1
    - "Technical Debt: A Strategic Framework" (technology-strategy)

  LinkedIn posts: 3
    - Framework post (Tuesday)
    - Industry take (Wednesday)
    - Personal lesson (Thursday)

  Newsletter: Issue #4 sent

PIPELINE HEALTH:
  Ideas in backlog: 8
  Currently drafting: 2
  Ready for projection: 1

  Pillar balance: ⚠️ leadership-management under target

ATTENTION NEEDED:
  Stale items (>2 weeks in drafting):
    - 2025-01-build-vs-buy (23 days in drafting) ← needs attention

RECOMMENDATIONS FOR THIS WEEK:

  Move to drafting:
    1. 2025-01-stakeholder-comms (leadership-management)
       Reason: Pillar under target, strong angle, ready to develop

    2. 2025-01-ai-adoption-patterns (market-ai-trends)
       Reason: Timely topic, pillar under target

  Focus areas:
    - Complete stale draft: build-vs-buy idea
    - Create projection for: 2025-01-first-90-days (ready_for_projection)
    - LinkedIn: Continue Tuesday/Wednesday/Thursday rhythm
```

## Weekly Rhythm Reference

**Monday:**
- Review pipeline status
- Select 1-2 ideas to move to drafting
- Plan the week's content

**Tuesday-Thursday:**
- Drafting: Expand selected ideas
- Projection: Create blog + LinkedIn content
- LinkedIn: Post according to rhythm

**Weekend:**
- Compose newsletter (bi-weekly initially)
- Light performance review
