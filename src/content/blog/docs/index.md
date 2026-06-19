---
title: 'Astro Theme Glass Craft Documentation'
description: 'A feature-rich Astro theme with glassmorphism design, packaged as a reusable Astro integration. Built with Astro v5, Tailwind CSS v4, and SolidJS.'
pubDate: 'Jun 19 2026'
tags: [docs]
---

A feature-rich Astro theme with **glassmorphism design**, packaged as a reusable Astro integration. Built with Astro v5, Tailwind CSS v4, and SolidJS.

## Quick Links

- [Getting Started](getting-started.md)
- [Configuration Reference](configuration.md)
- [Customization Guide](customization.md)

## Features

| Feature | Description |
|---|---|
| [**Blog System**](features/blog-system.md) | Markdown/MDX articles, automatic frontmatter fallback (git dates, H1 title, excerpt), tag categorization, archive, RSS |
| [**Gallery**](features/gallery.md) | Markdown-as-source gallery, automatic image extraction, adaptive grid layout, Fancybox lightbox, thumbnail generation |
| [**File Browser**](features/file-browser.md) | Browse local share directories, automatic thumbnails, image preview, file sorting |
| [**Window Manager**](features/window-manager.md) | Desktop-like floating windows (draggable, resizable, dockable) with iframe content �?blog posts open as windows |
| [**Image Processing**](features/image-processing.md) | Progressive image loading, SHA-256 content-hash deduplication, Sharp-powered thumbnail pipeline, WebP/AVIF conversion |
| [**Markdown Enhancements**](features/markdown-enhancements.md) | KaTeX math, GitHub-style admonitions, custom info/warning/error directives, footnotes, colorized code brackets, auto-linked headings |
| [**Search**](features/search.md) | Pagefind full-text search with custom modal UI, lazy-loaded, post-build indexing |
| [**Comments**](features/comments.md) | Giscus integration (GitHub Discussions) |
| [**Scroll Progress**](features/scroll-progress.md) | Ball or line indicator, customizable, animated |
| [**Internationalization**](features/internationalization.md) | Path-key-based translation system, browser locale detection, extensible lang packs |
| [**Social Features**](features/social-features.md) | Friend links page, social links, RSS feed, sitemap |
| [**Navigation & Layout**](features/navigation-and-layout.md) | Responsive sidebar/bottom-nav, sticky toolbar, adaptive icon states, Finder mobile launcher |

## Architecture

| Document | Description |
|---|---|
| [**Astro Integration**](architecture/astro-integration.md) | Theme as a reusable integration, virtual module for config, route injection |
| [**Content Collections**](architecture/content-collections.md) | Blog and gallery collection schemas and loaders |
| [**Routing**](architecture/routing.md) | All injected routes and their purposes |
| [**Glassmorphism Design**](architecture/glassmorphism-design.md) | CSS utility system, Tailwind v4 config, responsive patterns |
| [**Remark Plugins**](architecture/remark-plugins.md) | Custom remark/rehype plugins for directives and relative links |

## Project Structure

```
src/
├── content/                    # User content (blog, gallery, share)
├── content.config.ts           # Content collection definitions
├── plugins/                    # Custom remark plugins
�?  └── remark/
├── theme/                      # Core theme code
�?  ├── index.ts                # Astro integration entry
�?  ├── config.ts               # TypeScript config types
�?  ├── consts.ts               # Runtime config deserialization
�?  ├── assets/css/global.css   # Tailwind entry + utilities
�?  ├── components/
�?  �?  ├── astro/              # Server-rendered Astro components
�?  �?  └── solid/              # Client-side SolidJS islands
�?  �?      ├── WindowManager/  # Desktop window system
�?  �?      └── AdaptiveImageList/ # Gallery layout engine
�?  ├── i18n/                   # Internationalization
�?  ├── layouts/                # Page layouts
�?  ├── pages/                  # All route pages
�?  └── utils/                  # Utility modules
└── pages/                      # User pages (about-me.md)
```
