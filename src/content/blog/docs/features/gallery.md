---
title: 'Gallery'
description: 'Markdown-driven gallery system with automatic image extraction, adaptive grid, lightbox, and thumbnails.'
pubDate: 'Jun 19 2026'
tags: [docs, features]
---

A markdown-driven gallery system. Gallery albums are authored as plain markdown files â€?no separate JSON or YAML config needed.

## Content Source

Gallery files live in `src/content/gallery/` as `.md` files:

```md
## Travel

![Sunset](images/sunset.jpg)
![Beach](images/beach.jpg)

## Food

![Pizza](images/pizza.jpg)
```

Each H2 heading creates a named section in the gallery. Images without a preceding H2 go into a default section.

## How It Works

The `GalleryHelper` class (`src/theme/utils/gallery.ts`) parses the markdown AST using `remark()`:

1. Parses markdown body into an AST via `remark().parse()`
2. Visits all `heading` (depth 2) and `image` nodes
3. Groups images under their preceding H2 section headings
4. Resolves relative image paths to absolute filesystem paths
5. Computes SHA-256 content hashes for deduplication and cache-busting filenames

## Image Processing

Local images are processed through `sharp`:

- Original images served at `/gallery/_images/[...slug]`
- Thumbnails generated at configurable size (default 384px) and format (WebP or AVIF)
- Thumbnail URLs follow the pattern: `{hash}_{size}x.{format}`
- Remote (HTTP) images are used directly without processing

## Adaptive Image Grid

The `AdaptiveImageList` SolidJS component (`src/theme/components/solid/AdaptiveImageList/`) renders a responsive grid:

- Dynamic column layout based on container width
- Images fill their cells without cropping
- Transition animations on layout changes

## Lightbox

Fancybox (`@fancyapps/ui`) integration for full-screen image viewing. Click any gallery image to open the lightbox navigator.

## Pages

| Route | Description |
|---|---|
| `/gallery` | Gallery index â€?grid of albums with cover images and image counts |
| `/gallery/[...slug]` | Single album view |
| `/gallery/_images/[...slug]` | Image serving endpoint (processed originals) |
| `/viewer/image` | Standalone full-screen image viewer |
