---
title: 'Comments'
description: 'Giscus comment system integration powered by GitHub Discussions.'
pubDate: 'Jun 19 2026'
tags: [docs, features]
---

Integrated [Giscus](https://giscus.app) comment system powered by GitHub Discussions.

## Configuration

Add Giscus config under `comment.giscus`:

```ts
comment: {
  giscus: {
    repo: 'owner/repo',
    repoId: 'R_kg...',
    categoryId: 'DIC_...',
    mapping: 'og:title',
    strict: '0',
    reactionsEnabled: '1',
    inputPosition: 'top',
    theme: 'preferred_color_scheme',
    lang: 'zh-CN',
    loading: 'eager',
  },
}
```

## Implementation

The `<Giscus>` Astro component (`src/theme/components/astro/Giscus.astro`) renders the `<giscus-widget>` web component. It imports the `giscus` npm package on the client side.

Comments appear in `BlogPostLayout` and `BlogPostEmbedLayout` (embedded blog view), below the article content in a glassmorphism-styled container.
