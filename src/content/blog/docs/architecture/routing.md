---
title: 'Routing'
description: 'Complete route table for the theme - all injected routes and their purposes.'
pubDate: 'Jun 19 2026'
tags: [docs, architecture]
---

All routes are injected programmatically by the Astro integration in `src/theme/index.ts` via `injectRoute()`.

## Route Table

| Pattern | Entry Point | Condition |
|---|---|---|
| `/` | `src/theme/pages/index.astro` | Always |
| `/blog/[...slug]` | `src/theme/pages/blog/[...slug].astro` | Always |
| `/embed/blog/[...slug]` | `src/theme/pages/embed/blog/[...slug].astro` | Always |
| `/archive` | `src/theme/pages/archive/index.astro` | Always |
| `/tags/[...slug]` | `src/theme/pages/tags/[...slug].astro` | Always |
| `/finder` | `src/theme/pages/finder/index.astro` | Always |
| `/gallery` | `src/theme/pages/gallery/index.astro` | Always |
| `/gallery/[...slug]` | `src/theme/pages/gallery/[...slug].astro` | Always |
| `/gallery/_images/[...slug]` | `src/theme/pages/gallery/_images/[...slug].ts` | Always |
| `/friend-links/` | `src/theme/pages/friend-links/index.astro` | Always |
| `/collection` | `src/theme/pages/collection/index.astro` | Always |
| `/collection/[...slug]` | `src/theme/pages/collection/[...slug].astro` | Always |
| `/viewer/image` | `src/theme/pages/viewer/image.astro` | Always |
| `/images/[...id]` | `src/theme/pages/public/images/[...id].ts` | Always |
| `/robots.txt` | `src/theme/pages/robots.txt.ts` | Always |
| `/rss.xml` | `src/theme/pages/rss.xml.ts` | Always |
| `/browse` | `src/theme/pages/browse/index.astro` | `customPages.shareDirectory` set |
| `/browse/[...slug]` | `src/theme/pages/browse/[...slug].astro` | `customPages.shareDirectory` set |
| `/share/files/[...slug]` | `src/theme/pages/share/files/[...slug].ts` | `customPages.shareDirectory` set |
| `/share/thumbnail/[...slug]` | `src/theme/pages/share/thumbnail/[...slug].ts` | `customPages.shareDirectory` set |

## Route Types

### `.astro` Pages
Standard Astro page components with HTML templates and server-side rendering.

### `.ts` API Routes
TypeScript-only endpoints for dynamic content:

| Endpoint | Purpose |
|---|---|
| `gallery/_images/[...slug].ts` | Serve processed gallery images (WebP, thumbnails) |
| `public/images/[...id].ts` | Serve processed images (background, avatar, friends) |
| `share/files/[...slug].ts` | Serve raw share directory files |
| `share/thumbnail/[...slug].ts` | Serve share directory thumbnails |
| `robots.txt.ts` | Generate dynamic robots.txt |
| `rss.xml.ts` | Generate RSS feed |

## User Pages

User-authored pages go in `src/pages/` (e.g., `src/pages/about-me.md`). These are not injected by the theme â€?they are standard Astro pages that the build system discovers automatically.
