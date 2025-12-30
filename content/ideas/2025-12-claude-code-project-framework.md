---
id: 2025-12-claude-code-project-framework
pillar: technology-strategy
status: ready_for_projection
primary_channel: personal_blog
secondary_channels:
  - linkedin
target_audience: tech_lead_ai_adopter
target_outcome: authority
seo_keyword: claude code project setup
lead_magnet: Claude Code Project Setup Kit
notes: >
  Most developers jump into Claude Code without structure, then hit context loss,
  scope creep, or inconsistent outputs. This framework provides the "missing manual"
  for setting up projects correctly from day one. Positions author as a practitioner
  who has figured out repeatable patterns for AI-assisted development.
---

# The Claude Code Project Framework: A Practitioner's Guide to AI-Assisted Development

## Problem

Developers adopting Claude Code typically start with ad-hoc prompting and no project structure, leading to context loss between sessions, scope creep, inconsistent outputs, and frustration. There's no canonical guide for how to set up and manage Claude Code projects systematically.

## Angle

- Most Claude Code content focuses on prompting techniques, not project architecture
- The real leverage comes from upfront structure, not cleverer prompts
- A proper CLAUDE.md and agent/skill setup prevents 80% of common failure modes
- This is based on real practitioner experience, not theoretical best practices
- Timeliness: Claude Code adoption is accelerating but best practices haven't crystallised

## Rough Outline

1. **Hook**: "I've set up 15+ Claude Code projects in the past six months. The difference between the ones that worked and the ones that frustrated me came down to how I started, not how I prompted."

2. **Context**: Why most people struggle with Claude Code
   - The "just start prompting" trap
   - Context window limitations create session amnesia
   - Without structure, every session starts from scratch
   - The cognitive load of re-explaining your project repeatedly

3. **Framework**: The Claude Code Project Framework
   - **Project Classification** (first decision)
     - Product projects (building software)
     - Assistant projects (research, analysis, writing)
     - Automation projects (workflows, scripts, integrations)
   - **CLAUDE.md Template** (the project brain)
     - Context section (what is this project?)
     - Constraints section (what should Claude never do?)
     - Conventions section (style, patterns, preferences)
     - Current state section (what's been done, what's next?)
   - **Discovery Questions** (answer before you start)
     - What does "done" look like?
     - What existing code/docs need to be understood?
     - What are the non-negotiable constraints?
     - Who are the stakeholders and what do they care about?
   - **Agents/Skills/Workflows** (when complexity warrants)
     - When to introduce agents vs. keep it simple
     - Naming conventions and scope boundaries
     - The single-responsibility principle for AI agents
   - **Session Handoff Protocols**
     - End-of-session summaries
     - The "current state" pattern
     - Explicit next-steps documentation
   - **Iteration and Refinement Patterns**
     - When to update CLAUDE.md vs. when to prompt differently
     - Recognising diminishing returns
     - The "reset and restructure" decision

4. **Case Study**: Walk through setting up a real project
   - Before: ad-hoc approach and pain points
   - After: structured approach and outcomes
   - Specific examples of context that would have been lost without structure

5. **Implementation**: Step-by-step for your next project
   - Start with classification
   - Create CLAUDE.md from template
   - Answer discovery questions
   - Run first session with explicit structure
   - Establish handoff protocol from day one

6. **Pitfalls**: Common mistakes even with structure
   - Over-engineering the CLAUDE.md (diminishing returns)
   - Not updating context as the project evolves
   - Creating agents too early (premature abstraction)
   - Ignoring the classification step

7. **Next Steps**:
   - Download the CLAUDE.md template and discovery checklist
   - Try the framework on your next project
   - Share what worked/didn't (build community knowledge)

## Canonical Notes

- Draw from personal experience setting up xavierfuentes.com content OS
- Reference the agent structure in this repo as a concrete example
- Potential LinkedIn angles:
  - "The one file that made Claude Code actually useful" (CLAUDE.md deep dive)
  - "Why I classify projects before writing a single prompt"
  - "The session handoff pattern that saved me hours"
  - "3 signs you're over-engineering your Claude Code setup"
- Newsletter angle: Could be a multi-part deep dive in The Jungle Brief
- Related to broader theme of "AI as a tool requires new tooling practices"
- This positions well for future content on AI development workflows

## Series Potential

This could expand into a content series:
1. **Main article**: The full framework (blog)
2. **LinkedIn series**: One post per framework component
3. **Newsletter**: Practical implementation guide with templates
4. **Follow-up articles**:
   - "CLAUDE.md Patterns That Actually Work"
   - "When to Use Agents vs. Keep It Simple"
   - "The Discovery Questions Every AI Project Needs"

---

## Canonical Draft

### Hook

I have set up fifteen Claude Code projects in the past six months. The difference between the ones that worked and the ones that frustrated me came down to one thing: how I started, not how I prompted.

Most developers approach Claude Code the same way they approach ChatGPT - they open a terminal, start typing prompts, and hope for the best. Then they hit the same walls: context loss between sessions, scope creep within sessions, inconsistent outputs that require constant correction, and the nagging sense that they are fighting the tool rather than collaborating with it.

The problem is not Claude Code. The problem is that there is no canonical guide for how to set up and manage projects systematically. The documentation tells you what Claude Code can do, but not how to structure a project so it actually delivers consistent value over time.

This is the missing manual.

### Context: Why Most People Struggle

The "just start prompting" trap is seductive. You have a task. Claude Code is right there. Why bother with setup when you can just ask it to do things?

Here is why: Claude Code operates within a context window. Every session starts fresh unless you give it persistent context. Without structure, you spend the first ten minutes of every session re-explaining your project, your conventions, and your constraints. That cognitive overhead adds up fast.

I watched this pattern play out repeatedly:

**Session 1:** Great progress. Claude understands the project, makes solid contributions.

**Session 2:** Claude has forgotten everything. You re-explain. Progress is slower.

**Session 3:** You are tired of repeating yourself. You skip context. Claude makes decisions that contradict session 1. You spend more time fixing than building.

**Session 10:** You have given up on consistency and are using Claude as a fancy autocomplete.

The core issue is not memory - it is architecture. Claude Code projects need the same upfront design thinking you would apply to any software system. You would not start building an API without defining your data model. Why would you start an AI-assisted project without defining your context model?

### The Framework: Six Components for Effective Claude Code Projects

After running into these problems enough times, I developed a framework that prevents about 80% of common failure modes. It has six components, and you can adopt them incrementally based on project complexity.

#### 1. Project Classification

Before you write a single prompt, classify your project. This determines how much structure you need and what patterns apply.

**Product Projects** are when you are building software - applications, features, tools. These need the most structure because you are creating persistent artifacts that must be consistent over time. Examples: building a web application, creating a CLI tool, developing an API.

**Assistant Projects** are when you are using Claude for research, analysis, or content creation. These need moderate structure focused on output consistency and domain knowledge. Examples: market research, document analysis, writing projects.

**Automation Projects** are when you are building workflows, scripts, or integrations. These need structure around interfaces and error handling. Examples: data pipelines, CI/CD scripts, integration connectors.

The classification matters because it shapes every subsequent decision. A product project might need extensive CLAUDE.md sections on code conventions and architecture patterns. An assistant project might need more emphasis on output formats and domain terminology. Knowing which type you are building prevents over-engineering simple projects and under-engineering complex ones.

#### 2. The CLAUDE.md Template

CLAUDE.md is the project brain. It is a markdown file in your project root that Claude Code reads automatically on every session. This is where you solve the "re-explaining everything" problem once and for all.

A well-structured CLAUDE.md has four essential sections:

**Context Section** answers: What is this project? What are we building? Who is it for?

```markdown
CONTEXT: E-commerce platform for vintage furniture dealers.
Built with Next.js 14, Prisma, PostgreSQL.
Target users: Small antique shop owners who are not technical.
Current state: MVP complete, adding payment integration.
```

This section should be concise but complete. Include enough that Claude understands the domain, the technical stack, and the current focus. Update it as the project evolves.

**Constraints Section** defines what Claude should never do. This is crucial. Without explicit constraints, Claude will make reasonable-seeming decisions that violate your unstated assumptions.

```markdown
CONSTRAINTS:
- NEVER modify database migration files directly - use Prisma migrate
- DO NOT add new dependencies without explicit approval
- All API endpoints must include rate limiting
- No console.log in production code - use the logger utility
```

Be specific. "Write clean code" is useless. "All functions over 20 lines need a docstring explaining the business logic" is actionable.

**Conventions Section** covers style, patterns, and preferences. This is where you document the implicit knowledge that makes code consistent.

```markdown
CONVENTIONS:
- UK English in all user-facing text (colour, organisation, realise)
- Component files: PascalCase (ProductCard.tsx)
- Utility functions: camelCase (formatCurrency.ts)
- API routes follow REST conventions
- Error handling: always use the AppError class from /lib/errors
```

**Current State Section** tracks what has been done and what is next. This is your session handoff mechanism.

```markdown
CURRENT STATE:
Completed:
- User authentication flow
- Product listing pages
- Shopping cart functionality

In Progress:
- Stripe payment integration (80% complete)

Next:
- Order confirmation emails
- Admin dashboard
```

Update this section at the end of every significant session. It takes thirty seconds and saves ten minutes of context-setting next time.

#### 3. Discovery Questions

Before starting any project, answer these questions. Write the answers down. If you cannot answer them, you are not ready to start.

**What does "done" look like?**

Not "build a website" but "a deployed Next.js application where users can browse products, add them to a cart, and complete checkout with Stripe, running on Vercel with a PostgreSQL database on Supabase."

Vague definitions of done lead to vague outputs. Claude works better with specific targets.

**What existing code or documentation needs to be understood?**

List the files, folders, and external docs that provide essential context. Point Claude to them explicitly in early sessions.

**What are the non-negotiable constraints?**

Technical requirements, business rules, regulatory considerations. These go in your CLAUDE.md constraints section but need to be identified upfront.

**Who are the stakeholders and what do they care about?**

Even for solo projects, this matters. Are you optimising for speed to market? Code quality? Learning? The answer shapes how you work with Claude.

**What does this project connect to?**

External APIs, databases, existing systems. Understanding the integration landscape prevents Claude from making decisions that break at the boundaries.

Answer these before your first session. Revisit them when the project feels stuck.

#### 4. Agents, Skills, and Workflows

For complex projects, you may need to go beyond a single CLAUDE.md and define specialised agents, skills, or workflows. This is powerful but comes with overhead - do not introduce it prematurely.

**When to use agents:**

- When your project has distinct domains that require different context (e.g., frontend vs. backend vs. infrastructure)
- When you find yourself constantly switching mental models within a session
- When you want to enforce separation of concerns at the AI level

**Agent design principles:**

- Each agent should have a single, clear responsibility
- Agents should have their own context files that supplement the main CLAUDE.md
- Name agents by what they do, not how they work (drafting-agent, not gpt4-writer)
- Define explicit boundaries: what can this agent read? Write? Never touch?

Consider a scenario where you are building a content management system. You might define:

- A **strategy-agent** that only works with content planning files
- A **drafting-agent** that expands outlines into full content
- A **projection-agent** that adapts content for different channels
- An **editorial-agent** that reviews for consistency

Each agent has its own scope and constraints. The strategy-agent never touches published content. The drafting-agent never modifies metadata. This prevents the kind of cross-contamination that happens when one session's work accidentally undoes another's.

**When to keep it simple:**

If your project is a single-focus effort - building one feature, writing one document, creating one automation - skip agents entirely. The overhead of defining and maintaining them outweighs the benefit. Start simple, add complexity only when you feel the pain of not having it.

#### 5. Session Handoff Protocols

The best CLAUDE.md in the world will not help if you do not maintain it. Session handoffs are where most projects quietly fail.

**End-of-session ritual:**

Before closing a session, always:

1. Update the "Current State" section of CLAUDE.md
2. Document any decisions made that are not obvious from the code
3. Note any blockers or open questions for next session
4. If you created new patterns, add them to conventions

This takes two to three minutes. It saves ten to fifteen minutes of re-discovery next session.

**The "current state" pattern:**

At minimum, track:
- What is complete (with specific file paths or features)
- What is in progress (with percentage estimate and next step)
- What is blocked (with the specific blocker)
- What is next (prioritised list)

**Explicit next-steps documentation:**

End every session with a concrete next action. Not "continue working on payments" but "implement the webhook handler for payment_intent.succeeded event in /api/webhooks/stripe/route.ts."

Specificity here helps future-you (or Claude) pick up exactly where you left off.

#### 6. Iteration and Refinement Patterns

Your CLAUDE.md and project structure are not write-once artifacts. They need maintenance, but the wrong kind of maintenance creates its own problems.

**When to update CLAUDE.md:**

- When you find yourself repeatedly correcting Claude on the same issue
- When project direction changes significantly
- When you establish new patterns worth preserving
- When the "current state" is more than a week stale

**When to prompt differently instead:**

- When the issue is session-specific, not project-wide
- When you are experimenting with approaches
- When the correction is a one-off clarification

**Recognising diminishing returns:**

If your CLAUDE.md is over 500 lines, you have probably over-engineered it. The cognitive overhead of maintaining elaborate context exceeds the benefit. Look for:

- Sections Claude never seems to reference
- Constraints that overlap or contradict
- Context that is outdated but "might be useful someday"

Trim ruthlessly. The goal is useful density, not comprehensive coverage.

**The "reset and restructure" decision:**

Sometimes a project has accumulated so much context debt that the cleanest path forward is starting fresh. Signs you need a reset:

- Sessions consistently produce outputs that conflict with project state
- You spend more time correcting than building
- The CLAUDE.md has become a historical document rather than a working one

Reset does not mean abandoning the project. It means archiving the current CLAUDE.md, reviewing what actually worked, and building a leaner version with only the context that proved valuable.

### Implementation: Your First Structured Project

Here is how to apply this framework to your next Claude Code project, step by step.

**Step 1: Classify your project**

Is it a product, assistant, or automation project? Write it down. This shapes everything that follows.

**Step 2: Answer the discovery questions**

Before opening Claude Code, document:
- What "done" looks like (specific, measurable)
- Existing context Claude needs to understand
- Non-negotiable constraints
- Stakeholder priorities
- Integration points

**Step 3: Create your CLAUDE.md**

Start with the four essential sections:
- Context (2-3 paragraphs maximum)
- Constraints (5-10 specific rules)
- Conventions (technical patterns and preferences)
- Current State (empty to start, but include the structure)

Do not over-engineer on day one. You will add to this as patterns emerge.

**Step 4: Run your first session with explicit structure**

In your first Claude Code session:
1. Confirm Claude has read and understood the CLAUDE.md
2. Complete one small, well-defined task
3. Review the output against your constraints and conventions
4. Note any corrections needed - these become updates to CLAUDE.md

**Step 5: Establish the handoff ritual**

Before ending the session:
1. Update Current State
2. Document any new patterns or constraints discovered
3. Write the specific next action

**Step 6: Iterate**

After three to five sessions, review:
- What constraints have you added?
- What patterns keep recurring?
- What context is Claude still missing?

Refine the CLAUDE.md based on actual experience, not anticipated needs.

### Pitfalls: Common Mistakes Even With Structure

Having a framework does not guarantee success. Here are the failure modes I see most often, even in projects that start with good intentions.

**Over-engineering the CLAUDE.md**

The temptation is to document everything. Resist it. A 1000-line CLAUDE.md that covers every edge case is harder to maintain and harder for Claude to parse effectively. Start minimal. Add only what proves necessary through actual friction.

**Not updating context as the project evolves**

Your CLAUDE.md is not a contract - it is a living document. Projects pivot. Priorities change. If your context file describes a project state from three weeks ago, Claude will make decisions based on outdated information. Schedule regular reviews, even if brief.

**Creating agents too early**

Agents are powerful but add complexity. I have seen projects spin up five agents in week one, then spend more time managing agent boundaries than actually building. Start with a single CLAUDE.md. Add agents only when you feel specific pain that agents would solve. Premature abstraction applies to AI tooling just as it applies to code.

**Ignoring the classification step**

"I'll figure out what kind of project this is as I go" leads to hybrid structures that serve no purpose well. Spend five minutes classifying upfront. If you genuinely cannot classify, that is a signal the project scope needs clarification before you start building.

**Treating every session as independent**

The power of this framework comes from accumulation. Each session builds on the last. If you treat sessions as standalone - not updating context, not documenting decisions, not maintaining current state - you lose the compounding benefit and are back to square one.

**Confusing documentation with context**

Your CLAUDE.md is not documentation for humans. It is context for Claude. Write it in the style that Claude processes best: direct, structured, specific. Skip the explanatory prose that would help a new team member but adds noise for the AI.

### Next Steps

The framework only works if you apply it. Here is how to start:

**Immediate action:** Pick your next Claude Code project. Before opening a terminal, answer the five discovery questions in a text file. If you cannot answer them, the project is not ready.

**This week:** Create a CLAUDE.md using the four-section template. Keep it under 200 lines. Run three sessions, updating the Current State section after each.

**This month:** Review what worked and what did not. Refine your CLAUDE.md template based on actual experience. If you are working on complex projects, consider whether agents would reduce friction.

**Share what you learn:** The best practices for Claude Code are still emerging. What works for you might help others. What trips you up might be a pattern worth documenting.

The gap between "using Claude Code" and "using Claude Code effectively" is mostly about structure. The prompts matter less than the architecture. Get the architecture right, and the prompts almost write themselves.

---

## Editorial Notes

### Voice & Angle Decisions
- Strongest piece in the batch — feels most authentically "you"
- Personal experience throughout: "I have set up fifteen Claude Code projects..."
- Session 1/2/3/10 progression is relatable and effective — keep
- "The prompts matter less than the architecture" — great closing insight

### Case Study Opportunities
- This repo IS the case study — reference it directly
- Real examples of agent definitions exist in this project
- CLAUDE.md can be abstracted as a template

### Feedback Log
- 30/12/2024: Graded A. Blog projection created, trimmed to ~1,800 words
- 30/12/2024: Agents section shortened for non-technical readers
- 30/12/2024: Strong LinkedIn series potential (4+ posts)
- 30/12/2024: Lead magnet (Claude Code Project Setup Kit) well-defined

---

### Canonical Notes

- This framework draws directly from setting up the xavierfuentes.com Content OS, which uses the agent structure described above
- The CLAUDE.md example can be abstracted from this repo's actual CLAUDE.md
- Real examples of agent definitions exist in this project (strategy-agent, drafting-agent, projection agents)
- The framework is timely - Claude Code adoption is accelerating but best practices have not crystallised
- Potential LinkedIn angles extracted:
  - "The one file that made Claude Code actually useful" (CLAUDE.md deep dive)
  - "Why I classify projects before writing a single prompt"
  - "The session handoff pattern that saved me hours"
  - "3 signs you are over-engineering your Claude Code setup"
- Newsletter angle: Multi-part deep dive in The Jungle Brief with downloadable templates
- Lead magnet opportunity: Claude Code Project Setup Kit (CLAUDE.md template + discovery checklist + agent design guide)
- Related to broader theme of "AI as a tool requires new tooling practices" - future content opportunity
- Word count: ~2,400 words (suitable for thought leadership piece, may trim to ~2,000 for blog projection)
