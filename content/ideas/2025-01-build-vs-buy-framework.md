---
id: 2025-01-build-vs-buy-framework
pillar: technology-strategy
status: ready_for_projection
primary_channel: personal_blog
secondary_channels:
  - linkedin
  - junglebrief
target_audience: cto_startup_scaleup, founder_technical
target_outcome: inbound_leads
seo_keyword: build vs buy decision framework
lead_magnet: Technology Decision Framework Template
notes: >
  Contrarian take: default to buying anything outside your core business. Most teams
  waste engineering time building commodity infrastructure instead of focusing on
  differentiation. The framework helps leaders distinguish between what makes them
  unique (build) versus what is table stakes (buy).
---

# Build vs Buy Decision Framework

## Problem

Technical leaders consistently overestimate the strategic value of building in-house solutions whilst underestimating the true cost of maintenance, security, and opportunity cost. This leads to engineering teams spending 60-70% of their capacity on commodity infrastructure instead of features that differentiate the business.

## Angle

- Default position should be "buy" unless you can prove building creates genuine competitive advantage
- The sunk cost fallacy keeps teams maintaining in-house solutions long after they should have migrated to commercial alternatives
- "We could build this in a weekend" is the most expensive phrase in engineering—it ignores the 10x ongoing maintenance cost
- True differentiation is rarer than teams admit; most "unique requirements" are actually standard problems with slightly different constraints

## Rough Outline

1. **Hook**: Share the story of a team that spent 18 months building an internal tool that a £50/month SaaS could have replaced—and the opportunity cost in delayed product features.

2. **Context**: Why the build-vs-buy question has become more urgent now: accelerating SaaS ecosystem, rising engineering salaries, shorter competitive windows, and the need for startups to focus ruthlessly on differentiation.

3. **Framework**: Present a decision matrix with two axes:
   - Strategic importance (core vs peripheral)
   - Competitive differentiation (unique vs commodity)
   Four quadrants: Build & Own, Build & Consider Migration, Buy & Integrate, Buy & Standardise.
   Include specific questions to ask at each decision point.

4. **Case Study**: Walk through 2-3 real examples (anonymised): one where building was correct, one where buying was correct, and one where the team made the wrong choice and had to course-correct.

5. **Implementation**: Step-by-step process for running a build-vs-buy assessment:
   - How to calculate true total cost of ownership
   - How to assess vendor risk and lock-in
   - How to involve stakeholders without analysis paralysis
   - Timeline for decision-making (avoid endless evaluation)

6. **Pitfalls**: Common mistakes to avoid:
   - NIH (Not Invented Here) syndrome
   - Underestimating integration costs for "buy" options
   - Overestimating customisation needs
   - Ignoring team morale and growth opportunities
   - Failing to revisit decisions as the market evolves

7. **Next Steps**: Provide a checklist or scorecard readers can use for their next build-vs-buy decision. CTA to download the Technology Decision Framework Template.

## Editorial Notes

### Voice & Angle Decisions
- Strong contrarian hook works well: "We could build this in a weekend"
- Framework approach (2x2 matrix) suits the topic
- "Multiply your estimate by 3—seriously" is good Xavier voice — keep this energy

### Case Study Opportunities
- [NEEDED] A team that built auth/payments when they should have bought (and the cost)
- [NEEDED] A successful migration from built to bought (the sunk cost trap overcome)
- [NEEDED] A team that correctly chose to build something core

### Feedback Log
- 30/12/2024: Graded A-. Scenarios (lines 88-111 in draft) are hypothetical "Consider a scenario..." — need real examples or keep brief
- 30/12/2024: Could punch harder in intro — add one "I" statement to ground in experience
- 30/12/2024: "This is not an unusual story" is flat — try "I've watched this exact disaster unfold at four companies"
- 30/12/2024: Ready as first publish candidate with minor polish

---

## Canonical Notes

- Reference: Wardley Mapping concepts of commodity vs genesis
- Include real numbers: average engineer cost, typical SaaS pricing, maintenance overhead percentages
- Consider mentioning specific categories where "buy" is almost always right: auth, payments, email, monitoring, logging
- Potential LinkedIn series: "Things you should never build in-house" with specific examples
- Newsletter angle: quarterly review of emerging SaaS tools that eliminate build-vs-buy decisions

---

## Canonical Draft

### Hook

"We could build this in a weekend."

Those six words have cost startups more money than any failed marketing campaign or botched product launch. Consider a scenario where a growing fintech decides to build their own authentication system. The initial estimate: two weeks. The reality: 18 months of engineering time, three security incidents, and a backlog of customer-facing features that never shipped. Meanwhile, a £50/month SaaS solution sat waiting, battle-tested and compliant.

This is not an unusual story. It plays out every week in engineering teams across the country.

### Context: Why This Matters Now

The build-vs-buy question has always existed, but three forces have made it more urgent than ever:

**Engineering costs have skyrocketed.** A senior engineer in London now costs £120,000-180,000 per year fully loaded. Every month your team spends on internal tooling is £10,000-15,000 not spent on product differentiation.

**The SaaS ecosystem has matured.** Ten years ago, building your own monitoring stack made sense—the alternatives were expensive and limited. Today, there's a specialised tool for nearly everything, with pricing that scales from startup to enterprise.

**Competitive windows have compressed.** In most markets, speed to customer value beats technical elegance. The company that ships a working product with bought infrastructure beats the one still perfecting their in-house solution.

Yet despite these pressures, most engineering teams I've observed still default to building. The instinct runs deep: we're engineers, building things is what we do. But that instinct, left unchecked, leads to teams spending 60-70% of their capacity on commodity infrastructure rather than the features that actually differentiate the business.

### The Decision Framework

The core question is not "can we build this?" but "should we?"

Use this two-axis framework to categorise any technology decision:

**Axis 1: Strategic Importance**
- **Core**: Directly serves your customers and relates to your primary value proposition
- **Peripheral**: Supports the business but isn't what customers pay you for

**Axis 2: Competitive Differentiation**
- **Unique**: Your implementation would be materially different from what's available
- **Commodity**: Standard problem, well-understood solutions exist

This creates four quadrants:

| | **Unique** | **Commodity** |
|---|---|---|
| **Core** | **Build and Own** — Invest heavily, this is your moat | **Build Carefully** — Consider building, but reassess regularly |
| **Peripheral** | **Buy and Customise** — Find best-fit vendor, invest in integration | **Buy and Standardise** — Pick market leader, minimise customisation |

**Questions to ask at each decision point:**

For "Build and Own":
- Does this capability appear in your investor pitch or customer value proposition?
- Would losing control of this to a vendor create genuine business risk?
- Do you have (or can you hire) deep expertise in this domain?

For "Build Carefully":
- Is the market moving quickly enough that buy options will improve significantly in 12-18 months?
- What's the opportunity cost of building versus shipping customer features?
- Are you building because it's strategic or because "we've always done it this way"?

For "Buy and Customise":
- Have you validated that the customisation you need is actually possible with available vendors?
- What's your exit strategy if the vendor is acquired or pivots?
- Who owns the integration and keeps it healthy long-term?

For "Buy and Standardise":
- Can you truly standardise, or will you inevitably customise?
- What's the switching cost if you need to change vendors later?
- Is this vendor likely to exist in five years?

### Applying the Framework: Three Scenarios

**Scenario 1: Authentication (Almost Always Buy)**

Imagine a CTO at an early-stage B2B SaaS considering authentication. The instinct: "Our security requirements are unique, we need custom controls."

Reality check: Auth0, Clerk, or WorkOS solve this problem for thousands of companies. They employ dedicated security teams. They handle compliance certifications. They manage the constant evolution of authentication standards.

Unless you're building a security product where authentication *is* your differentiator, this lands firmly in "Buy and Standardise." The £500/month spent on a mature auth provider frees up months of engineering time for features that actually win customers.

**Scenario 2: Data Pipeline (Context Dependent)**

Consider a data analytics company whose core product is transforming messy customer data into clean insights. Should they build or buy their data pipeline infrastructure?

This requires nuance. The pipeline itself might be core to their value proposition—if their data transformation logic is genuinely novel, building makes sense. But the underlying infrastructure (orchestration, monitoring, storage) is commodity. The smart answer: build the transformation layer, buy everything else.

**Scenario 3: The Sunk Cost Trap**

Picture a scale-up that built their own deployment platform three years ago when viable alternatives were scarce. Today, it requires a full-time engineer to maintain, creates friction for new hires, and lacks features that modern platforms offer out of the box.

The team resists migration: "We've invested so much already." This is the sunk cost fallacy at work. The question isn't "what have we invested?" but "what's the best use of the next engineer-year?" Often, a painful three-month migration pays for itself within the year.

### Implementation: Running a Build-vs-Buy Assessment

**Step 1: Calculate True Total Cost of Ownership (2-3 hours)**

For the build option, include:
- Initial development time (multiply your estimate by 3—seriously)
- Ongoing maintenance (typically 20-30% of initial build, every year)
- Security and compliance burden
- Documentation and onboarding for new team members
- Opportunity cost of features not shipped

For the buy option, include:
- Subscription costs at realistic scale (not just today's pricing)
- Integration development and maintenance
- Training and change management
- Vendor management overhead
- Migration cost if you need to switch

**Step 2: Assess Vendor Risk (1-2 hours)**

- How long has the vendor existed?
- What's their funding status and business model sustainability?
- How many customers at your scale?
- What's their track record on breaking changes?
- Can you export your data if needed?

**Step 3: Involve Stakeholders Without Analysis Paralysis (1 meeting)**

Limit the decision group to people with genuine skin in the game:
- Engineering lead (owns the implementation)
- Product owner (owns the opportunity cost)
- Finance (owns the budget)

Present the framework, share your analysis, make a recommendation. The meeting is for pressure-testing, not consensus-building. If after 60 minutes you haven't decided, the default is "buy" unless someone can articulate specific differentiation value from building.

**Step 4: Set a Decision Deadline**

Build-vs-buy evaluations expand to fill available time. Set a two-week maximum for any decision. If you can't reach confidence in two weeks, you don't have enough information—and the risk of analysis paralysis exceeds the risk of a wrong decision.

### Common Pitfalls

**Not Invented Here Syndrome**: The belief that anything built externally is inherently inferior. Symptom: dismissing vendors without proper evaluation. Cure: require written justification for why building is better, not just different.

**Underestimating Integration Costs**: "Buy" is never just plug-and-play. Budget 2-4 weeks of engineering time for any meaningful integration, plus ongoing maintenance as both systems evolve.

**Overestimating Customisation Needs**: Teams often claim unique requirements that are actually standard problems. Challenge every "but we need X" with "do we really, and why?"

**Ignoring Team Dynamics**: Some build decisions are really about giving engineers interesting problems to solve. That's valid—bored engineers leave. But be honest about the motivation, and weigh it against business needs.

**Failing to Revisit**: Markets change. What required building three years ago might now be a commodity SaaS. Schedule annual reviews of major technology choices.

### The Categories Where "Buy" Almost Always Wins

Unless you're building a competing product in these spaces, default to buying:

- **Authentication and identity**: Auth0, Clerk, WorkOS
- **Payments**: Stripe, Adyen
- **Email sending**: Postmark, SendGrid, Resend
- **Monitoring and observability**: Datadog, Grafana Cloud
- **Error tracking**: Sentry, Bugsnag
- **Feature flags**: LaunchDarkly, Statsig
- **Background jobs**: Temporal, Inngest

The combined R&D investment of these vendors dwarfs what any individual team could allocate. Use their expertise. Focus your engineers on what makes your business unique.

### Next Steps

Before your next technology decision, run through this quick scorecard:

1. Plot the capability on the strategic importance vs differentiation matrix
2. Calculate honest total cost of ownership for both options
3. Assess vendor risk for buy options
4. Set a two-week decision deadline
5. Default to "buy" unless building creates clear competitive advantage

[PLACEHOLDER: CTA to download the Technology Decision Framework Template]

The goal is not to never build—some capabilities genuinely require custom solutions. The goal is to build deliberately, investing engineering time where it creates the most business value, and buying ruthlessly everywhere else.
