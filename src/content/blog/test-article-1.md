---
title: Test Article 1 - Root Level
description: Testing relative markdown links in root directory
publishDate: 2025-01-28
tags: [test, markdown, links]
---

# Test Article 1

This is a test article in the blog root directory to test relative markdown link conversion.

## Links to Other Articles

### Basic Relative Links

- Link to article 2 in subdirectory: [Test Article 2](./test/test-article-2.md)
- Link to article 3 with special characters: [Test Article 3 中文](./test/test-article-3-中文.md)

### Links with Query Parameters and Anchors

- Link with anchor: [Test Article 2 - Section 1](./test/test-article-2.md#section-1)
- Link with query parameter: [Test Article 2 with query](./test/test-article-2.md?highlight=test)
- Link with both: [Test Article 2 - Full](./test/test-article-2.md?page=1#section-2)

### Self-referencing Link

- Link to itself: [Back to this article](./test-article-1.md)

## Expected Behavior

When `slugifyArticleUrl` is enabled:
- `./test/test-article-2.md` → `/blog/test/test-article-2`
- `./test/test-article-3-中文.md` → `/blog/test/test-article-3-zhong-wen`

When `slugifyArticleUrl` is disabled:
- Links should preserve original paths (without .md extension)

## More Content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is test content to make the article more realistic.
