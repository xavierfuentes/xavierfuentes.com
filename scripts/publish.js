#!/usr/bin/env node

require("dotenv").config();

const GhostAdminAPI = require("@tryghost/admin-api");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const frontmatter = require("front-matter");
const { marked } = require("marked");

class GhostContentManager {
  constructor() {
    this.api = new GhostAdminAPI({
      url: process.env.GHOST_ADMIN_API_URL,
      key: process.env.GHOST_ADMIN_API_KEY,
      version: "v5.0",
    });

    if (!process.env.GHOST_ADMIN_API_URL || !process.env.GHOST_ADMIN_API_KEY) {
      throw new Error(
        "Missing required environment variables: GHOST_ADMIN_API_URL and GHOST_ADMIN_API_KEY"
      );
    }
  }

  async publishContent() {
    console.log("🚀 Starting Ghost content publishing...");

    try {
      const posts = await this.processContentFiles(
        "content/posts/**/*.md",
        "post"
      );
      const drafts = await this.processContentFiles(
        "content/drafts/**/*.md",
        "post"
      );
      const pages = await this.processContentFiles(
        "content/pages/**/*.md",
        "page"
      );

      console.log(
        `✅ Successfully processed ${posts.length} posts, ${drafts.length} drafts, and ${pages.length} pages`
      );
    } catch (error) {
      console.error("❌ Error publishing content:", error.message);
      process.exit(1);
    }
  }

  async processContentFiles(pattern, type) {
    const files = glob.sync(pattern);
    const results = [];

    for (const filePath of files) {
      try {
        console.log(`📝 Processing ${type}: ${filePath}`);
        const result = await this.processFile(filePath, type);
        results.push(result);
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        throw error;
      }
    }

    return results;
  }

  async processFile(filePath, type) {
    const content = fs.readFileSync(filePath, "utf8");
    const { attributes: frontmatterData, body: markdownContent } =
      frontmatter(content);

    const requiredFields = ["title", "slug"];
    for (const field of requiredFields) {
      if (!frontmatterData[field]) {
        throw new Error(`Missing required field '${field}' in ${filePath}`);
      }
    }

    const ghostContent = this.buildGhostContent(
      frontmatterData,
      markdownContent,
      type
    );

    try {
      const existingContent = await this.findExistingContent(
        frontmatterData.slug,
        type
      );

      if (existingContent) {
        console.log(`🔄 Updating existing ${type}: ${frontmatterData.slug}`);
        console.log(
          "🔍 Content being sent to Ghost:",
          JSON.stringify(ghostContent, null, 2)
        );
        const updatedContent = await this.updateContent(
          existingContent.id,
          ghostContent,
          type
        );
        return { action: "updated", content: updatedContent };
      } else {
        console.log(`➕ Creating new ${type}: ${frontmatterData.slug}`);
        const newContent = await this.createContent(ghostContent, type);
        return { action: "created", content: newContent };
      }
    } catch (error) {
      if (error.message.includes("not found")) {
        console.log(`➕ Creating new ${type}: ${frontmatterData.slug}`);
        const newContent = await this.createContent(ghostContent, type);
        return { action: "created", content: newContent };
      }
      throw error;
    }
  }

  buildGhostContent(frontmatter, markdownContent, type) {
    const html = marked(markdownContent);

    const ghostContent = {
      title: frontmatter.title,
      slug: frontmatter.slug,
      html: html,
      status: frontmatter.status || "draft",
      visibility: frontmatter.visibility || "public",
      meta_title: frontmatter.meta_title || null,
      meta_description: frontmatter.meta_description || null,
      feature_image: frontmatter.feature_image || null,
      featured: frontmatter.featured || false,
      excerpt: frontmatter.excerpt || null,
      custom_excerpt: frontmatter.custom_excerpt || null,
    };

    if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
      ghostContent.tags = frontmatter.tags.map((tag) => ({ name: tag }));
    }

    if (frontmatter.authors && Array.isArray(frontmatter.authors)) {
      ghostContent.authors = frontmatter.authors.map((author) => ({
        slug: author,
      }));
    }

    if (type === "page") {
      delete ghostContent.tags;
      delete ghostContent.authors;
      delete ghostContent.featured;
      delete ghostContent.excerpt;
      delete ghostContent.custom_excerpt;
    }

    Object.keys(ghostContent).forEach((key) => {
      if (ghostContent[key] === null || ghostContent[key] === undefined) {
        delete ghostContent[key];
      }
    });

    return ghostContent;
  }

  async findExistingContent(slug, type) {
    try {
      if (type === "post") {
        const posts = await this.api.posts.browse({
          filter: `slug:${slug}`,
          limit: 1,
        });
        return posts.length > 0 ? posts[0] : null;
      } else {
        const pages = await this.api.pages.browse({
          filter: `slug:${slug}`,
          limit: 1,
        });
        return pages.length > 0 ? pages[0] : null;
      }
    } catch (error) {
      console.warn(
        `⚠️  Could not find existing ${type} with slug '${slug}':`,
        error.message
      );
      return null;
    }
  }

  async createContent(content, type) {
    if (type === "post") {
      return await this.api.posts.add(content);
    } else {
      return await this.api.pages.add(content);
    }
  }

  async updateContent(id, content, type) {
    try {
      // Remove read-only fields that Ghost returns but doesn't accept on update
      const updatePayload = { id, ...content };
      const readOnlyFields = [
        "uuid",
        "comment_id",
        "created_at",
        "updated_at",
        "published_at",
        "url",
        "primary_author",
        "primary_tag",
        "email_recipient_filter",
        "send_email_when_published",
        "email_subject",
        "email_only",
        "authors",
        "tags",
      ];

      readOnlyFields.forEach((field) => delete updatePayload[field]);

      if (type === "post") {
        return await this.api.posts.edit(updatePayload);
      } else {
        return await this.api.pages.edit(updatePayload);
      }
    } catch (error) {
      console.error(`❌ Error updating ${type} (ID: ${id}):`, error.message);
      if (error.response && error.response.data) {
        console.error(
          "Response data:",
          JSON.stringify(error.response.data, null, 2)
        );
      }
      throw error;
    }
  }
}

if (require.main === module) {
  const manager = new GhostContentManager();
  manager.publishContent().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

module.exports = GhostContentManager;
