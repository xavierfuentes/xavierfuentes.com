---
  title: To vibe or not to vibe
slug: to-vibe-or-not-to-vibe
status: draft
visibility: public
featured: false
meta_title: To vibe or not to vibe
meta_description: <div class = 'img-link'><a href = ' src = ' width = ''></img></a></div> <p><b class = 'author'>Birgitta B ckeler</b> examines the risk assessment around when to use vibe coding, using three dimensions of risk: Probability, Impact, and Detectability</p> <p><a class = 'more' href =
target_channel: undefined
  tags:
    - Technology Strategy
  - vibe coding
  - risk assessment
  - probability
  authors:
    - xavier
  ---

  **To vibe or not to vibe: A practical guide to risk assessment for CTOs**

Ever faced the dilemma of whether to embrace vibe coding in your organisation? It’s an alluring concept—quick, creative bursts of programming that often feel like pure magic. But as CTOs, we need more than magic; we need a clear-eyed assessment of risks and rewards.

Inspired by Martin Fowler’s exploration of vibe coding, let’s dig into a practical framework to help you decide when to vibe and when to hold back. This isn’t about abstract theory—it’s about real decisions, technical trade-offs, and the organisational impact of adopting this approach.

### Context: What is vibe coding and why does it matter?

Vibe coding refers to those moments when developers dive into rapid, intuitive coding without heavy upfront planning. It’s often driven by creativity or urgency, producing fast results but with a higher chance of hidden problems.

For CTOs, the question is: When is vibe coding a strategic asset, and when is it a liability? Misjudging this can lead to technical debt, unpredictable bugs, or team burnout. Getting this right is crucial as startups and tech teams balance speed with quality.

### Technical analysis: The three dimensions of risk

Birgitta Böckeler’s risk assessment framework—Probability, Impact, and Detectability—offers a powerful lens to evaluate vibe coding.

- **Probability:** How likely is it that vibe coding introduces defects or architectural weaknesses? For example, a hurried feature hack might have a 40-50% chance of causing regressions, while a well-scoped prototype might be closer to 10-15%.

- **Impact:** What’s the severity if issues do arise? A flaw in a payment gateway’s vibe-coded module could cost millions and damage trust, whereas a bug in an internal dashboard might be low impact.

- **Detectability:** How easy is it to spot problems early? Robust automated tests and continuous integration improve detectability, lowering risk. Conversely, if your team rarely runs tests on vibe code, defects might remain hidden until they cause outages.

By scoring these factors—assigning rough values or categories—you create a risk profile that guides your decision.

### Case studies: Vibe coding in action

Consider a fintech startup under pressure to release a new feature. The dev team vibes a prototype in two days. Probability of defects? High—about 50%. Impact? Also high, as it involves sensitive user transactions. Detectability? Low, since the feature wasn’t covered by tests initially.

Outcome: After launch, bugs surfaced, causing outages and urgent patches. Long-term cost: 3x the time saved originally.

Contrast this with a SaaS company experimenting with a new UI interaction. The vibe-coded feature had a 20% defect probability, low impact on critical flows, and high detectability through extensive user testing. The team quickly iterated, discarded what didn’t work, and integrated the successful elements.

The takeaway: vibe coding can succeed when risks are low or well-managed.

### Strategic implications: How CTOs should lead

As a CTO, your role is to set guardrails, not kill creativity. Here’s a practical approach:

1. **Assess risk upfront:** Use probability, impact, and detectability to score each vibe coding opportunity.

2. **Define "safe zones":** Reserve vibe coding for low-impact, high-detectability areas—such as prototypes, experiments, or internal tools.

3. **Build safety nets:** Invest in test automation and monitoring to catch issues early when vibe coding is unavoidable in critical areas.

4. **Communicate trade-offs:** Make risk visible to stakeholders. Explain when vibe coding is a calculated gamble and when it’s reckless.

5. **Review retrospectively:** Analyse vibe coding outcomes regularly to refine your risk thresholds and improve team practices.

### Future outlook: Making vibe coding a strategic asset

The future of vibe coding isn’t about banning or blindly embracing it. It’s about mastering risk assessment and embedding these insights into your development culture.

Emerging tools powered by AI and observability platforms can enhance detectability, reducing the risk of vibe coding. But ultimately, leadership matters. CTOs who encourage disciplined creativity without sacrificing quality will turn vibe coding into a genuine competitive advantage.

### Next steps: What you can do tomorrow

- Run a quick risk assessment on your current projects: Map their probability, impact, and detectability scores for any vibe coding involved.

- Identify one area where vibe coding is high risk and define actions to mitigate it—be it adding tests, delaying release, or redesigning the approach.

- Share your framework with your engineering managers to align on when to vibe and when to pause.

Vibe coding is neither a villain nor a silver bullet—it’s a tool. The question is: are you using it strategically, or leaving it to chance?

How do you currently assess the risks of vibe coding in your teams? Let’s discuss practical tactics below.

  ---

  *AI-generated draft - Quality Score: 75/100*