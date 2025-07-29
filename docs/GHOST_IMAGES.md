# Working with Images in Self-Hosted Ghost

Since you're self-hosting Ghost, you can leverage Ghost's excellent built-in image management system.

## 🖼️ Ghost's Native Image Handling

Ghost provides enterprise-grade image management out of the box:

- **Direct upload** via the Ghost editor
- **Drag & drop** functionality
- **Automatic optimization** and resizing
- **Responsive image generation**
- **Built-in CDN** capabilities (if configured)
- **Organized file structure** by date

## 📤 Upload Methods

### 1. Ghost Editor (Recommended)
The simplest approach:
1. Write your content in Markdown files
2. Upload images directly in Ghost Admin editor
3. Copy the Ghost URLs back to your Markdown files

### 2. Featured Images
Set featured images in frontmatter using Ghost URLs:

```yaml
---
title: My Post
feature_image: https://yoursite.com/content/images/2024/01/featured.jpg
---
```

### 3. Markdown References
Reference uploaded images in your content:

```markdown
![Alt text](https://yoursite.com/content/images/2024/01/screenshot.png)
```

## 🎯 Recommended Workflow

1. **Write content** in your Markdown files with placeholder image references
2. **Upload images** via Ghost Admin panel
3. **Update Markdown** with the actual Ghost URLs
4. **Push to GitHub** to publish

## 🛠️ Ghost Storage Configuration

### Local File Storage (Default)
```json
// config.production.json
{
  "storage": {
    "active": "LocalFileStorage",
    "LocalFileStorage": {
      "path": "/var/lib/ghost/content/images/"
    }
  }
}
```

### External Storage Options
For scalability, consider:
- **AWS S3** - Unlimited storage
- **Google Cloud Storage** - Cost-effective
- **DigitalOcean Spaces** - Simple setup
- **Cloudinary** - Advanced image management

## 📏 Best Practices

### Image Optimization
- **Enable image processing** in Ghost settings
- **Set up responsive images** for different screen sizes
- **Configure a CDN** (CloudFlare, AWS CloudFront)
- **Monitor storage usage** and set up backups

### File Organization
Ghost automatically organizes files by date:
```
/content/images/
├── 2024/
│   ├── 01/           # January 2024
│   ├── 02/           # February 2024
│   └── ...
├── 2023/
└── size/             # Resized variants
    ├── w600/
    ├── w1000/
    └── w2000/
```

### Performance Tips
1. **Compress images** before upload (use tools like ImageOptim, TinyPNG)
2. **Use appropriate formats**: JPG for photos, PNG for graphics, WebP when possible
3. **Set reasonable dimensions**: Max 1920px width for featured images
4. **Enable image optimization** in Ghost settings

## 🔗 External Image Services

You can still use external services for specific needs:

### Stock Photos
```markdown
![Stock Photo](https://images.unsplash.com/photo-1234567890/image.jpg?w=1200&h=600)
```

### CDN Services
```markdown
![Optimized Image](https://res.cloudinary.com/your-account/image/upload/v1234567890/sample.jpg)
```

## 🚨 Important Notes

- **Backup strategy**: Include `/content/images/` in your Ghost backups
- **Storage monitoring**: Keep an eye on disk usage as your image library grows
- **URL permanence**: Ghost URLs are stable - images won't break when you update posts
- **Security**: Ghost handles image access control and security automatically

## 📋 Quick Reference

### Frontmatter Example
```yaml
---
title: My Blog Post
slug: my-blog-post
feature_image: https://yoursite.com/content/images/2024/01/featured.jpg
---
```

### Markdown Example
```markdown
# My Post

Here's a screenshot of the dashboard:

![Dashboard](https://yoursite.com/content/images/2024/01/dashboard.png)

And here's an external stock photo:

![Team](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800)
```

---

**Advantage**: With Ghost's native storage, you get professional image handling without additional complexity or external dependencies!