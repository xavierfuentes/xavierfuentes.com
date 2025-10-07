# Quick Start Guide
## n8n Data Tables Content Automation Setup

**Last Updated:** 2025-10-06
**Version:** 1.0

---

## Overview

This guide walks you through setting up the complete content automation system using n8n Data Tables, GitHub, and AI APIs. Estimated setup time: 2-3 hours.

**Prerequisites:**
- n8n Cloud Pro account (or self-hosted with Data Tables enabled)
- GitHub account with repository access
- OpenAI API key or Anthropic API key
- Ghost CMS instance with Admin API access

---

## Phase 1: n8n Setup (30 minutes)

### Step 1.1: Enable Data Tables

1. Log into n8n Cloud
2. Navigate to Settings → Data Tables
3. Confirm Data Tables feature is enabled (Pro plan required)

### Step 1.2: Create rss_sources Table

1. Click "Create New Table"
2. Name: `rss_sources`
3. Add columns:

| Column Name | Type | Required | Default |
|-------------|------|----------|---------|
| id | Text | Yes | - |
| name | Text | Yes | - |
| url | Text | Yes | - |
| content_pillar | Text | Yes | - |
| priority | Text | Yes | - |
| active | Checkbox | Yes | true |
| notes | Text | No | - |
| created_date | Date | Yes | TODAY() |

4. Click "Create Table"

### Step 1.3: Create content_pipeline Table

1. Click "Create New Table"
2. Name: `content_pipeline`
3. Add columns:

| Column Name | Type | Required | Default |
|-------------|------|----------|---------|
| id | Text | Yes | - |
| guid | Text | Yes | - |
| title | Text | Yes | - |
| url | Text | Yes | - |
| source_name | Text | Yes | - |
| content_pillar | Text | Yes | - |
| description | Text | No | - |
| quality_score | Number | No | - |
| status | Text | Yes | research |
| target_channel | Text | No | - |
| word_count_target | Number | No | - |
| created_date | Date | Yes | TODAY() |
| github_path | Text | No | - |
| github_commit_url | Text | No | - |
| notes | Text | No | - |

4. Click "Create Table"

### Step 1.4: Add RSS Sources

1. Open `rss_sources` table
2. Click "Add Row"
3. Add your RSS feeds (examples below):

**Example Sources:**

```
Row 1:
- id: 550e8400-e29b-41d4-a716-446655440001
- name: Martin Fowler's Blog
- url: https://martinfowler.com/feed.atom
- content_pillar: Technology Strategy
- priority: High
- active: true
- notes: Architecture patterns, refactoring, enterprise development

Row 2:
- id: 550e8400-e29b-41d4-a716-446655440002
- name: Pragmatic Engineer
- url: https://blog.pragmaticengineer.com/rss/
- content_pillar: Leadership & Management
- priority: High
- active: true
- notes: Engineering culture, compensation, org design

Row 3:
- id: 550e8400-e29b-41d4-a716-446655440003
- name: Lenny's Newsletter
- url: https://www.lennysnewsletter.com/feed
- content_pillar: Founder Lessons
- priority: Medium
- active: true
- notes: Product management, growth, startup advice
```

**Generate UUIDs:** Use https://www.uuidgenerator.net/ or terminal: `uuidgen`

4. Add 10-20 feeds total (see Appendix for more suggestions)

---

## Phase 2: API Credentials (15 minutes)

### Step 2.1: GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Name: `n8n Content Automation`
4. Expiration: 90 days (set calendar reminder to renew)
5. Scopes:
   - ✅ `repo` (full control of private repositories)
6. Click "Generate token"
7. Copy token immediately (you won't see it again)

**Save in n8n:**
1. n8n → Settings → Credentials → Add Credential
2. Type: GitHub
3. Authentication: Access Token
4. Access Token: [paste token]
5. Name: `GitHub xavierfuentes.com`
6. Save

### Step 2.2: OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Name: `n8n Content Automation`
4. Copy key

**Save in n8n:**
1. n8n → Settings → Credentials → Add Credential
2. Type: OpenAI
3. API Key: [paste key]
4. Name: `OpenAI Content Generation`
5. Save

**Alternative: Anthropic Claude**
1. Go to https://console.anthropic.com/settings/keys
2. Create API key
3. Save in n8n as Anthropic credential

### Step 2.3: Email Credentials (Optional)

For notification emails:

1. n8n → Settings → Credentials → Add Credential
2. Type: Gmail / SMTP
3. Configure your email settings
4. Name: `Email Notifications`
5. Save

---

## Phase 3: Build Workflows (60-90 minutes)

### Step 3.1: Create Workflow 1 - rss_to_pipeline.json

**Option A: Import JSON (if provided)**
1. Download `rss_to_pipeline.json`
2. n8n → Workflows → Import from File
3. Upload JSON file
4. Update credentials references
5. Activate workflow

**Option B: Build from Scratch**
1. n8n → Workflows → Create New Workflow
2. Name: `RSS to Pipeline`
3. Follow node specifications in `/automation/docs/workflow_specifications.md` (Workflow 1)
4. Add nodes in order:
   - Schedule Trigger (hourly)
   - Get Active RSS Sources (Data Tables Read)
   - Loop Through Sources
   - Fetch RSS Feed (HTTP Request)
   - Parse RSS/Atom (XML or Code)
   - Extract Items (Code)
   - Loop Through Articles
   - Check If Exists (Data Tables Read)
   - Is New Article? (IF)
   - Score Article (OpenAI/Anthropic)
   - Calculate Quality Score (Code)
   - Insert Into Pipeline (Data Tables Insert)
   - Send Summary Email (Email)
5. Test with "Execute Workflow" button
6. Activate when working

### Step 3.2: Create Workflow 2 - weekly_selection.json

1. n8n → Workflows → Create New Workflow
2. Name: `Weekly Content Selection`
3. Follow node specifications in `/automation/docs/workflow_specifications.md` (Workflow 2)
4. Add nodes in order:
   - Schedule Trigger (Sunday 9 AM)
   - Get Stale Items (Data Tables Read)
   - Update to Archived (Data Tables Update)
   - Get Research Items (Data Tables Read)
   - Calculate Weekly Scores (Code)
   - Select Top 4-5 (Code)
   - Loop and Update Status (Loop + Data Tables Update)
   - Send Summary Email (Email)
5. Test with "Execute Workflow" button
6. Activate when working

### Step 3.3: Create Workflow 3 - content_generation.json

1. n8n → Workflows → Create New Workflow
2. Name: `Content Generation`
3. Follow node specifications in `/automation/docs/workflow_specifications.md` (Workflow 3)
4. Add nodes in order:
   - Manual Trigger (or Schedule Trigger for daily check)
   - Get Selected Items (Data Tables Read)
   - Loop Through Items
   - Fetch Source Article (HTTP Request)
   - Extract Content (HTML Extract or Code)
   - AI Content Generation (OpenAI/Anthropic)
   - Quality Gates Validation (Code)
   - IF Quality Gates Pass
   - Generate Slug (Code)
   - Check GitHub Duplicate (GitHub Get File)
   - Prepare Markdown (Code)
   - Route to Directory (Code)
   - Commit to GitHub (GitHub Create/Update File)
   - Update Pipeline Record (Data Tables Update)
   - Send Notification Email (Email)
5. Test with "Execute Workflow" button
6. Activate when working

---

## Phase 4: Testing (30 minutes)

### Test 1: RSS Fetch and Scoring

1. Trigger `RSS to Pipeline` workflow manually
2. Check execution log - should fetch feeds and score articles
3. Open `content_pipeline` Data Table
4. Verify new rows with status = `research`
5. Check that scores are populated (1-10 range)

**Expected Result:** 5-20 new research items added (depending on RSS activity)

**Troubleshooting:**
- No items added → Check RSS feed URLs are valid
- Scoring failed → Verify OpenAI/Anthropic API key
- Duplicates → Ensure "Check If Exists" node queries by guid

### Test 2: Weekly Selection

1. Trigger `Weekly Content Selection` workflow manually
2. Check execution log
3. Open `content_pipeline` Data Table
4. Verify 4-5 items have status = `selected`
5. Check `selected_date` is populated

**Expected Result:** Top 4-5 research items marked as selected

**Troubleshooting:**
- No items selected → Add more research items first (run Test 1)
- Wrong items selected → Check scoring logic in Calculate Weekly Scores node

### Test 3: Content Generation

**Setup:**
1. Open `content_pipeline` Data Table
2. Find a `selected` item
3. Manually set `target_channel` to `linkedin`
4. Manually set `word_count_target` to `600`

**Test:**
1. Trigger `Content Generation` workflow manually
2. Check execution log - should fetch article, generate content, commit to GitHub
3. Open GitHub repository
4. Verify new file in `content/linkedin/[slug].md`
5. Check `content_pipeline` Data Table
6. Verify item status = `generated`
7. Verify `github_path` and `github_commit_url` are populated

**Expected Result:** AI-generated draft committed to GitHub

### Test 4: Multi-Channel Generation

**Setup:**
1. Open `content_pipeline` Data Table
2. Find a high-quality `selected` item (quality_score >= 8)
3. Manually set `target_channel` to `blog,linkedin`
4. Leave `word_count_target` as `null` (will use defaults)

**Test:**
1. Trigger `Content Generation` workflow manually
2. Check execution log - should generate TWO pieces of content
3. Open GitHub repository
4. Verify TWO new files:
   - `content/drafts/[slug].md` (blog, ~2000 words)
   - `content/linkedin/[slug]-linkedin.md` (linkedin, ~600 words)
5. Check `content_pipeline` Data Table
6. Verify item `github_path` contains both paths (comma-separated)

**Expected Result:** Two AI-generated drafts from one pipeline item

**Troubleshooting:**
- No items found → Ensure target_channel is set
- AI generation failed → Check API key and prompt
- GitHub commit failed → Verify GitHub token has repo access
- Quality gates blocked → Review quality gate logic

---

## Phase 5: Weekly Workflow (Ongoing)

### Sunday: Curation

1. **Automated:** `Weekly Content Selection` runs Sunday 9 AM
2. **Check Email:** Review summary email with 4-5 selected items
3. **Review in n8n:** Open `content_pipeline` Data Table, filter by status = `selected`
4. **Set Target Channel:** For each selected item, decide:
   - `blog` - Long-form (1,500-2,500 words) - 2/month target
   - `linkedin-original` - Standalone post (200-800 words) - 10-11/month target
   - `newsletter` - Digest item (400-600 words) - variable
5. **Set Word Count Target:**
   - Blog: 2000
   - LinkedIn: 600
   - Newsletter: 500

**Examples:**

**Single Channel:**
```
Week of 2025-10-07:
- Item 1: "Building Abstractions for LLMs" → blog
- Item 2: "Engineering Compensation Trends" → linkedin
- Item 3: "Product-Market Fit Signals" → linkedin
- Item 4: "API Design Principles" → newsletter
- Item 5: Skip (low priority)
```

**Multi-Channel (High Quality):**
```
Week of 2025-10-14:
- Item 1: "Platform Engineering Best Practices" → blog,linkedin (quality: 9.5)
- Item 2: "Remote Team Communication" → linkedin
- Item 3: "Technical Debt Framework" → blog
- Item 4: "Market Trends Summary" → newsletter
```

### Monday-Friday: Generation and Review

1. **Automated:** `Content Generation` runs daily 10 AM (or trigger manually)
2. **Check Email:** Review notification emails with draft links
3. **Review Drafts:** Open GitHub files
4. **Edit Content:**
   - Fix any UK English issues
   - Add personal anecdotes
   - Strengthen hooks
   - Adjust examples
5. **Publish:**
   - Update frontmatter: `status: published`
   - Run: `npm run publish`
   - Move to `content/posts/[YYYY-MM-DD]-[slug].md`
6. **Update Pipeline:**
   - Open `content_pipeline` Data Table
   - Update item status to `published`

---

## Phase 6: Monitoring (Ongoing)

### Daily Checks (5 minutes)

1. Check email for RSS summary and generation notifications
2. Review n8n execution logs for errors
3. Scan `content_pipeline` for stuck items

### Weekly Checks (15 minutes)

1. Review content pillar distribution:
   ```sql
   SELECT content_pillar, COUNT(*)
   FROM content_pipeline
   WHERE status = 'published'
   AND processed_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
   GROUP BY content_pillar
   ```
2. Compare to targets (Technology Strategy 30%, etc.)
3. Adjust RSS sources if pillars are imbalanced

### Monthly Checks (30 minutes)

1. Review performance:
   - How many items generated?
   - How many published?
   - Edit depth required?
   - Quality gate pass rate?
2. Audit RSS sources:
   - Disable low-quality feeds
   - Add new high-quality feeds
3. Archive old pipeline items (90+ days)
4. Review and adjust AI prompts if needed

---

## Troubleshooting

### Issue: Workflows Not Triggering

**Check:**
- Workflow is activated (toggle in top-right)
- Schedule trigger is configured correctly
- n8n Cloud account is active

**Fix:**
- Reactivate workflow
- Check n8n status page for incidents
- Test with manual trigger

### Issue: AI Responses Poor Quality

**Check:**
- System prompt clarity
- Source content extraction (enough context?)
- Model selection (GPT-4o vs GPT-4o-mini)

**Fix:**
- Add more examples to system prompt
- Improve content extraction (try different selectors)
- Increase max tokens
- Switch to Claude 3.5 Sonnet for better quality

### Issue: GitHub Commits Failing

**Check:**
- GitHub token valid and not expired
- Repository name and path correct
- Branch exists (usually `main`)

**Fix:**
- Regenerate GitHub token
- Verify repository access
- Check commit message format

### Issue: Duplicate Items in Pipeline

**Check:**
- GUID extraction from RSS
- "Check If Exists" node query

**Fix:**
- Ensure guid field is populated
- Add unique constraint to content_pipeline.guid
- Manually delete duplicates

---

## Performance Optimization

### Reduce AI API Costs

1. Use GPT-4o-mini for article scoring (cheaper, sufficient quality)
2. Use GPT-4o or Claude 3.5 for content generation (higher quality needed)
3. Cache AI responses where possible
4. Reduce max tokens if content is too long

### Speed Up Workflows

1. Use Data Tables filters to reduce data transfer
2. Limit RSS feed fetch to recent items only (last 30 days)
3. Run content generation in batches (not one-by-one)
4. Archive old pipeline items quarterly

### Scale Content Production

1. Add more RSS sources (target 20-30 active feeds)
2. Increase weekly selection to 6-8 items
3. Automate more of the review process (stricter quality gates)
4. Consider hiring editor for final polish

---

## Appendix A: Recommended RSS Sources

### Technology Strategy (30%)

- Martin Fowler's Blog: https://martinfowler.com/feed.atom
- Thoughtworks Technology Radar: https://www.thoughtworks.com/radar/rss
- Charity Majors: https://charity.wtf/feed/
- Kelsey Hightower: (find RSS)
- Adrian Cockcroft: (find RSS)

### Leadership & Management (25%)

- Pragmatic Engineer: https://blog.pragmaticengineer.com/rss/
- Camille Fournier: (find RSS)
- Will Larson (Irrational Exuberance): https://lethain.com/feeds/all.atom.xml
- Charity Majors: https://charity.wtf/feed/ (overlap with Tech Strategy)

### Execution & Delivery (20%)

- Increment Magazine: https://increment.com/feed/
- Software Lead Weekly: https://softwareleadweekly.com/rss/
- Dev.to Top Posts: https://dev.to/feed/

### Founder Lessons (15%)

- Lenny's Newsletter: https://www.lennysnewsletter.com/feed
- First Round Review: https://review.firstround.com/rss
- Y Combinator Blog: https://blog.ycombinator.com/feed

### Market & AI Trends (10%)

- Stratechery: https://stratechery.com/feed/
- Benedict Evans: https://www.ben-evans.com/feed
- Simon Willison: https://simonwillison.net/atom/everything/

**Total: 15-20 feeds to start**

---

## Appendix B: Content Pillar Targets

From `/Users/xavi/Projects/xavierfuentes.com/CLAUDE.md`:

| Content Pillar | Target % | Monthly Posts (16 total) |
|----------------|----------|--------------------------|
| Technology Strategy | 30% | 5 posts |
| Leadership & Management | 25% | 4 posts |
| Execution & Delivery | 20% | 3 posts |
| Founder Lessons | 15% | 2 posts |
| Market & AI Trends | 10% | 2 posts |

**Adjustment Strategy:**
- Review pillar distribution monthly
- Add/remove RSS sources to balance
- Boost under-represented pillars in weekly selection

---

## Appendix C: Quick Commands Reference

### View Pipeline Status
```sql
-- In n8n Data Tables UI
SELECT status, COUNT(*) as count
FROM content_pipeline
GROUP BY status
```

### Find Items Needing Routing
```sql
SELECT id, title, content_pillar, quality_score
FROM content_pipeline
WHERE status = 'selected'
AND target_channel IS NULL
ORDER BY selected_date ASC
```

### Archive Old Research Items
```sql
UPDATE content_pipeline
SET status = 'archived'
WHERE status = 'research'
AND created_date < DATE_SUB(NOW(), INTERVAL 90 DAY)
```

### Check Content Pillar Distribution
```sql
SELECT
  content_pillar,
  COUNT(*) as total,
  SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published
FROM content_pipeline
WHERE created_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY content_pillar
```

---

## Appendix D: Migration Checklist

If migrating from existing Notion setup:

- [ ] Export RSS sources list from Notion
- [ ] Manually add RSS sources to rss_sources Data Table
- [ ] Archive existing Notion Content Pipeline (read-only)
- [ ] Do NOT migrate historical pipeline data (start fresh)
- [ ] Update GitHub workflows to remove Notion references
- [ ] Deactivate old Notion-based n8n workflows
- [ ] Test new workflows end-to-end
- [ ] Run in parallel for 1 week before full cutover
- [ ] Delete Notion databases after confirming new system works

---

## Support and Resources

**Documentation:**
- `/automation/docs/workflow_architecture.md` - System overview
- `/automation/docs/data_table_schemas.md` - Database schemas
- `/automation/docs/workflow_specifications.md` - Node-by-node specs
- `/automation/docs/migration_plan_notion_to_n8n_datatables.md` - Full migration plan

**External Resources:**
- n8n Documentation: https://docs.n8n.io
- n8n Community Forum: https://community.n8n.io
- GitHub Actions Docs: https://docs.github.com/en/actions
- Ghost Admin API: https://ghost.org/docs/admin-api/

**Questions?**
- Review troubleshooting section above
- Check n8n execution logs
- Search n8n community forum
- Review workflow specifications document

---

*Setup complete! Your content automation system is ready to run.*

*Next steps: Let workflows run for 1 week, then review performance and adjust as needed.*
