# /pipeline Command

Show content pipeline status and pillar distribution.

## What This Command Does

1. Scans all content directories
2. Groups content by status
3. Calculates pillar distribution
4. Compares to targets
5. Highlights items needing attention

## Execution Steps

1. **Scan ideas**: Read all `content/ideas/*.md`, group by status
2. **Scan drafts**: Read `content/drafts/*.md`
3. **Scan posts**: Read `content/posts/*.md`
4. **Calculate distribution**: Count ideas by pillar vs targets
5. **Report**: Present pipeline view and distribution analysis

## Usage

```
/pipeline
```

## Expected Output

```
Content Pipeline Status
=======================

IDEAS BY STATUS:
  idea (backlog):           8
  drafting (in progress):   2
  ready_for_projection:     3
  published:               12
  archived:                 4

DRAFTS PENDING REVIEW:
  - 2025-01-fractional-cto-positioning.md (technology-strategy)
  - 2025-01-stakeholder-comms.md (leadership-management)

PILLAR DISTRIBUTION (active ideas):
                        Current   Target   Gap
  technology-strategy      35%     30%    +5%
  leadership-management    20%     25%    -5%  ⚠️
  execution-delivery       25%     20%    +5%
  founder-lessons          15%     15%     0%
  market-ai-trends          5%     10%    -5%  ⚠️

ATTENTION NEEDED:
  - leadership-management under target: consider adding ideas
  - market-ai-trends under target: consider adding ideas
  - 3 ideas ready for projection (run projection agents)
  - 2 drafts pending review (run editorial agent or publish)
```

## Distribution Targets

| Pillar | Target |
|--------|--------|
| technology-strategy | 30% |
| leadership-management | 25% |
| execution-delivery | 20% |
| founder-lessons | 15% |
| market-ai-trends | 10% |
