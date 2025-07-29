#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const frontmatter = require('front-matter');
const yaml = require('js-yaml');

class ContentValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  async validateAllContent() {
    console.log('🔍 Starting content validation...');
    
    try {
      await this.validateContentDirectory('content/posts/**/*.md', 'post');
      await this.validateContentDirectory('content/pages/**/*.md', 'page');
      
      this.printResults();
      
      if (this.errors.length > 0) {
        console.error(`\n❌ Validation failed with ${this.errors.length} error(s)`);
        process.exit(1);
      } else {
        console.log(`\n✅ Validation passed! ${this.warnings.length} warning(s)`);
        process.exit(0);
      }
    } catch (error) {
      console.error('❌ Validation error:', error.message);
      process.exit(1);
    }
  }

  async validateContentDirectory(pattern, type) {
    const files = glob.sync(pattern);
    
    for (const filePath of files) {
      await this.validateFile(filePath, type);
    }
  }

  async validateFile(filePath, type) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { attributes: frontmatterData, body: markdownContent } = frontmatter(content);

      this.validateFrontmatter(frontmatterData, filePath, type);
      this.validateMarkdown(markdownContent, filePath);
      this.validateFileStructure(filePath, type);
      
    } catch (error) {
      this.addError(filePath, `Failed to parse file: ${error.message}`);
    }
  }

  validateFrontmatter(frontmatter, filePath, type) {
    const requiredFields = ['title', 'slug'];
    const optionalFields = [
      'status', 'visibility', 'meta_title', 'meta_description', 
      'feature_image', 'featured', 'excerpt', 'custom_excerpt',
      'created_at', 'updated_at', 'published_at', 'tags', 'authors'
    ];

    for (const field of requiredFields) {
      if (!frontmatter[field]) {
        this.addError(filePath, `Missing required field: ${field}`);
      }
    }

    if (frontmatter.title && typeof frontmatter.title !== 'string') {
      this.addError(filePath, 'Title must be a string');
    }

    if (frontmatter.slug) {
      if (typeof frontmatter.slug !== 'string') {
        this.addError(filePath, 'Slug must be a string');
      } else if (!/^[a-z0-9-]+$/.test(frontmatter.slug)) {
        this.addError(filePath, 'Slug must contain only lowercase letters, numbers, and hyphens');
      }
    }

    if (frontmatter.status && !['draft', 'published', 'scheduled'].includes(frontmatter.status)) {
      this.addError(filePath, 'Status must be one of: draft, published, scheduled');
    }

    if (frontmatter.visibility && !['public', 'members', 'paid'].includes(frontmatter.visibility)) {
      this.addError(filePath, 'Visibility must be one of: public, members, paid');
    }

    if (frontmatter.featured && typeof frontmatter.featured !== 'boolean') {
      this.addError(filePath, 'Featured must be a boolean');
    }

    if (frontmatter.tags) {
      if (!Array.isArray(frontmatter.tags)) {
        this.addError(filePath, 'Tags must be an array');
      } else {
        frontmatter.tags.forEach((tag, index) => {
          if (typeof tag !== 'string') {
            this.addError(filePath, `Tag at index ${index} must be a string`);
          }
        });
      }
    }

    if (frontmatter.authors) {
      if (!Array.isArray(frontmatter.authors)) {
        this.addError(filePath, 'Authors must be an array');
      } else {
        frontmatter.authors.forEach((author, index) => {
          if (typeof author !== 'string') {
            this.addError(filePath, `Author at index ${index} must be a string`);
          }
        });
      }
    }

    if (frontmatter.created_at && !this.isValidDate(frontmatter.created_at)) {
      this.addError(filePath, 'created_at must be a valid ISO date string');
    }

    if (frontmatter.updated_at && !this.isValidDate(frontmatter.updated_at)) {
      this.addError(filePath, 'updated_at must be a valid ISO date string');
    }

    if (frontmatter.published_at && !this.isValidDate(frontmatter.published_at)) {
      this.addError(filePath, 'published_at must be a valid ISO date string');
    }

    if (frontmatter.feature_image && !this.isValidUrl(frontmatter.feature_image)) {
      this.addWarning(filePath, 'feature_image should be a valid URL');
    }

    if (type === 'page' && frontmatter.tags) {
      this.addWarning(filePath, 'Pages do not support tags in Ghost CMS');
    }

    if (type === 'page' && frontmatter.featured) {
      this.addWarning(filePath, 'Pages do not support featured flag in Ghost CMS');
    }

    const unexpectedFields = Object.keys(frontmatter).filter(
      key => ![...requiredFields, ...optionalFields].includes(key)
    );
    
    if (unexpectedFields.length > 0) {
      this.addWarning(filePath, `Unexpected frontmatter fields: ${unexpectedFields.join(', ')}`);
    }
  }

  validateMarkdown(markdown, filePath) {
    if (!markdown || markdown.trim().length === 0) {
      this.addWarning(filePath, 'Markdown content is empty');
    }

    if (markdown.length < 100) {
      this.addWarning(filePath, 'Markdown content is very short (less than 100 characters)');
    }

    const imageMatches = markdown.match(/!\[.*?\]\((.*?)\)/g);
    if (imageMatches) {
      imageMatches.forEach(match => {
        const urlMatch = match.match(/!\[.*?\]\((.*?)\)/);
        if (urlMatch && urlMatch[1] && !this.isValidUrl(urlMatch[1]) && !urlMatch[1].startsWith('/')) {
          this.addWarning(filePath, `Potentially invalid image URL: ${urlMatch[1]}`);
        }
      });
    }

    const linkMatches = markdown.match(/\[.*?\]\((.*?)\)/g);
    if (linkMatches) {
      linkMatches.forEach(match => {
        const urlMatch = match.match(/\[.*?\]\((.*?)\)/);
        if (urlMatch && urlMatch[1] && !this.isValidUrl(urlMatch[1]) && !urlMatch[1].startsWith('/') && !urlMatch[1].startsWith('#')) {
          this.addWarning(filePath, `Potentially invalid link URL: ${urlMatch[1]}`);
        }
      });
    }
  }

  validateFileStructure(filePath, type) {
    const expectedDir = type === 'post' ? 'content/posts' : 'content/pages';
    
    if (!filePath.includes(expectedDir)) {
      this.addError(filePath, `File should be in ${expectedDir} directory`);
    }

    if (!filePath.endsWith('.md')) {
      this.addError(filePath, 'File should have .md extension');
    }

    if (filePath.includes('/drafts/')) {
      this.addWarning(filePath, 'File is in drafts directory and will not be published');
    }

    const fileName = path.basename(filePath, '.md');
    if (!/^[a-z0-9-]+$/.test(fileName)) {
      this.addWarning(filePath, 'Filename should contain only lowercase letters, numbers, and hyphens');
    }
  }

  isValidDate(dateValue) {
    // Handle both string and Date object inputs
    if (dateValue instanceof Date) {
      return !isNaN(dateValue.getTime());
    }
    
    if (typeof dateValue !== 'string') {
      return false;
    }
    
    const date = new Date(dateValue);
    return date instanceof Date && !isNaN(date.getTime()) && dateValue.includes('T');
  }

  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  addError(filePath, message) {
    this.errors.push({ file: filePath, message, type: 'error' });
  }

  addWarning(filePath, message) {
    this.warnings.push({ file: filePath, message, type: 'warning' });
  }

  printResults() {
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errors.forEach(error => {
        console.log(`   ${error.file}: ${error.message}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => {
        console.log(`   ${warning.file}: ${warning.message}`);
      });
    }
  }
}

if (require.main === module) {
  const validator = new ContentValidator();
  validator.validateAllContent().catch(error => {
    console.error('Fatal validation error:', error);
    process.exit(1);
  });
}

module.exports = ContentValidator;