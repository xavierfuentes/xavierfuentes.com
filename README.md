# xavierfuentes.com - Technical Leadership Blog

A GitHub-based content management system for my technical leadership blog at [xavierfuentes.com](https://xavierfuentes.com). This repository powers content creation and publishing using Ghost CMS with a developer-friendly Markdown workflow.

> **About**: This blog serves as a professional showcase for recruiters, CTOs, tech leads, and senior engineers interested in technical leadership, career progression, and engineering insights.

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

## 📁 Repository Structure

```
/
├── content/
│   ├── posts/           # Published posts
│   ├── pages/           # Static pages  
│   └── drafts/          # Draft content (not published)
├── .github/
│   └── workflows/       # GitHub Actions workflows
├── scripts/
│   ├── publish.js       # Main publishing script
│   └── validate.js      # Content validation script
├── package.json         # Node.js dependencies
└── README.md           # This file
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

### Post Structure

Create `.md` files in `content/posts/` with the following frontmatter:

```yaml
---
title: Your Post Title                    # Required
slug: your-post-slug                      # Required, URL-safe
status: published                         # draft, published, scheduled
visibility: public                        # public, members, paid
featured: true                           # true/false
meta_title: SEO Title                    # Optional SEO title
meta_description: SEO description         # Optional SEO description
feature_image: https://example.com/img.jpg # Optional featured image
excerpt: Short excerpt for the post      # Optional custom excerpt
tags:                                    # Optional tags array
  - Technical Leadership
  - Engineering Management
  - Career Progression
authors:                                 # Optional authors array
  - xavier
created_at: 2024-01-01T00:00:00.000Z    # Optional creation date
updated_at: 2024-01-01T12:00:00.000Z    # Optional update date
published_at: 2024-01-01T12:00:00.000Z  # Optional publication date
---

# Your Post Content

Write your post content here in **Markdown**.

- Support for all standard Markdown features
- Images, links, code blocks, etc.
- HTML is also supported if needed
```

### Page Structure

Create `.md` files in `content/pages/` with similar frontmatter (pages don't support `tags`, `authors`, or `featured` fields).

### Drafts

- Place draft content in `content/drafts/` (any subdirectory)
- Draft files won't be published automatically
- Move to `content/posts/` or `content/pages/` when ready to publish

## 🤖 Automated Workflows

### Publishing Workflow

**Trigger**: Push to `main` branch with changes in `content/`

**Process**:
1. Validates all content files
2. Publishes/updates content in Ghost
3. Provides deployment summary

### Pull Request Validation

**Trigger**: Pull request with changes in `content/`

**Process**:
1. Validates content changes
2. Comments on PR with summary of what will be published
3. Ensures content is ready before merge

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

- Use descriptive filenames that match your slug
- Group related content in subdirectories
- Keep drafts organized in the drafts folder

### SEO Best Practices

- Always include `meta_title` and `meta_description`
- Use descriptive, URL-safe slugs
- Add relevant tags for content discovery
- Include featured images for social sharing

### Collaboration Workflow

1. **Create feature branch** for new content
2. **Add/edit content** in appropriate directories
3. **Create pull request** to trigger validation
4. **Review and merge** to publish automatically

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

**Xavier Fuentes** - Technical Leadership & Engineering Management  
**Organization**: Mad Monkey Club  
**Website**: [xavierfuentes.com](https://xavierfuentes.com)  
**LinkedIn**: [linkedin.com/in/xavifuentes](https://www.linkedin.com/in/xavifuentes/)

This blog focuses on:
- 🎯 **Technical Leadership** - Leading engineering teams and technical strategy
- 📈 **Career Progression** - Growing from engineer to tech lead to CTO
- 🏗️ **Engineering Management** - Building scalable teams and processes
- 💡 **Industry Insights** - Trends, tools, and best practices

**Target Audience**: Recruiters, CEOs, CFOs, CTOs, Tech Leads, and Senior Engineers

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