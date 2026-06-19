---
title: 'Search'
description: 'Full-text search powered by Pagefind with a custom modal UI.'
pubDate: 'Jun 19 2026'
tags: [docs, features]
---

Full-text search powered by [Pagefind](https://pagefind.app/), with a custom modal UI.

## How It Works

### Build-Time Indexing

1. The `astro-pagefind` integration runs during the Astro build
2. After build completes (`astro:build:done` hook), Pagefind CLI runs again on the output directory
3. Logging level is passed through from the Astro logger configuration

### Client-Side Loading

In `BaseLayout.astro`, Pagefind is loaded lazily:

```js
if (!window.pagefind) {
  const pagefind = await import('/pagefind/pagefind.js')
  pagefind.init()
  window.pagefind = pagefind
}
```

### Components

All in `src/theme/components/astro/Pagefind/`:

| Component | Description |
|---|---|
| `PagefindSearchModal` | Full-screen modal with search input and results |
| `PagefindSearchButton` | Button that opens the modal |
| `PagefindSearchInput` | Search text input |
| `PagefindSearchResults` | Results list container |
| `PagefindSearchResultItem` | Individual search result |

## Pages Indexed

Blog posts marked with `data-pagefind-body` attribute are indexed. This is controlled by the `enablePagefind` prop in `BlogPostLayout` (defaults to `true`).
