#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const frontmatter = require("front-matter");

class SyncChecker {
  constructor() {
    this.ideas = [];
    this.drafts = [];
    this.posts = [];
    this.errors = [];
    this.warnings = [];
    this.checked = 0;
  }

  async checkSyncStatus() {
    console.log("🔄 Starting status sync validation...\n");

    try {
      await this.loadAllContent();
      this.validateStatusAlignment();
      this.printResults();

      if (this.errors.length > 0) {
        console.error(
          `\n❌ Sync validation failed with ${this.errors.length} error(s)`
        );
        process.exit(1);
      } else {
        console.log(
          `\n✅ Sync validation passed! ${this.checked} idea(s) checked, ${this.warnings.length} warning(s)`
        );
        process.exit(0);
      }
    } catch (error) {
      console.error("❌ Sync validation error:", error.message);
      process.exit(1);
    }
  }

  async loadAllContent() {
    this.ideas = await this.loadContentFiles("content/ideas/**/*.md");
    this.drafts = await this.loadContentFiles("content/drafts/**/*.md");
    this.posts = await this.loadContentFiles("content/posts/**/*.md");

    console.log(`   Loaded ${this.ideas.length} idea(s)`);
    console.log(`   Loaded ${this.drafts.length} draft(s)`);
    console.log(`   Loaded ${this.posts.length} post(s)`);
    console.log("");
  }

  async loadContentFiles(pattern) {
    const files = glob.sync(pattern);
    const results = [];

    for (const filePath of files) {
      try {
        const content = fs.readFileSync(filePath, "utf8");
        const { attributes: frontmatterData } = frontmatter(content);

        results.push({
          filePath,
          fileName: path.basename(filePath, ".md"),
          frontmatter: frontmatterData,
        });
      } catch (error) {
        console.warn(`⚠️  Could not parse ${filePath}: ${error.message}`);
      }
    }

    return results;
  }

  validateStatusAlignment() {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("🔍 Checking Status Alignment");
    console.log("═══════════════════════════════════════════════════════════\n");

    for (const idea of this.ideas) {
      const ideaId = idea.frontmatter?.id || idea.fileName;
      const ideaStatus = idea.frontmatter?.status || "idea";

      this.checked++;

      switch (ideaStatus) {
        case "idea":
          // No draft required - this is fine
          this.logCheck(ideaId, "idea", "✓ No draft required");
          break;

        case "drafting":
          this.checkDraftingStatus(idea, ideaId);
          break;

        case "ready_for_projection":
          this.checkReadyForProjectionStatus(idea, ideaId);
          break;

        case "published":
          this.checkPublishedStatus(idea, ideaId);
          break;

        case "archived":
          // Archived ideas don't need alignment checks
          this.logCheck(ideaId, "archived", "✓ Archived (no checks needed)");
          break;

        default:
          this.addWarning(
            idea.filePath,
            `Unknown idea status: ${ideaStatus}`
          );
      }
    }
  }

  checkDraftingStatus(idea, ideaId) {
    // Idea status: drafting -> Draft should exist with status: draft
    const matchingDraft = this.findDraftForIdea(ideaId);

    if (!matchingDraft) {
      this.addError(
        idea.filePath,
        `Idea has status 'drafting' but no corresponding draft found. Expected draft with idea_id: "${ideaId}"`
      );
      this.logCheck(ideaId, "drafting", "✗ Missing draft");
    } else {
      const draftStatus = matchingDraft.frontmatter?.status;
      if (draftStatus !== "draft") {
        this.addError(
          matchingDraft.filePath,
          `Draft for idea '${ideaId}' has status '${draftStatus}', expected 'draft'`
        );
        this.logCheck(
          ideaId,
          "drafting",
          `✗ Draft status mismatch (${draftStatus} vs draft)`
        );
      } else {
        this.logCheck(ideaId, "drafting", "✓ Draft exists with correct status");
      }
    }
  }

  checkReadyForProjectionStatus(idea, ideaId) {
    // Idea status: ready_for_projection -> Draft should exist (status doesn't matter)
    const matchingDraft = this.findDraftForIdea(ideaId);
    const matchingPost = this.findPostForIdea(ideaId);

    // Check drafts first, then posts (in case it's been promoted)
    if (!matchingDraft && !matchingPost) {
      this.addError(
        idea.filePath,
        `Idea has status 'ready_for_projection' but no corresponding draft or post found. Expected file with idea_id: "${ideaId}"`
      );
      this.logCheck(ideaId, "ready_for_projection", "✗ Missing draft/post");
    } else if (matchingPost) {
      // Post exists - might want to update idea status to published
      this.addWarning(
        idea.filePath,
        `Idea has status 'ready_for_projection' but a post already exists. Consider updating idea status to 'published'.`
      );
      this.logCheck(
        ideaId,
        "ready_for_projection",
        "⚠ Post exists (consider updating idea status)"
      );
    } else {
      this.logCheck(ideaId, "ready_for_projection", "✓ Draft exists");
    }
  }

  checkPublishedStatus(idea, ideaId) {
    // Idea status: published -> Post should exist in content/posts/ with status: published
    const matchingPost = this.findPostForIdea(ideaId);

    if (!matchingPost) {
      this.addError(
        idea.filePath,
        `Idea has status 'published' but no corresponding post found in content/posts/. Expected post with idea_id: "${ideaId}"`
      );
      this.logCheck(ideaId, "published", "✗ Missing post");
    } else {
      const postStatus = matchingPost.frontmatter?.status;
      if (postStatus !== "published") {
        this.addError(
          matchingPost.filePath,
          `Post for idea '${ideaId}' has status '${postStatus}', expected 'published'`
        );
        this.logCheck(
          ideaId,
          "published",
          `✗ Post status mismatch (${postStatus} vs published)`
        );
      } else {
        this.logCheck(ideaId, "published", "✓ Post exists with correct status");
      }
    }
  }

  findDraftForIdea(ideaId) {
    return this.drafts.find((draft) => {
      const draftIdeaId = draft.frontmatter?.idea_id;
      // Handle both quoted and unquoted idea_id values
      const normalizedDraftId =
        typeof draftIdeaId === "string"
          ? draftIdeaId.replace(/^["']|["']$/g, "")
          : draftIdeaId;
      return normalizedDraftId === ideaId;
    });
  }

  findPostForIdea(ideaId) {
    return this.posts.find((post) => {
      const postIdeaId = post.frontmatter?.idea_id;
      // Handle both quoted and unquoted idea_id values
      const normalizedPostId =
        typeof postIdeaId === "string"
          ? postIdeaId.replace(/^["']|["']$/g, "")
          : postIdeaId;
      return normalizedPostId === ideaId;
    });
  }

  logCheck(ideaId, status, result) {
    const statusPadded = status.padEnd(22);
    console.log(`   ${ideaId}`);
    console.log(`     Status: ${statusPadded} ${result}`);
    console.log("");
  }

  addError(filePath, message) {
    this.errors.push({ file: filePath, message, type: "error" });
  }

  addWarning(filePath, message) {
    this.warnings.push({ file: filePath, message, type: "warning" });
  }

  printResults() {
    if (this.errors.length > 0) {
      console.log("═══════════════════════════════════════════════════════════");
      console.log("❌ ERRORS");
      console.log("═══════════════════════════════════════════════════════════\n");
      this.errors.forEach((error) => {
        console.log(`   ${error.file}`);
        console.log(`     ${error.message}`);
        console.log("");
      });
    }

    if (this.warnings.length > 0) {
      console.log("═══════════════════════════════════════════════════════════");
      console.log("⚠️  WARNINGS");
      console.log("═══════════════════════════════════════════════════════════\n");
      this.warnings.forEach((warning) => {
        console.log(`   ${warning.file}`);
        console.log(`     ${warning.message}`);
        console.log("");
      });
    }
  }
}

if (require.main === module) {
  const checker = new SyncChecker();
  checker.checkSyncStatus().catch((error) => {
    console.error("Fatal sync check error:", error);
    process.exit(1);
  });
}

module.exports = SyncChecker;
