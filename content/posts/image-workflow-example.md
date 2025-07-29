---
title: Working with Images in Ghost
slug: working-with-images-ghost
status: draft
visibility: public
featured: false
meta_title: How to Handle Images in Self-Hosted Ghost CMS
meta_description: Learn how to work with images when using Ghost's native file storage in a self-hosted environment.
feature_image: https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600
excerpt: Best practices for handling images with Ghost's built-in file storage system.
tags:
  - Tutorial
  - Images
  - Ghost
authors:
  - ghost
---

# Working with Images in Self-Hosted Ghost

Since you're self-hosting Ghost, you can take advantage of Ghost's built-in file storage system for handling images and media.

## Ghost's Native Image Handling

Ghost provides excellent built-in image management:

- **Direct upload** via the Ghost editor
- **Drag & drop** functionality  
- **Automatic optimization** and resizing
- **Built-in CDN** capabilities (if configured)
- **Version management** and backup

## Upload Methods

### 1. Ghost Editor Upload
The easiest way is to upload images directly in the Ghost editor:
1. Open your post in Ghost Admin
2. Click the image icon or drag & drop
3. Images are automatically optimized and stored

### 2. Featured Images
Set featured images in your frontmatter using Ghost URLs:

```yaml
---
title: My Post
feature_image: https://yoursite.com/content/images/2024/01/featured.jpg
---
```

### 3. Bulk Upload via Ghost Admin
For multiple images:
1. Go to Ghost Admin → Settings → Labs
2. Use the import functionality for bulk uploads
3. Or upload via the file manager if available

## Best Practices for Self-Hosted Ghost

### Image Optimization
- **Enable image optimization** in Ghost settings
- **Configure responsive images** for different screen sizes
- **Set up a CDN** (CloudFlare, AWS CloudFront) for better performance
- **Monitor storage space** and set up automated backups

### File Organization
Ghost automatically organizes files by date:
```
/content/images/
├── 2024/
│   ├── 01/
│   ├── 02/
│   └── ...
├── 2023/
└── ...
```

### Storage Configuration
Configure your Ghost installation for optimal file handling:

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

## External Image References

You can still reference external images:

```markdown
![External Image](https://images.unsplash.com/photo-123/image.jpg)
```

Or use services like:
- **Unsplash** - Free stock photos
- **Cloudinary** - Advanced image management
- **AWS S3** - Scalable storage

## Workflow Tips

1. **Upload first, write later**: Upload images to Ghost Admin first, then reference the URLs
2. **Use descriptive alt text**: Always include meaningful alt text for accessibility
3. **Optimize before upload**: Compress images before uploading to save storage
4. **Backup regularly**: Include `/content/images/` in your backup strategy
5. **Monitor storage**: Keep an eye on disk usage as your image library grows

## Image URLs in Content

Once uploaded to Ghost, reference images using their full URLs:

```markdown
![My Screenshot](https://yoursite.com/content/images/2024/01/screenshot.png)
```

Ghost automatically handles:
- ✅ Image optimization
- ✅ Responsive sizing  
- ✅ Fast delivery
- ✅ Backup and storage
- ✅ Security and access control

---

*With Ghost's native storage, you get enterprise-grade image handling without the complexity of external services!*