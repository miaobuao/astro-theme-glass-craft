---
title: Edge Cases Testing
description: Testing various edge cases for relative markdown links
publishDate: 2025-01-28
tags: [test, edge-cases, validation]
---

# Edge Cases Testing

This article tests various edge cases and special scenarios.

## Valid Relative Links (Should Convert)

### Basic Relative Links
- Simple relative: [Article 1](./test-article-1.md)
- With subdirectory: [Article 2](./test/test-article-2.md)
- Parent directory: [From here](../blog/test-article-1.md) (if valid)

### Links with Query Parameters
- Query string: [Article with query](./test-article-1.md?page=2)
- Multiple params: [Multiple params](./test-article-1.md?page=2&highlight=true)

### Links with Anchors
- Simple anchor: [To section](./test-article-1.md#expected-behavior)
- Query and anchor: [Both](./test-article-1.md?page=1#section)

### Complex Paths
- Multiple levels: [Deep link](./test/test-article-2.md)
- Parent navigation: [Up one level](./test-article-1.md)

## Invalid Links (Should NOT Convert)

### Absolute URLs
- External link: [Google](https://google.com)
- HTTPS link: [Example](https://example.com/page.md)

### Absolute Paths
- Root path: [Root](/blog/test-article-1.md)
- System path: [System](/content/blog/test.md)

### Non-Markdown Links
- HTML link: [HTML file](./test.html)
- PDF link: [PDF document](./document.pdf)
- Image link: [Image](./image.jpg)
- No extension: [No ext](./test-article-1)

### Empty or Special Links
- Empty: [Empty]()
- Just anchor: [Anchor](#section)
- Just query: [Query](?page=1)

## Mixed Content

Here's a paragraph with multiple link types:
- Regular markdown link to [Test Article 1](./test-article-1.md)
- External link to [GitHub](https://github.com)
- Image: ![test image](./test.png)
- Code with `.md`: `./test-article-1.md` (should not convert)

### Code Blocks (Should NOT Convert)

```markdown
[This link](./test-article-1.md) is in a code block
```

```javascript
const link = './test-article-1.md'
```

## Special Characters in Links

- Spaces: [Article with spaces](./test article 1.md) (if file exists)
- Special chars: [Special](./test-article@123.md) (if file exists)
- Unicode: [Chinese](./test/test-article-3-中文.md)

## Expected Plugin Behavior

The plugin should:
1. ✅ Convert relative `.md` and `.mdx` links
2. ✅ Preserve query parameters and anchors
3. ✅ Apply slugify based on config
4. ❌ Ignore absolute URLs
5. ❌ Ignore absolute paths
6. ❌ Ignore non-markdown files
7. ❌ Ignore links in code blocks
8. ❌ Ignore inline code

## Navigation

- [Back to Article 1](./test-article-1.md)
- [To Article 2](./test/test-article-2.md)
- [To Article 3](./test/test-article-3-中文.md)
