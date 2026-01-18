#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const frontmatter = require("front-matter");

class PipelineManager {
  constructor() {
    this.ideas = [];
    this.drafts = [];
    this.posts = [];
    this.linkedin = [];
    this.newsletter = [];

    this.pillarTargets = {
      "technology-strategy": 30,
      "leadership-management": 25,
      "execution-delivery": 20,
      "founder-lessons": 15,
      "market-ai-trends": 10,
    };

    this.pillarLabels = {
      "technology-strategy": "Technology Strategy",
      "leadership-management": "Leadership & Management",
      "execution-delivery": "Execution & Delivery",
      "founder-lessons": "Founder Lessons",
      "market-ai-trends": "Market & AI Trends",
    };

    this.staleDays = 30;
  }

  async showPipelineStatus() {
    console.log("📊 Loading pipeline status...\n");

    try {
      await this.loadAllContent();
      this.displayPipelineStatus();
      this.displayPillarDistribution();
      this.displayChannelCadence();
      this.displayStaleItems();
      this.displaySuggestedActions();
      this.displayBacklogPriorities();
    } catch (error) {
      console.error("❌ Error loading pipeline:", error.message);
      process.exit(1);
    }
  }

  async loadAllContent() {
    this.ideas = await this.loadContentFiles("content/ideas/**/*.md");
    this.drafts = await this.loadContentFiles("content/drafts/**/*.md");
    this.posts = await this.loadContentFiles("content/posts/**/*.md");
    this.linkedin = await this.loadContentFiles("content/linkedin/**/*.md");
    this.newsletter = await this.loadContentFiles("content/newsletter/**/*.md");
  }

  async loadContentFiles(pattern) {
    const files = glob.sync(pattern);
    const results = [];

    for (const filePath of files) {
      try {
        const content = fs.readFileSync(filePath, "utf8");
        const { attributes: frontmatterData, body: markdownContent } =
          frontmatter(content);

        results.push({
          filePath,
          fileName: path.basename(filePath, ".md"),
          frontmatter: frontmatterData,
          hasContent: markdownContent.trim().length > 0,
        });
      } catch (error) {
        console.warn(`⚠️  Could not parse ${filePath}: ${error.message}`);
      }
    }

    return results;
  }

  displayPipelineStatus() {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("📊 Pipeline Status");
    console.log("═══════════════════════════════════════════════════════════\n");

    const statusCounts = {
      idea: 0,
      drafting: 0,
      ready_for_projection: 0,
      published: 0,
      archived: 0,
    };

    // Count ideas by status
    for (const idea of this.ideas) {
      const status = idea.frontmatter?.status || "idea";
      if (statusCounts.hasOwnProperty(status)) {
        statusCounts[status]++;
      }
    }

    console.log(`   Ideas (status: idea):              ${statusCounts.idea}`);
    console.log(`   Drafting (status: drafting):       ${statusCounts.drafting}`);
    console.log(`   Ready for Projection:              ${statusCounts.ready_for_projection}`);
    console.log(`   Published:                         ${statusCounts.published}`);
    console.log(`   Archived:                          ${statusCounts.archived}`);
    console.log("");
    console.log(`   Total Ideas:                       ${this.ideas.length}`);
    console.log(`   Total Drafts:                      ${this.drafts.length}`);
    console.log(`   Total Posts:                       ${this.posts.length}`);
    console.log(`   LinkedIn Posts:                    ${this.linkedin.length}`);
    console.log(`   Newsletter Issues:                 ${this.newsletter.length}`);
    console.log("");
  }

  displayPillarDistribution() {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("📈 Pillar Distribution (Active Ideas)");
    console.log("═══════════════════════════════════════════════════════════\n");

    const pillarCounts = {};
    let totalActive = 0;

    // Initialise counts
    for (const pillar of Object.keys(this.pillarTargets)) {
      pillarCounts[pillar] = 0;
    }

    // Count active ideas (not archived) by pillar
    for (const idea of this.ideas) {
      if (idea.frontmatter?.status === "archived") continue;

      const pillar = idea.frontmatter?.pillar;
      if (pillar && pillarCounts.hasOwnProperty(pillar)) {
        pillarCounts[pillar]++;
        totalActive++;
      }
    }

    // Display each pillar with comparison to target
    for (const [pillar, target] of Object.entries(this.pillarTargets)) {
      const count = pillarCounts[pillar];
      const percentage = totalActive > 0 ? Math.round((count / totalActive) * 100) : 0;
      const diff = percentage - target;

      let icon = "✓";
      if (diff < -10) {
        icon = "⚠";
      } else if (diff > 10) {
        icon = "▲";
      }

      const label = this.pillarLabels[pillar].padEnd(25);
      const countStr = String(count).padStart(2);
      const percStr = `${percentage}%`.padStart(4);
      const targetStr = `${target}%`;

      let diffStr = "";
      if (diff > 0) {
        diffStr = ` (+${diff}%)`;
      } else if (diff < 0) {
        diffStr = ` (${diff}%)`;
      }

      console.log(`   ${icon} ${label} ${countStr} (${percStr} vs ${targetStr} target)${diffStr}`);
    }

    console.log("");
    console.log(`   Total active ideas: ${totalActive}`);
    console.log("");
  }

  displayChannelCadence() {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("📅 Channel Cadence");
    console.log("═══════════════════════════════════════════════════════════\n");

    this.displayLinkedInCadence();
    this.displayNewsletterCadence();
  }

  displayLinkedInCadence() {
    console.log("   LinkedIn (target: 2-3 posts/week)");
    console.log("   ─────────────────────────────────");

    const postedLinkedIn = this.linkedin.filter(
      (item) => item.frontmatter?.status === "posted"
    );

    if (postedLinkedIn.length === 0) {
      console.log("   ⚠ No LinkedIn posts marked as posted yet.\n");
      return;
    }

    // Extract dates from posted LinkedIn files
    const postDates = [];
    for (const post of postedLinkedIn) {
      // Try to extract date from frontmatter posted_date or filename
      let postDate = null;

      if (post.frontmatter?.posted_date) {
        postDate = new Date(post.frontmatter.posted_date);
      } else {
        // Extract from filename (format: YYYY-MM-slug)
        const dateMatch = post.fileName.match(/^(\d{4})-(\d{2})/);
        if (dateMatch) {
          const year = parseInt(dateMatch[1]);
          const month = parseInt(dateMatch[2]);
          postDate = new Date(year, month - 1, 15); // Use mid-month as estimate
        }
      }

      if (postDate && !isNaN(postDate.getTime())) {
        postDates.push(postDate);
      }
    }

    if (postDates.length === 0) {
      console.log("   ⚠ Could not determine posting dates.\n");
      return;
    }

    // Find most recent post date
    const mostRecentDate = new Date(Math.max(...postDates));
    const now = new Date();
    const daysSinceLastPost = Math.floor(
      (now - mostRecentDate) / (1000 * 60 * 60 * 24)
    );

    // Calculate posts this month
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const postsThisMonth = postDates.filter((date) => {
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;

    // Display status
    const lastPostStr = mostRecentDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    let statusIcon = "✓";
    let statusMessage = "";

    if (daysSinceLastPost > 7) {
      statusIcon = "🔴";
      statusMessage = " — overdue, post urgently!";
    } else if (daysSinceLastPost > 3) {
      statusIcon = "⚠";
      statusMessage = " — time to post soon";
    }

    console.log(`   ${statusIcon} Last post: ${lastPostStr} (${daysSinceLastPost} days ago)${statusMessage}`);
    console.log(`   📊 Posts this month: ${postsThisMonth}`);

    // Calculate weekly rate for current month
    const dayOfMonth = now.getDate();
    const weeksElapsed = Math.max(1, Math.ceil(dayOfMonth / 7));
    const weeklyRate = (postsThisMonth / weeksElapsed).toFixed(1);

    if (postsThisMonth > 0) {
      console.log(`   📈 Rate: ~${weeklyRate} posts/week this month`);
    }

    console.log("");
  }

  displayNewsletterCadence() {
    console.log("   Newsletter (target: bi-weekly)");
    console.log("   ─────────────────────────────");

    if (this.newsletter.length === 0) {
      console.log("   📭 Newsletter pipeline not started yet.\n");
      return;
    }

    // Find published newsletters
    const publishedNewsletters = this.newsletter.filter(
      (item) =>
        item.frontmatter?.status === "published" ||
        item.frontmatter?.status === "sent"
    );

    if (publishedNewsletters.length === 0) {
      console.log("   ⚠ No newsletters published yet.");
      console.log(`   📝 ${this.newsletter.length} issue(s) in progress\n`);
      return;
    }

    // Extract dates from published newsletters
    const issueDates = [];
    for (const issue of publishedNewsletters) {
      let issueDate = null;

      if (issue.frontmatter?.issue_date) {
        // Parse DD/MM/YYYY format
        const dateParts = issue.frontmatter.issue_date.split("/");
        if (dateParts.length === 3) {
          issueDate = new Date(
            parseInt(dateParts[2]),
            parseInt(dateParts[1]) - 1,
            parseInt(dateParts[0])
          );
        }
      } else if (issue.frontmatter?.published_at) {
        issueDate = new Date(issue.frontmatter.published_at);
      }

      if (issueDate && !isNaN(issueDate.getTime())) {
        issueDates.push(issueDate);
      }
    }

    if (issueDates.length === 0) {
      console.log("   ⚠ Could not determine newsletter dates.\n");
      return;
    }

    // Find most recent issue date
    const mostRecentDate = new Date(Math.max(...issueDates));
    const now = new Date();
    const daysSinceLastIssue = Math.floor(
      (now - mostRecentDate) / (1000 * 60 * 60 * 24)
    );

    const lastIssueStr = mostRecentDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    let statusIcon = "✓";
    let statusMessage = "";

    if (daysSinceLastIssue > 21) {
      statusIcon = "🔴";
      statusMessage = " — significantly overdue!";
    } else if (daysSinceLastIssue > 14) {
      statusIcon = "⚠";
      statusMessage = " — next issue due";
    }

    console.log(`   ${statusIcon} Last issue: ${lastIssueStr} (${daysSinceLastIssue} days ago)${statusMessage}`);
    console.log(`   📊 Total issues published: ${publishedNewsletters.length}`);

    // Show drafts in progress
    const draftsInProgress = this.newsletter.filter(
      (item) =>
        item.frontmatter?.status === "draft" ||
        item.frontmatter?.status === "in_progress"
    ).length;

    if (draftsInProgress > 0) {
      console.log(`   📝 Issues in progress: ${draftsInProgress}`);
    }

    console.log("");
  }

  displayStaleItems() {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("⏰ Stale Items (drafting for 30+ days)");
    console.log("═══════════════════════════════════════════════════════════\n");

    const staleItems = [];
    const now = new Date();

    for (const idea of this.ideas) {
      if (idea.frontmatter?.status !== "drafting") continue;

      // Extract date from id (format: YYYY-MM-slug)
      const id = idea.frontmatter?.id || idea.fileName;
      const dateMatch = id.match(/^(\d{4})-(\d{2})/);

      if (dateMatch) {
        const year = parseInt(dateMatch[1]);
        const month = parseInt(dateMatch[2]);
        const ideaDate = new Date(year, month - 1, 1);
        const daysSince = Math.floor((now - ideaDate) / (1000 * 60 * 60 * 24));

        if (daysSince >= this.staleDays) {
          staleItems.push({
            id,
            pillar: idea.frontmatter?.pillar || "unknown",
            daysSince,
            filePath: idea.filePath,
          });
        }
      }
    }

    if (staleItems.length === 0) {
      console.log("   No stale items found. 🎉\n");
    } else {
      staleItems.sort((a, b) => b.daysSince - a.daysSince);

      for (const item of staleItems) {
        const pillarLabel = this.pillarLabels[item.pillar] || item.pillar;
        console.log(`   ⚠ ${item.id}`);
        console.log(`     Pillar: ${pillarLabel}`);
        console.log(`     Age: ${item.daysSince} days in drafting`);
        console.log("");
      }
    }
  }

  displaySuggestedActions() {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("💡 Suggested Next Actions");
    console.log("═══════════════════════════════════════════════════════════\n");

    // Find ideas ready for drafting (have pillar and target_audience)
    const readyForDrafting = [];
    for (const idea of this.ideas) {
      if (idea.frontmatter?.status !== "idea") continue;

      const hasRequirements =
        idea.frontmatter?.pillar &&
        idea.frontmatter?.target_audience;

      if (hasRequirements) {
        readyForDrafting.push({
          id: idea.frontmatter?.id || idea.fileName,
          pillar: idea.frontmatter?.pillar,
          title: this.extractTitle(idea),
        });
      }
    }

    if (readyForDrafting.length > 0) {
      console.log("   📝 Ideas ready for drafting:");
      for (const item of readyForDrafting.slice(0, 5)) {
        const pillarLabel = this.pillarLabels[item.pillar] || item.pillar;
        console.log(`      • ${item.id} (${pillarLabel})`);
        if (item.title) {
          console.log(`        "${item.title}"`);
        }
      }
      if (readyForDrafting.length > 5) {
        console.log(`      ... and ${readyForDrafting.length - 5} more`);
      }
      console.log("");
    }

    // Find pillars needing more ideas
    const pillarCounts = {};
    let totalActive = 0;

    for (const pillar of Object.keys(this.pillarTargets)) {
      pillarCounts[pillar] = 0;
    }

    for (const idea of this.ideas) {
      if (idea.frontmatter?.status === "archived") continue;
      const pillar = idea.frontmatter?.pillar;
      if (pillar && pillarCounts.hasOwnProperty(pillar)) {
        pillarCounts[pillar]++;
        totalActive++;
      }
    }

    const underrepresentedPillars = [];
    for (const [pillar, target] of Object.entries(this.pillarTargets)) {
      const count = pillarCounts[pillar];
      const percentage = totalActive > 0 ? Math.round((count / totalActive) * 100) : 0;
      const diff = percentage - target;

      if (diff < -10) {
        underrepresentedPillars.push({
          pillar,
          label: this.pillarLabels[pillar],
          current: percentage,
          target,
          gap: Math.abs(diff),
        });
      }
    }

    if (underrepresentedPillars.length > 0) {
      underrepresentedPillars.sort((a, b) => b.gap - a.gap);
      console.log("   🎯 Pillars needing more ideas:");
      for (const item of underrepresentedPillars) {
        console.log(`      • ${item.label}: ${item.current}% vs ${item.target}% target (-${item.gap}%)`);
      }
      console.log("");
    }

    // Show drafts that might be ready for publishing
    const draftsPotentiallyReady = [];
    for (const draft of this.drafts) {
      const status = draft.frontmatter?.status;
      if (status === "draft" && draft.frontmatter?.title) {
        draftsPotentiallyReady.push({
          title: draft.frontmatter.title,
          slug: draft.frontmatter?.slug || draft.fileName,
          filePath: draft.filePath,
        });
      }
    }

    if (draftsPotentiallyReady.length > 0) {
      console.log("   📄 Drafts to review for publishing:");
      for (const item of draftsPotentiallyReady.slice(0, 5)) {
        console.log(`      • ${item.title}`);
        console.log(`        ${item.filePath}`);
      }
      if (draftsPotentiallyReady.length > 5) {
        console.log(`      ... and ${draftsPotentiallyReady.length - 5} more`);
      }
      console.log("");
    }

    if (
      readyForDrafting.length === 0 &&
      underrepresentedPillars.length === 0 &&
      draftsPotentiallyReady.length === 0
    ) {
      console.log("   No specific actions suggested at this time.\n");
    }
  }

  extractTitle(idea) {
    // Try to extract a title from the idea content or frontmatter
    if (idea.frontmatter?.title) {
      return idea.frontmatter.title;
    }

    // Could also parse the markdown for a first heading, but keeping it simple
    return null;
  }

  displayBacklogPriorities() {
    console.log("═══════════════════════════════════════════════════════════");
    console.log("📋 Backlog Priorities");
    console.log("═══════════════════════════════════════════════════════════\n");

    const backlogPath = path.join(process.cwd(), "docs/operations/backlog.md");

    if (!fs.existsSync(backlogPath)) {
      console.log("   Backlog file not found at docs/operations/backlog.md\n");
      return;
    }

    try {
      const content = fs.readFileSync(backlogPath, "utf8");
      const highPriorityItems = this.extractHighPriorityItems(content);

      if (highPriorityItems.length === 0) {
        console.log("   No high-priority items in backlog.\n");
        return;
      }

      console.log("   High priority items from Next Up:\n");
      for (const item of highPriorityItems) {
        console.log(`   🔸 ${item.task}`);
        if (item.file) {
          console.log(`      File: ${item.file}`);
        }
        if (item.notes) {
          console.log(`      Notes: ${item.notes}`);
        }
        console.log("");
      }
    } catch (error) {
      console.log(`   Could not read backlog: ${error.message}\n`);
    }
  }

  extractHighPriorityItems(content) {
    const items = [];

    // Find the "Next Up" section
    const nextUpMatch = content.match(/## Next Up[\s\S]*?(?=\n---|\n## |$)/);
    if (!nextUpMatch) {
      return items;
    }

    const nextUpSection = nextUpMatch[0];

    // Parse table rows (skip header and separator rows)
    const lines = nextUpSection.split("\n");
    let inTable = false;

    for (const line of lines) {
      // Detect table start
      if (line.includes("| Priority |") || line.includes("|-------")) {
        inTable = true;
        continue;
      }

      // Parse table rows
      if (inTable && line.startsWith("|")) {
        const cells = line
          .split("|")
          .map((cell) => cell.trim())
          .filter((cell) => cell.length > 0);

        if (cells.length >= 2) {
          const priority = cells[0];
          const task = cells[1];
          const file = cells[2] || null;
          const notes = cells[3] || null;

          // Only include High priority items
          if (priority === "High" && task && task !== "—") {
            items.push({
              priority,
              task,
              file: file && file !== "—" ? file.replace(/`/g, "") : null,
              notes: notes && notes !== "—" ? notes : null,
            });
          }
        }
      }
    }

    return items;
  }
}

if (require.main === module) {
  const manager = new PipelineManager();
  manager.showPipelineStatus().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

module.exports = PipelineManager;
