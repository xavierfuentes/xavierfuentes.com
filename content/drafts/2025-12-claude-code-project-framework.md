---
# Required for Ghost
title: "The Claude Code Project Framework: A Practitioner's Guide"
slug: claude-code-project-framework
status: draft
visibility: public

# Content OS Linkage
idea_id: "2025-12-claude-code-project-framework"
pillar: technology-strategy
target_audience: tech_lead_ai_adopter
target_outcome: authority

# SEO
meta_title: "Claude Code Project Setup: The Framework That Actually Works"
meta_description: "Most developers struggle with Claude Code because they skip the setup. Here's the 6-component framework I use to get consistent results from every project."

# Display
featured: false
excerpt: "The difference between Claude Code projects that work and ones that frustrate comes down to how you start, not how you prompt."
tags:
  - Technology Strategy
  - AI Development
  - Developer Productivity
---

I have set up fifteen Claude Code projects in the past six months. The difference between the ones that worked and the ones that frustrated me came down to one thing: how I started, not how I prompted.

Most developers approach Claude Code the same way they approach ChatGPT - open a terminal, start typing prompts, hope for the best. Then they hit the same walls: context loss between sessions, scope creep within sessions, inconsistent outputs that require constant correction.

The problem is not Claude Code. The problem is that there is no canonical guide for how to set up and manage projects systematically. This is the missing manual.

## Why Most People Struggle

The "just start prompting" trap is seductive. You have a task. Claude Code is right there. Why bother with setup?

Here is why: Claude Code operates within a context window. Every session starts fresh unless you give it persistent context. Without structure, you spend the first ten minutes of every session re-explaining your project, your conventions, and your constraints.

I watched this pattern play out repeatedly:

**Session 1:** Great progress. Claude understands the project, makes solid contributions.

**Session 2:** Claude has forgotten everything. You re-explain. Progress is slower.

**Session 3:** You are tired of repeating yourself. You skip context. Claude makes decisions that contradict session 1. You spend more time fixing than building.

**Session 10:** You have given up on consistency and are using Claude as a fancy autocomplete.

The core issue is not memory - it is architecture. You would not start building an API without defining your data model. Why would you start an AI-assisted project without defining your context model?

## The Framework: Six Components

After running into these problems enough times, I developed a framework that prevents about 80% of common failure modes. You can adopt these incrementally based on project complexity.

### 1. Project Classification

Before you write a single prompt, classify your project. This determines how much structure you need.

**Product Projects** are when you are building software - applications, features, tools. These need the most structure because you are creating persistent artifacts that must be consistent over time.

**Assistant Projects** are when you are using Claude for research, analysis, or content creation. These need moderate structure focused on output consistency and domain knowledge.

**Automation Projects** are when you are building workflows, scripts, or integrations. These need structure around interfaces and error handling.

The classification matters because it shapes every subsequent decision. A product project needs extensive sections on code conventions. An assistant project needs more emphasis on output formats. Knowing which type you are building prevents over-engineering simple projects and under-engineering complex ones.

### 2. The CLAUDE.md Template

CLAUDE.md is the project brain. It is a markdown file in your project root that Claude Code reads automatically on every session. This solves the "re-explaining everything" problem once and for all.

A well-structured CLAUDE.md has four essential sections:

**Context Section** answers: What is this project? What are we building? Who is it for?

```markdown
CONTEXT: E-commerce platform for vintage furniture dealers.
Built with Next.js 14, Prisma, PostgreSQL.
Target users: Small antique shop owners who are not technical.
Current state: MVP complete, adding payment integration.
```

**Constraints Section** defines what Claude should never do. Without explicit constraints, Claude will make reasonable-seeming decisions that violate your unstated assumptions.

```markdown
CONSTRAINTS:
- NEVER modify database migration files directly - use Prisma migrate
- DO NOT add new dependencies without explicit approval
- All API endpoints must include rate limiting
- No console.log in production code - use the logger utility
```

Be specific. "Write clean code" is useless. "All functions over 20 lines need a docstring explaining the business logic" is actionable.

**Conventions Section** covers style, patterns, and preferences - the implicit knowledge that makes code consistent.

```markdown
CONVENTIONS:
- UK English in all user-facing text (colour, organisation, realise)
- Component files: PascalCase (ProductCard.tsx)
- Error handling: always use the AppError class from /lib/errors
```

**Current State Section** tracks what has been done and what is next. This is your session handoff mechanism.

```markdown
CURRENT STATE:
Completed:
- User authentication flow
- Product listing pages

In Progress:
- Stripe payment integration (80% complete)

Next:
- Order confirmation emails
```

Update this section at the end of every significant session. It takes thirty seconds and saves ten minutes of context-setting next time.

### 3. Discovery Questions

Before starting any project, answer these questions. Write the answers down. If you cannot answer them, you are not ready to start.

**What does "done" look like?** Not "build a website" but "a deployed Next.js application where users can browse products, add them to a cart, and complete checkout with Stripe." Vague definitions of done lead to vague outputs.

**What existing code or documentation needs to be understood?** List the files, folders, and external docs that provide essential context.

**What are the non-negotiable constraints?** Technical requirements, business rules, regulatory considerations. These go in your CLAUDE.md constraints section.

**Who are the stakeholders and what do they care about?** Are you optimising for speed to market? Code quality? Learning? The answer shapes how you work with Claude.

**What does this project connect to?** External APIs, databases, existing systems. Understanding the integration landscape prevents Claude from making decisions that break at the boundaries.

### 4. Agents and Skills

For complex projects, you may need to go beyond a single CLAUDE.md and define specialised agents. This is powerful but comes with overhead - do not introduce it prematurely.

**When to use agents:**
- Your project has distinct domains requiring different context (frontend vs. backend vs. infrastructure)
- You find yourself constantly switching mental models within a session
- You want to enforce separation of concerns at the AI level

**When to keep it simple:** If your project is single-focus - building one feature, writing one document, creating one automation - skip agents entirely. Start simple, add complexity only when you feel the pain of not having it.

If you do use agents, each should have a single, clear responsibility with explicit boundaries on what it can read, write, and never touch.

### 5. Session Handoff Protocols

The best CLAUDE.md in the world will not help if you do not maintain it. Session handoffs are where most projects quietly fail.

**End-of-session ritual:**

1. Update the "Current State" section of CLAUDE.md
2. Document any decisions made that are not obvious from the code
3. Note any blockers or open questions for next session
4. If you created new patterns, add them to conventions

This takes two to three minutes. It saves ten to fifteen minutes of re-discovery next session.

**Explicit next-steps documentation:** End every session with a concrete next action. Not "continue working on payments" but "implement the webhook handler for payment_intent.succeeded event in /api/webhooks/stripe/route.ts."

Specificity helps future-you (or Claude) pick up exactly where you left off.

### 6. Iteration and Refinement

Your CLAUDE.md is not a write-once artifact. It needs maintenance, but the wrong kind creates its own problems.

**When to update CLAUDE.md:**
- You find yourself repeatedly correcting Claude on the same issue
- Project direction changes significantly
- You establish new patterns worth preserving
- The "current state" is more than a week stale

**Recognising diminishing returns:** If your CLAUDE.md is over 500 lines, you have probably over-engineered it. Look for sections Claude never references, constraints that overlap, and context that is outdated. Trim ruthlessly.

**The "reset and restructure" decision:** Sometimes a project has accumulated so much context debt that the cleanest path forward is starting fresh. Signs you need a reset: sessions consistently produce conflicting outputs, you spend more time correcting than building, or the CLAUDE.md has become a historical document rather than a working one.

## Implementation: Your First Structured Project

**Step 1:** Classify your project. Product, assistant, or automation? Write it down.

**Step 2:** Answer the discovery questions before opening Claude Code.

**Step 3:** Create your CLAUDE.md with the four essential sections. Keep it under 200 lines. Do not over-engineer on day one.

**Step 4:** In your first session, confirm Claude has read and understood the CLAUDE.md. Complete one small, well-defined task. Note any corrections needed - these become updates.

**Step 5:** Establish the handoff ritual from day one. Before ending any session: update Current State, document new patterns, write the specific next action.

**Step 6:** After three to five sessions, review what worked and what did not. Refine based on actual experience, not anticipated needs.

## Common Mistakes

**Over-engineering the CLAUDE.md.** A 1000-line file that covers every edge case is harder to maintain and harder for Claude to parse. Start minimal. Add only what proves necessary through actual friction.

**Not updating context as the project evolves.** If your context file describes a project state from three weeks ago, Claude will make decisions based on outdated information. Schedule regular reviews.

**Creating agents too early.** I have seen projects spin up five agents in week one, then spend more time managing agent boundaries than actually building. Add agents only when you feel specific pain.

**Treating every session as independent.** The power of this framework comes from accumulation. Each session builds on the last. If you do not update context, document decisions, and maintain current state, you lose the compounding benefit.

## Next Steps

**Immediate action:** Pick your next Claude Code project. Before opening a terminal, answer the five discovery questions in a text file. If you cannot answer them, the project is not ready.

**This week:** Create a CLAUDE.md using the four-section template. Keep it under 200 lines. Run three sessions, updating the Current State section after each.

**This month:** Review what worked. Refine your template based on actual experience.

The gap between "using Claude Code" and "using Claude Code effectively" is mostly about structure. The prompts matter less than the architecture. Get the architecture right, and the prompts almost write themselves.

---

**Want the templates?** Download the [Claude Code Project Setup Kit](/resources/claude-code-setup-kit) - includes the CLAUDE.md template, discovery checklist, and agent design guide.
