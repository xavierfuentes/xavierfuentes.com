# Execution Strategy – XavierFuentes.com

## Content Production System

### Publishing Rhythm

**Long-Form Articles:** 2 per month (1st and 3rd weeks)

- Week 1: Framework or methodology piece (1,500-2,500 words)
- Week 3: Tactical how-to or case study (1,000-1,500 words)

**LinkedIn Content:** 3 posts per week (optimised for B2B engagement)

- Tuesday: Framework share or template (peak B2B engagement day)
- Wednesday: Industry hot take or observation (continued high engagement)
- Thursday: Personal lesson or behind-the-scenes (maintains mid-week momentum)

**Newsletter:** Weekly, incorporating blog content teasers and additional commentary

### Content Creation Workflow

**Week 1 (Planning):**

- Monday: Choose topic based on content calendar
- Tuesday: Research, outline, gather examples
- Wednesday: First draft
- Thursday: Edit and refine
- Friday: SEO optimisation, publish, create repurposed content

**Week 2 (Amplification):**

- Create LinkedIn carousel from frameworks
- Write LinkedIn posts expanding on key points
- Develop newsletter section
- Schedule social promotion
- Engage with comments and discussions

---

## Resource Requirements

### Time Investment

- **Long-form writing:** 4-6 hours per article (research, writing, editing)
- **LinkedIn content:** 30 minutes per post (Tue/Wed/Thu = 1.5 hours/week)
- **Newsletter writing:** 1 hour per week
- **Content repurposing:** 2 hours per long-form article
- **Total weekly:** 6-8 hours during publishing weeks, 3-4 hours during off weeks

### Tools and Systems

**Essential:**

- Content management system (Ghost CMS)
- n8n workflow automation (Pro Plan with Data Tables)
- GitHub (content version control)
- AI APIs (OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet)
- Analytics (Google Analytics, LinkedIn Analytics)
- SEO tools (SEMrush/Ahrefs for keyword research)

**Nice to Have:**

- Design tool for visuals (Canva Pro)
- Video editing (Loom for quick explainers)
- Email automation sequences
- Lead magnet delivery system

### Automation Architecture

**n8n Data Tables:**
- RSS sources configuration (active feeds, priorities, content pillars)
- Content pipeline queue (research → selected → generated → published)
- 100x faster than previous Notion setup (8ms vs 800ms queries)

**Automated Workflows:**
- `rss_to_pipeline.json` - Hourly RSS fetch and article scoring
- `weekly_selection.json` - Sunday curation and auto-selection
- `content_generation.json` - AI draft generation and GitHub commits

**Manual Steps:**
- Content route selection (blog/LinkedIn/newsletter)
- Draft review and editing
- Publishing to Ghost CMS
- LinkedIn scheduling

**Performance:**
- Query speed: 8ms (Data Tables)
- Content generation: 3-5 minutes per piece
- Editing time reduction: 60-70%
- Monthly cost: £38-68 (vs £100+ with Notion)

---

## Success Metrics and Monitoring

### Primary KPIs

**Traffic Growth:**

- Monthly unique visitors
- Organic search traffic percentage
- Direct traffic (brand recognition)
- Referral traffic from LinkedIn/newsletter

**Lead Generation:**

- Newsletter subscriber growth rate
- Lead magnet download rates
- Contact form submissions
- Consultation booking rate

**Engagement Quality:**

- Average time on page for long-form content
- LinkedIn post engagement rates
- Newsletter open and click rates
- Return visitor percentage

### Monthly Review Process

1. **Content Performance Analysis**

   - Top-performing articles by traffic and engagement
   - Social content with highest engagement
   - Newsletter performance metrics

2. **SEO Progress Review**

   - Keyword ranking improvements
   - Organic traffic growth
   - Content gap identification

3. **Lead Quality Assessment**
   - Source of highest-quality enquiries
   - Content pieces driving most conversions
   - Lead magnet effectiveness

### Quarterly Strategic Reviews

- Content pillar performance comparison
- Competitor content gap analysis
- Audience feedback integration
- Strategy pivots based on business development needs

---

## Risk Management and Contingencies

### Content Quality Risks

**Risk:** Becoming too promotional
**Mitigation:** Maintain 80/20 value-to-promotion ratio, regular tone audits

**Risk:** Running out of content ideas
**Mitigation:** Content idea bank, quarterly audience surveys, industry event attendance

**Risk:** Inconsistent publishing schedule
**Mitigation:** Content calendar, batch writing, guest content backup plan

### Business Impact Risks

**Risk:** Time investment without lead generation ROI
**Mitigation:** Monthly performance reviews, pivot triggers, minimum viable content approach

**Risk:** Competitive response or market saturation
**Mitigation:** Unique angle focus, personal experience differentiation, niche specialisation

---

## Scaling and Optimisation

### Phase 1 (Months 1-3): Foundation

- Establish publishing rhythm
- Build initial content library
- Set up analytics and tracking
- Create basic repurposing workflow

### Phase 2 (Months 4-6): Optimisation

- Refine content based on performance data
- Develop advanced lead magnets
- Build email nurture sequences
- Establish guest content opportunities

### Phase 3 (Months 7-12): Scale

- Consider content assistance/ghostwriting
- Develop advanced automation
- Pursue speaking opportunities
- Build strategic partnerships

### Efficiency Improvements

**Content Templates:**

- Blog post structure templates
- LinkedIn post formats
- Email newsletter templates
- Lead magnet frameworks

**Asset Libraries:**

- Screenshot and diagram bank
- Quote and testimonial database
- Case study anonymisation templates
- Framework visualisation templates

**Automation Opportunities:**

- Social media scheduling
- Email sequence triggers
- Lead magnet delivery
- Basic analytics reporting

---

## Budget Planning

### Essential Costs (Monthly)

- Website hosting and domain: £20-50
- n8n workflow automation (Pro Plan): £30-60
- AI API costs (OpenAI/Anthropic): £8-15
- SEO/analytics tools: £50-200
- Design tools: £10-30
- **Total:** £118-355/month

### Growth Investments

- Paid promotion budget: £200-500/month
- Professional editing: £200-500/month
- Design assistance: £100-300/month
- Speaking event travel: £500-2000/quarter

### ROI Expectations

Target: One qualified lead per month justifies entire content investment
Break-even: £2,000-5,000 monthly revenue from content-generated leads
Scale target: £10,000+ monthly recurring revenue within 12 months

---

## Implementation Timeline

### Month 1: Setup and Launch

**Week 1-2:**

- Complete website setup and optimisation
- Create content calendar for next 3 months
- Set up analytics and tracking
- Write first 2 articles

**Week 3-4:**

- Launch with first article and LinkedIn promotion
- Begin newsletter setup and lead magnet creation
- Start guest content outreach
- Establish social media rhythm

### Month 2-3: Rhythm and Refinement

- Maintain publishing schedule
- Analyse early performance data
- Refine content based on audience feedback
- Develop additional lead magnets
- Build email sequences

### Month 4-6: Optimisation and Growth

- Scale successful content types
- Reduce or eliminate poor performers
- Develop speaking opportunities
- Build strategic relationships
- Consider content assistance
