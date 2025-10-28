---
title: Test Article 2 - Subdirectory
description: Testing relative markdown links from subdirectory
publishDate: 2025-01-28
tags: [test, subdirectory, navigation]
---

# Test Article 2

This is a test article in the `blog/test` subdirectory.

## Section 1

Testing relative links from a subdirectory back to parent directory.

### Links to Parent Directory

- Link back to article 1: [Test Article 1](../test-article-1.md)
- Link to sibling article: [Test Article 3](./test-article-3-中文.md)

### Links with Anchors

- Link to article 1 with anchor: [Article 1 - Expected Behavior](../test-article-1.md#expected-behavior)

## Section 2

More content for testing anchor links.

### Path Navigation Tests

- Parent directory link: [Back to root article](../test-article-1.md)
- Same directory link: [Sibling article](./test-article-3-中文.md)
- Self link: [This article](./test-article-2.md)

## Expected Conversion

When this article links to `../test-article-1.md`, it should convert to:
- With slugify: `/blog/test-article-1`
- Without slugify: `/blog/test-article-1`

When linking to `./test-article-3-中文.md`:
- With slugify: `/blog/test/test-article-3-zhong-wen`
- Without slugify: `/blog/test/test-article-3-中文`

## Content

This article contains test content to demonstrate the relative markdown links plugin functionality.
