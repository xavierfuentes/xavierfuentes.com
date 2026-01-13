---
title: "Build vs Buy: A Decision Framework for Technical Leaders"
slug: build-vs-buy-decision-framework
status: published
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
unsplash_prompt: "fork in the road, crossroads, minimalist, decision, path choice, architectural, abstract geometry"

# Categorisation
tags:
  - Technology Strategy
  - Engineering Leadership
  - Decision Frameworks
---

"We could build this in a weekend."

Those six words have cost startups more money than any failed marketing campaign or botched product launch. I've watched this film too many times—and I've been on both sides of the camera. The pattern never changes: a team decides to build something that already exists as a mature product, convinced their requirements are uniquely special. Estimate: two weeks. Reality: six months minimum, then maintenance forever, while customer-facing features rot in the backlog.

I've seen teams build custom CMS platforms because "Ghost gives users too many options." I've seen data engineers attempt to recreate Snowflake because "it's too expensive." Both projects are still limping along years later, passed from team to team, draining resources and morale. Nobody wants to own them. Nobody wants to kill them either.

This is not inevitable. But avoiding it requires a framework—and the discipline to use it.

## Why Build vs Buy Matters More Now

The build-vs-buy question has always existed, but three forces have made it urgent:

**Engineering costs have skyrocketed.** A senior engineer in London costs £120,000-180,000 per year fully loaded. Every month your team spends on internal tooling is £10,000-15,000 not spent on product differentiation.

**The SaaS ecosystem has matured.** Ten years ago, building your own monitoring stack made sense—the alternatives were expensive and limited. Today, there's a specialised tool for nearly everything, priced from startup to enterprise.

**Competitive windows have compressed.** Speed to customer value beats technical elegance. The company that ships a working product with bought infrastructure wins against the one still perfecting their in-house solution.

Yet most engineering teams still default to building. The instinct runs deep: we're engineers, building is what we do. But left unchecked, that instinct leads to teams spending 60-70% of their capacity on commodity infrastructure instead of features that differentiate the business.

## The Decision Framework

The core question is not "can we build this?" but "should we?"

My philosophy is simple: **build only when it's core to your competitive advantage.** If building helps you win customers in ways competitors can't replicate, build. If buying gets you to market faster while you validate your business model, buy.

Five questions, in order:

1. **Is this core to what customers pay you for?** No → Buy.
2. **Will building create sustainable competitive advantage?** No → Buy.
3. **What stage is your business?** Pre-PMF should bias heavily toward buying—speed to validation beats ownership. Growth and scale can build selectively.
4. **Do you have the expertise to build AND maintain this?** No → Buy.
5. **Would buying get you to market faster?** Yes, and still validating → Buy now, revisit in 12 months.

The default is "buy" unless you can clearly articulate the competitive advantage from building.

## Three Scenarios in Practice

### When Building Was Right: Kitchen Display Systems at Nando's

At Nando's, I kept pushing to develop our own Kitchen Display System. The "way of cooking" is one of Nando's secret sauces—the choreography of flame-grilled chicken, the timing, the quality checks. This wasn't peripheral infrastructure. It was core to the customer experience.

We'd tried the alternatives. Aloha KDS. QSR Automations across dozens of restaurants. Nothing came close. Off-the-shelf options couldn't capture how Nando's nandocas actually work in the kitchen.

Building meant complete control: display exactly what we wanted, measure what mattered, iterate without waiting for a vendor to prioritise our requests. The project took about two years to reach production (it shipped in Australian restaurants after I'd moved on), but the outcome justified it: reduced licensing costs, complete operational flexibility, and a genuine differentiator that competitors cannot simply purchase.

It met all the criteria: core to the value proposition, genuinely unique requirements, and we had the expertise to maintain it.

### When Buying Was Right: Engineering Metrics

When I needed DORA metrics to understand engineering team maturity, I faced the classic build-or-buy moment. We could build dashboards—integrate with CI/CD, pull from various sources, create custom BI visualisations. Engineering estimated six months for something comprehensive.

We bought LinearB instead. Implemented in weeks. The time saved went straight into the core product—the thing customers actually paid for.

Easy call. Measuring engineering performance isn't a competitive differentiator. LinearB, Jellyfish, Sleuth—these companies employ dedicated teams who do nothing but solve this problem. Why burn six months recreating what they've already built?

### When Building Was Wrong: The Snowflake Imitation

I watched a team attempt to build a "global data platform" because Snowflake was deemed too expensive. The logic looked sound on a spreadsheet: high licensing costs, growing data volumes, capable engineers. Why not build our own?

Years later, the project is still limping along. Minimal resources, less enthusiasm. Each time a new team inherits it, they discover more gaps, more debt, more reasons why the "simple" solution isn't. The cumulative investment has long exceeded what Snowflake would have cost—and still doesn't match Snowflake's capabilities.

Nobody ever said "we need to stop." The sunk cost fallacy is powerful. Once you've invested six months, killing it feels like admitting failure. So you invest another six. Then another.

The lesson: if you're building something that competes with a well-funded specialist vendor—and it's not your core business—you're probably making a mistake.

## Running a Build-vs-Buy Assessment

### Step 1: Calculate True Total Cost of Ownership

**For the build option:**

- Initial development time (multiply your estimate by 3—seriously)
- Ongoing maintenance (typically 20-30% of initial build, every year)
- Security and compliance burden
- Documentation and onboarding for new team members
- Opportunity cost of features not shipped

**For the buy option:**

- Subscription costs at realistic scale (not just today's pricing)
- Integration development and maintenance
- Training and change management
- Vendor management overhead
- Migration cost if you need to switch later

### Step 2: Assess Vendor Risk

- How long has the vendor existed?
- What's their funding status and business model sustainability?
- How many customers at your scale?
- What's their track record on breaking changes?
- Can you export your data if needed?

### Step 3: Involve Stakeholders Without Analysis Paralysis

Keep the decision group small—people with genuine skin in the game:

- Engineering lead (owns implementation)
- Product owner (owns opportunity cost)
- Finance (owns budget)

Present the framework, share your analysis, make a recommendation. The meeting is for pressure-testing, not consensus-building. If after 60 minutes you haven't decided, default to "buy" unless someone can articulate specific differentiation from building.

### Step 4: Set a Decision Deadline

Build-vs-buy evaluations expand to fill available time. Two-week maximum for any decision. If you can't reach confidence in two weeks, you don't have enough information—and analysis paralysis becomes the bigger risk.

## Common Pitfalls

**Not Invented Here Syndrome**: The belief that anything built externally is inherently inferior. Symptom: dismissing vendors without proper evaluation. Cure: require written justification for why building is better, not just different.

**Underestimating Integration Costs**: "Buy" is never plug-and-play. Budget 2-4 weeks for any meaningful integration, plus ongoing maintenance as both systems evolve.

**Overestimating Customisation Needs**: Teams claim unique requirements that are actually standard problems. Challenge every "but we need X" with "do we really, and why?"

**Ignoring Team Dynamics**: Some build decisions are really about giving engineers interesting problems. That's valid—bored engineers leave. But be honest about the motivation.

**Failing to Revisit**: Markets change. What required building three years ago might now be a commodity SaaS. Schedule annual reviews of major technology choices.

## Categories Where "Buy" Almost Always Wins

Unless you're building a competing product, default to buying:

- **Authentication and identity**: Auth0, Clerk, WorkOS
- **Payments**: Stripe, Adyen
- **Email sending**: Postmark, SendGrid, Resend
- **Monitoring and observability**: Datadog, Grafana Cloud
- **Error tracking**: Sentry, Bugsnag
- **Feature flags**: LaunchDarkly, Statsig
- **Background jobs**: Temporal, Inngest

The combined R&D investment of these vendors dwarfs what any individual team could allocate. Use their expertise. Focus your engineers on what makes your business unique.

## Your Next Steps

Before your next technology decision:

1. Is this core to what customers pay you for?
2. Will building create advantage you can't buy?
3. What stage is your business—can you afford to build?
4. Do you have expertise to build AND maintain?
5. Would buying get you to market faster?

The goal isn't to never build—some capabilities genuinely require custom solutions. The goal is to build deliberately, investing engineering time where it creates the most value, and buying ruthlessly everywhere else.

**Want a structured template for running these assessments?** I've put together a Build vs Buy Decision Framework that walks through each question. [Download the framework here](/assets/build-vs-buy-decision-framework.html).
