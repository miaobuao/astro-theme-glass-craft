---
title: 'Social Features'
description: 'Friend links, social links, RSS feed, sitemap, and robots.txt integration.'
pubDate: 'Jun 19 2026'
tags: [docs, features]
---

## Friend Links

Configurable friend links displayed on `/friend-links/`:

```ts
friends: [
  {
    name: 'Friend Name',
    url: 'https://example.com',
    description: 'A short description',
    avatar: { type: 'common', url: new URL('...') },
  },
]
```

Avatars support both progressive and common image types.

## Social Links

Currently supports GitHub:

```ts
socialLinks: {
  github: 'https://github.com/username',
}
```

## RSS Feed

Generated at `/rss.xml` via `@astrojs/rss`. Configuration:

- `rss.content` â€?Include full article content in feed
- `rss.description` â€?Include article description

Both default to off when unset.

## Sitemap

Generated automatically via `@astrojs/sitemap` integration. All prerendered pages are included.

## robots.txt

Dynamically generated at `/robots.txt` based on site configuration.
