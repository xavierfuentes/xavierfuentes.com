# MCP Recommendations for Content OS

Recommended MCP servers to enhance the Content OS workflow.

## Currently Configured

### Notion MCP
**Status:** Already configured
**Use case:** Research and idea capture from Notion databases
**Integration point:** idea-builder agent can pull from Notion research database

### Context7 MCP
**Status:** Already configured
**Use case:** Library documentation lookup for technical content
**Integration point:** Useful when drafting technical content (technology-strategy pillar)

## Recommended Additions

### Ghost Admin API MCP (High Priority)
**Why:** Direct integration with Ghost CMS would eliminate the need for `scripts/publish.js`
**Benefits:**
- Real-time post status checking
- Preview URL generation
- Tag and author management
- Image upload handling
- Scheduled post management

**Alternative:** The current `scripts/publish.js` approach works; an MCP would add convenience, not critical functionality.

**Implementation:** Would need to be custom-built or find an existing Ghost MCP server.

### RSS/Feedly MCP (Medium Priority)
**Why:** Automate research input for idea generation
**Benefits:**
- Direct feed reading in Claude Code sessions
- Quick capture of interesting articles
- Feed to idea-builder agent workflow

**Current workaround:** n8n automation handles RSS → Notion, which works well.

### LinkedIn API MCP (Medium Priority)
**Why:** Post directly from projection files
**Benefits:**
- Schedule posts from `content/linkedin/` files
- Track engagement metrics
- Avoid manual copy-paste to LinkedIn

**Challenges:**
- LinkedIn API access is restricted
- May require LinkedIn Marketing API approval
- Personal profiles have limited API access

**Current workaround:** Manual posting from projection files (acceptable for now).

### Buffer/Typefully MCP (Medium Priority)
**Why:** Social scheduling without direct LinkedIn API
**Benefits:**
- Schedule LinkedIn posts via Buffer or Typefully
- Cross-platform scheduling (LinkedIn, Twitter, etc.)
- Analytics integration

**Implementation:** These platforms have APIs that could be wrapped in MCPs.

## Not Recommended (Yet)

### n8n MCP
**Reason:** n8n workflows are managed via UI; Claude Code shouldn't modify them. The current separation (n8n for automation, Claude for content) works well.

### Email/Newsletter MCP
**Reason:** Newsletter sending is infrequent (bi-weekly). Manual process with review step is appropriate. When sending becomes weekly with higher volume, reconsider.

## Integration Architecture

```
Research Input:
  RSS Feeds → n8n → Notion → [Notion MCP] → idea-builder agent

Content Creation:
  idea-builder → strategy → drafting → projection-* agents
  (All handled by Claude Code agents, no MCP needed)

Publishing:
  Blog:      /publish command → Ghost (or [Ghost MCP] if available)
  LinkedIn:  Manual or [Buffer MCP] if available
  Newsletter: Manual (ConvertKit/email tool)

Context:
  Technical docs → [Context7 MCP] → drafting agent
```

## Current Permissions in settings.local.json

Already configured:
- `mcp__Notion__fetch`, `mcp__Notion__search`, `mcp__Notion__notion-update-page`, `mcp__Notion__notion-fetch`
- `mcp__context7__resolve-library-id`, `mcp__context7__get-library-docs`
- Various `WebFetch` domains including ghost.org, github.com

These cover the essential integrations. Additional MCPs would be nice-to-have, not must-have.
