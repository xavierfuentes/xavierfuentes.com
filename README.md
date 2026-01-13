# xavierfuentes.com - Technical Leadership Blog

A GitHub-based content management system for my technical leadership blog at [xavierfuentes.com](https://xavierfuentes.com). This repository powers content creation and publishing using Ghost CMS with a developer-friendly Markdown workflow.

> **About**: A thought leadership platform targeting CTOs, Engineering Managers, Tech Leaders, Product Managers, and Founders interested in technology strategy, leadership, and execution.

## 🚀 Features

- **📝 Markdown Writing**: Write content in familiar Markdown with YAML frontmatter
- **🔄 Version Control**: All content is version controlled with Git
- **🤖 Automated Publishing**: Push to main branch to publish automatically via GitHub Actions
- **📋 Content Validation**: Validate markdown files and frontmatter before publishing
- **📄 Posts & Pages**: Support for both Ghost posts and pages
- **🏷️ Tag Management**: Manage tags through frontmatter
- **🖼️ Featured Images**: Support for featured images and SEO metadata (using Ghost's native storage)
- **📅 Publication Scheduling**: Schedule content publication
- **✏️ Draft Support**: Keep drafts in separate folder that don't get published
- **🔍 Update Detection**: Automatically update existing content when files are modified
- **❌ Robust Error Handling**: Comprehensive error handling and logging
- **🧠 Content OS**: Full content pipeline with ideas, drafts, and multi-channel projections
- **🤖 Claude Code Integration**: AI-powered agents for drafting, projection, and editorial review

## 📁 Repository Structure

```
/
├── content/
│   ├── ideas/           # Canonical idea files (source of truth)
│   ├── drafts/          # Blog post drafts for Ghost preview
│   ├── posts/           # Published Ghost posts
│   ├── pages/           # Ghost pages (About, Work With Me)
│   ├── linkedin/        # LinkedIn projections
│   └── newsletter/      # Newsletter issues
├── .claude/
│   ├── agents/          # Claude Code agents for content creation
│   └── skills/          # Claude Code skills and commands
├── .github/
│   └── workflows/       # GitHub Actions workflows
├── scripts/
│   ├── publish.js       # Main publishing script
│   └── validate.js      # Content validation script
├── docs/
│   ├── strategy/        # Content and execution strategy
│   ├── guides/          # Writing and brand guides
│   └── operations/      # Backlog and ops docs
├── package.json         # Node.js dependencies
├── CLAUDE.md            # Claude Code instructions
└── README.md            # This file
```

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 16+ installed locally (for development)
- Ghost CMS installation with Admin API access
- GitHub repository with Actions enabled

### 2. Ghost Setup

1. **Get your Ghost Admin API credentials**:
   - Go to your Ghost Admin panel at `https://xavierfuentes.com/ghost/`
   - Navigate to **Settings** → **Integrations**
   - Create a new **Custom Integration** (name it "GitHub Content Manager")
   - Copy the **Admin API Key** and **API URL**

### 3. GitHub Setup

1. **Fork this repository** or use as template
2. **Set up GitHub Secrets**:
   - Go to your repository **Settings** → **Secrets and variables** → **Actions**
   - Add the following repository secrets:
     - `GHOST_ADMIN_API_URL`: `https://xavierfuentes.com`
     - `GHOST_ADMIN_API_KEY`: Your Ghost Admin API key

### 4. Local Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create `.env` file** (for local testing):
   ```bash
   GHOST_ADMIN_API_URL=https://xavierfuentes.com
   GHOST_ADMIN_API_KEY=your_admin_api_key_here
   ```

3. **Test the setup**:
   ```bash
   # Validate existing content
   npm run validate
   
   # Test publishing (make sure you want to publish first!)
   npm run publish
   ```

## ✍️ Writing Content

### Content OS Workflow (Recommended)

The recommended way to create content is through the Content OS pipeline:

1. **Capture idea** → Use `idea-builder` agent or create file in `content/ideas/`
2. **Draft** → Use `drafting` agent to expand into canonical draft
3. **Project** → Use `projection-blog` agent to create Ghost-ready post in `content/drafts/`
4. **Publish** → Move to `content/posts/` and run `/publish`

See `CLAUDE.md` for full workflow documentation.

### Post Structure

Blog posts in `content/drafts/` or `content/posts/` use this frontmatter:

```yaml
---
# Ghost Required
title: Your Post Title                    # Required
slug: your-post-slug                      # Required, URL-safe
status: draft                             # draft, published, scheduled
visibility: public                        # public, members, paid

# Content OS Metadata (Recommended)
idea_id: 2025-01-your-idea-slug          # Links to source idea
pillar: technology-strategy               # Content pillar
target_audience: founder_3_20_engineers   # Target persona
target_outcome: inbound_leads             # Desired result

# Ghost Optional
featured: false
meta_title: SEO Title
meta_description: SEO description (150-160 chars)
feature_image: https://example.com/img.jpg
excerpt: Short excerpt for the post
tags:
  - Technical Leadership
  - Engineering Management
authors:
  - xavier
published_at: 2025-01-01T12:00:00.000Z
---

# Your Post Content

Write your post content here in **Markdown**.
```

### Page Structure

Create `.md` files in `content/pages/` with similar frontmatter (pages don't support `tags`, `authors`, or `featured` fields).

### Drafts

- `content/drafts/` contains blog post drafts that sync to Ghost for preview
- Drafts appear in Ghost Admin but are not publicly visible
- To publish: move file to `content/posts/`, change `status: published`, run `/publish`

## 🤖 Automated Workflows

### Publishing Workflow

**Trigger**: Push to `main` branch with changes in `content/`

**Process**:
1. Validates all content files
2. Publishes/updates content in Ghost
3. Provides deployment summary

**Manual publishing**: Run `/publish` command in Claude Code or `npm run publish` locally.

### Pull Request Validation

**Trigger**: Pull request with changes in `content/`

**Process**:
1. Validates content changes
2. Comments on PR with summary of what will be published
3. Ensures content is ready before merge

**Manual validation**: Run `/validate` command in Claude Code or `npm run validate` locally.

## 📋 Content Validation

The validation script checks:

- **Required fields**: `title` and `slug`
- **Data types**: Ensures fields have correct types
- **Date formats**: Validates ISO date strings
- **URL formats**: Checks image and link URLs
- **Slug format**: Ensures URL-safe slugs
- **File structure**: Validates file placement and naming
- **Ghost compatibility**: Warns about unsupported features

Run validation locally:
```bash
npm run validate
```

## 🔧 Advanced Configuration

### Custom Validation Rules

Modify `scripts/validate.js` to add custom validation rules for your content.

### Publishing Behavior

Modify `scripts/publish.js` to customize:
- Content processing logic
- Error handling behavior  
- Ghost API interaction

### GitHub Actions

Customize `.github/workflows/` files to:
- Change trigger conditions
- Add additional steps
- Modify notification behavior

## 📚 Content Management Tips

### Organizing Content

- **Ideas**: `content/ideas/YYYY-MM-slug.md` - Use date prefix for chronological ordering
- **Drafts**: `content/drafts/YYYY-MM-slug.md` - Match the source idea's slug
- **Posts**: `content/posts/YYYY-MM-slug.md` - Promoted from drafts when ready
- **LinkedIn**: `content/linkedin/idea-id-linkedin.md` - One file per idea
- **Newsletter**: `content/newsletter/issue-XX.md` - Sequential issue numbers

### SEO Best Practices

- Always include `meta_title` and `meta_description`
- Use descriptive, URL-safe slugs
- Add relevant tags for content discovery
- Include featured images for social sharing
- Use `seo_keyword` in idea frontmatter for target keywords

### Collaboration Workflow

1. **Create feature branch** for new content
2. **Add/edit content** in appropriate directories
3. **Create pull request** to trigger validation
4. **Review and merge** to publish automatically

## 🤖 Claude Code Integration

This repository includes a full Content OS powered by Claude Code agents, skills, and commands.

### Agents (Creative Work)

| Agent | Purpose |
|-------|---------|
| `idea-builder` | Capture new content ideas with proper structure |
| `strategy` | Review idea backlog, enforce pillar distribution |
| `drafting` | Expand ideas into canonical drafts |
| `projection-blog` | Create Ghost blog posts from ideas |
| `projection-linkedin` | Create LinkedIn posts from ideas |
| `projection-newsletter` | Assemble newsletter issues |
| `editorial` | Review consistency and quality |

### Commands (Operational Tasks)

| Command | Purpose |
|---------|---------|
| `/publish` | Sync content to Ghost CMS |
| `/validate` | Run frontmatter validation |
| `/pipeline` | Show content status and pillar distribution |
| `/promote [slug]` | Move draft to published |
| `/weekly` | Generate Monday planning review |

### Content Flow

```
Research → idea-builder → strategy → drafting → projection-* → editorial → /publish
```

### Configuration

- **CLAUDE.md** - Main instructions for Claude Code
- **.claude/agents/** - Agent definitions
- **.claude/skills/content-os/** - Skill with commands and context files

See `CLAUDE.md` for full documentation of the Content OS workflow.

## 🚨 Troubleshooting

### Common Issues

**❌ "Missing required environment variables"**
- Ensure `GHOST_ADMIN_API_URL` and `GHOST_ADMIN_API_KEY` are set in GitHub Secrets

**❌ "Failed to parse file"**
- Check YAML frontmatter syntax
- Ensure proper `---` delimiters

**❌ "Slug must contain only lowercase letters, numbers, and hyphens"** 
- Update slug to be URL-safe (no spaces, special characters)

**❌ "Content already exists"**
- The system automatically updates existing content based on slug
- Check Ghost admin panel for conflicts

### Getting Help

1. **Check the logs** in GitHub Actions for detailed error messages
2. **Run validation locally** with `npm run validate`
3. **Test publishing locally** (carefully) with `npm run publish`
4. **Review frontmatter** against the examples provided

## 👨‍💻 About

**Xavier Fuentes** - Technology Strategy & Leadership
**Website**: [xavierfuentes.com](https://xavierfuentes.com)
**LinkedIn**: [linkedin.com/in/xavifuentes](https://www.linkedin.com/in/xavifuentes/)
**Newsletter**: The Jungle Brief

This blog focuses on five content pillars:
- 🎯 **Technology Strategy** (30%) - Architecture, build-vs-buy, technical debt
- 👥 **Leadership & Management** (25%) - Team building, culture, hiring
- 🚀 **Execution & Delivery** (20%) - Shipping, estimation, processes
- 💡 **Founder Lessons** (15%) - Personal stories, mistakes, lessons learned
- 📈 **Market & AI Trends** (10%) - Industry observations, AI developments

**Target Audience**: CTOs, Engineering Managers, Tech Leaders, Product Managers, and Founders

## 📄 License

MIT License - feel free to adapt this system for your own technical blog!

## 🤝 Contributing

Found an issue or have suggestions for the content management system? Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

---

**Building the future of technical leadership, one post at a time** 🚀