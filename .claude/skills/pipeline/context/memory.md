# MCP Memory Server Usage

The `memory` MCP server provides persistent knowledge graph storage across Claude sessions. Use it for context that should persist but doesn't need to be in version-controlled markdown files.

**Storage Location:** `.claude/memory.json` (project-local)

You can inspect the raw graph by reading this file if needed.

## When to Use Memory vs Markdown

| Use Memory For | Use Markdown For |
|----------------|------------------|
| Author preferences and voice | Task tracking (`BACKLOG.md`) |
| Content relationships | Editorial notes (in idea files) |
| Session context | Canonical drafts |
| Style decisions | Templates and schemas |

## Key Entities

### `author_profile`
Xavier's personality profile and communication style from Insights Discovery assessment.

**Contains:**
- Insights type: Motivating Inspirer (Type 26)
- Colour energies: High Yellow (91%), High Red (72%), Lower Blue (37%), Lower Green (39%)
- Communication preferences
- Strengths and blind spots
- What sounds authentic vs. inauthentic

### `voice_preferences`
Accumulated decisions about writing voice and style.

**Contains:**
- Phrases that sound like Xavier
- Phrases to avoid
- Tone decisions for specific topics
- What works on which channel

### `content_relationships`
Links between ideas, posts, and content series.

**Contains:**
- Which ideas relate to each other
- Which case studies have been used where
- Content series and sequencing

## Tools Available

### Creating/Updating Entities
```
mcp__memory__create_entities
```
Create new entities or update existing ones in the knowledge graph.

### Searching
```
mcp__memory__search_nodes
```
Search for entities by name or content.

### Reading
```
mcp__memory__open_nodes
```
Open specific entities to read their full content.

## Agent Workflow

### At Session Start
1. Query memory for `author_profile` to understand voice
2. Check `voice_preferences` for recent style decisions
3. Search for relevant `content_relationships` if working on related content

### During Work
- When making voice/style decisions, consider storing them in `voice_preferences`
- When discovering content relationships, add them to `content_relationships`

### At Session End
- Update memory with any new preferences or relationships discovered

## Initial Author Profile Data

From Xavier's Insights Discovery assessment (Type 26 - Motivating Inspirer):

**Natural Strengths:**
- Big-picture thinking
- Story-driven communication
- Energetic and enthusiastic
- Democratic, involves others
- Quick to see possibilities
- Warm and empathetic

**Voice Signatures (sounds like Xavier):**
- "Here's what actually works..."
- "Most people get this wrong because..."
- "I made this mistake at [company]—here's what I learned"
- "The uncomfortable truth is..."
- Direct opinions, stated confidently
- Frameworks and mental models over abstract theory

**Doesn't Sound Like Xavier:**
- Overly hedged statements
- Dense, detail-heavy explainers without a clear point
- Formal, distant, corporate tone
- Content that reads like a textbook
- Excessive caveats or disclaimers

**Tendencies to Watch:**
- Prefers verbal over written — best ideas may come from spoken notes
- Bored by detail — ensure important specifics aren't glossed over
- Starts many things — series need deliberate completion
- Can exaggerate significance — check claims are grounded
- Values opinions over pure facts — balance conviction with evidence

**Communication Preferences:**
- Be direct—don't bury feedback in qualifications
- Focus on the "so what?"—does this land?
- Recognise what's working before noting issues
- Keep it lively, not dull or procedural
