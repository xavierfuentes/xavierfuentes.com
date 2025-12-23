---
title: "Build vs Buy: A Decision Framework for Technical Leaders"
slug: build-vs-buy-decision-framework
status: draft
visibility: public

# Content OS Linkage
idea_id: "2025-01-build-vs-buy-framework"
pillar: technology-strategy
target_audience: cto_startup_scaleup, founder_technical
target_outcome: inbound_leads

# SEO Fields
meta_description: "A practical build vs buy decision framework for CTOs and technical leaders. Stop wasting engineering time on commodity infrastructure."

# Display Options
featured: false
excerpt: "Most teams waste 60-70% of engineering capacity on commodity infrastructure. Use this framework to build deliberately and buy ruthlessly."

# Categorisation
tags:
  - Technology Strategy
  - Engineering Leadership
  - Decision Frameworks
---

"We could build this in a weekend."

Those six words have cost startups more money than any failed marketing campaign or botched product launch. I have seen the pattern repeat countless times: a growing fintech decides to build their own authentication system. Initial estimate: two weeks. Reality: 18 months of engineering time, three security incidents, and a backlog of customer-facing features that never shipped. Meanwhile, a £50/month SaaS solution sat waiting, battle-tested and compliant.

This is not an unusual story. It plays out every week in engineering teams across the country.

## Why Build vs Buy Matters More Than Ever

The build-vs-buy question has always existed, but three forces have made it more urgent:

**Engineering costs have skyrocketed.** A senior engineer in London now costs £120,000-180,000 per year fully loaded. Every month your team spends on internal tooling is £10,000-15,000 not spent on product differentiation.

**The SaaS ecosystem has matured.** Ten years ago, building your own monitoring stack made sense—the alternatives were expensive and limited. Today, there is a specialised tool for nearly everything, with pricing that scales from startup to enterprise.

**Competitive windows have compressed.** In most markets, speed to customer value beats technical elegance. The company that ships a working product with bought infrastructure beats the one still perfecting their in-house solution.

Yet despite these pressures, most engineering teams still default to building. The instinct runs deep: we are engineers, building things is what we do. But that instinct, left unchecked, leads to teams spending 60-70% of their capacity on commodity infrastructure rather than features that actually differentiate the business.

## The Decision Framework

The core question is not "can we build this?" but "should we?"

Use this two-axis framework to categorise any technology decision:

**Axis 1: Strategic Importance**
- **Core**: Directly serves your customers and relates to your primary value proposition
- **Peripheral**: Supports the business but is not what customers pay you for

**Axis 2: Competitive Differentiation**
- **Unique**: Your implementation would be materially different from what is available
- **Commodity**: Standard problem, well-understood solutions exist

This creates four quadrants:

| | **Unique** | **Commodity** |
|---|---|---|
| **Core** | **Build and Own** — Invest heavily, this is your moat | **Build Carefully** — Consider building, but reassess regularly |
| **Peripheral** | **Buy and Customise** — Find best-fit vendor, invest in integration | **Buy and Standardise** — Pick market leader, minimise customisation |

### Questions for Each Quadrant

**For "Build and Own":**
- Does this capability appear in your investor pitch or customer value proposition?
- Would losing control of this to a vendor create genuine business risk?
- Do you have (or can you hire) deep expertise in this domain?

**For "Build Carefully":**
- Is the market moving quickly enough that buy options will improve significantly in 12-18 months?
- What is the opportunity cost of building versus shipping customer features?
- Are you building because it is strategic or because "we have always done it this way"?

**For "Buy and Customise":**
- Have you validated that the customisation you need is actually possible with available vendors?
- What is your exit strategy if the vendor is acquired or pivots?
- Who owns the integration and keeps it healthy long-term?

**For "Buy and Standardise":**
- Can you truly standardise, or will you inevitably customise?
- What is the switching cost if you need to change vendors later?
- Is this vendor likely to exist in five years?

## Three Scenarios in Practice

### Scenario 1: Authentication (Almost Always Buy)

Consider a CTO at an early-stage B2B SaaS evaluating authentication options. The instinct: "Our security requirements are unique, we need custom controls."

Reality check: Auth0, Clerk, or WorkOS solve this problem for thousands of companies. They employ dedicated security teams. They handle compliance certifications. They manage the constant evolution of authentication standards.

Unless you are building a security product where authentication *is* your differentiator, this lands firmly in "Buy and Standardise." The £500/month spent on a mature auth provider frees up months of engineering time for features that actually win customers.

### Scenario 2: Data Pipeline (Context Dependent)

Consider a data analytics company whose core product is transforming messy customer data into clean insights. Should they build or buy their data pipeline infrastructure?

This requires nuance. The pipeline itself might be core to their value proposition—if their data transformation logic is genuinely novel, building makes sense. But the underlying infrastructure (orchestration, monitoring, storage) is commodity.

The smart answer: build the transformation layer, buy everything else.

### Scenario 3: The Sunk Cost Trap

Picture a scale-up that built their own deployment platform three years ago when viable alternatives were scarce. Today, it requires a full-time engineer to maintain, creates friction for new hires, and lacks features that modern platforms offer out of the box.

The team resists migration: "We have invested so much already." This is the sunk cost fallacy at work. The question is not "what have we invested?" but "what is the best use of the next engineer-year?" Often, a painful three-month migration pays for itself within the year.

## Running a Build-vs-Buy Assessment

### Step 1: Calculate True Total Cost of Ownership

**For the build option, include:**
- Initial development time (multiply your estimate by 3—seriously)
- Ongoing maintenance (typically 20-30% of initial build, every year)
- Security and compliance burden
- Documentation and onboarding for new team members
- Opportunity cost of features not shipped

**For the buy option, include:**
- Subscription costs at realistic scale (not just today's pricing)
- Integration development and maintenance
- Training and change management
- Vendor management overhead
- Migration cost if you need to switch

### Step 2: Assess Vendor Risk

- How long has the vendor existed?
- What is their funding status and business model sustainability?
- How many customers at your scale?
- What is their track record on breaking changes?
- Can you export your data if needed?

### Step 3: Involve Stakeholders Without Analysis Paralysis

Limit the decision group to people with genuine skin in the game:
- Engineering lead (owns the implementation)
- Product owner (owns the opportunity cost)
- Finance (owns the budget)

Present the framework, share your analysis, make a recommendation. The meeting is for pressure-testing, not consensus-building. If after 60 minutes you have not decided, the default is "buy" unless someone can articulate specific differentiation value from building.

### Step 4: Set a Decision Deadline

Build-vs-buy evaluations expand to fill available time. Set a two-week maximum for any decision. If you cannot reach confidence in two weeks, you do not have enough information—and the risk of analysis paralysis exceeds the risk of a wrong decision.

## Common Pitfalls to Avoid

**Not Invented Here Syndrome**: The belief that anything built externally is inherently inferior. Symptom: dismissing vendors without proper evaluation. Cure: require written justification for why building is better, not just different.

**Underestimating Integration Costs**: "Buy" is never just plug-and-play. Budget 2-4 weeks of engineering time for any meaningful integration, plus ongoing maintenance as both systems evolve.

**Overestimating Customisation Needs**: Teams often claim unique requirements that are actually standard problems. Challenge every "but we need X" with "do we really, and why?"

**Ignoring Team Dynamics**: Some build decisions are really about giving engineers interesting problems to solve. That is valid—bored engineers leave. But be honest about the motivation, and weigh it against business needs.

**Failing to Revisit**: Markets change. What required building three years ago might now be a commodity SaaS. Schedule annual reviews of major technology choices.

## Categories Where "Buy" Almost Always Wins

Unless you are building a competing product in these spaces, default to buying:

- **Authentication and identity**: Auth0, Clerk, WorkOS
- **Payments**: Stripe, Adyen
- **Email sending**: Postmark, SendGrid, Resend
- **Monitoring and observability**: Datadog, Grafana Cloud
- **Error tracking**: Sentry, Bugsnag
- **Feature flags**: LaunchDarkly, Statsig
- **Background jobs**: Temporal, Inngest

The combined R&D investment of these vendors dwarfs what any individual team could allocate. Use their expertise. Focus your engineers on what makes your business unique.

## Your Next Steps

Before your next technology decision, run through this quick scorecard:

1. Plot the capability on the strategic importance vs differentiation matrix
2. Calculate honest total cost of ownership for both options
3. Assess vendor risk for buy options
4. Set a two-week decision deadline
5. Default to "buy" unless building creates clear competitive advantage

The goal is not to never build—some capabilities genuinely require custom solutions. The goal is to build deliberately, investing engineering time where it creates the most business value, and buying ruthlessly everywhere else.

If you want a structured template for running these assessments with your team, I have put together a Technology Decision Framework that walks through each step. [Download the framework here](#lead-magnet).
