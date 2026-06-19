---
title: 'Image Processing'
description: 'Build-time image pipeline with progressive loading, thumbnails, content-addressed caching, and format conversion.'
pubDate: 'Jun 19 2026'
tags: [docs, features]
---

A comprehensive build-time image pipeline using `sharp` for progressive loading, thumbnails, content-addressed caching, and format conversion.

## Progressive Image Component

The `<progressive-image>` custom element (`src/theme/components/astro/ProgressiveImage.astro`) loads a tiny thumbnail first, then transitions to the full image:

1. A 12px-wide thumbnail is generated via `sharp`
2. The thumbnail is loaded immediately (small file)
3. Once loaded, the full-resolution image is fetched
4. A CSS transition fades the full image over the thumbnail

Used for background images and configurable for any image via `ProgressiveImage` or `UnionImage` components.

## Thumbnail Pipeline (`src/theme/utils/thumbnail.ts`)

```ts
getThumbnailImage(url, size)   // Resize to max dimension, output WebP
getOriginalImage(url)          // Convert to WebP at original size
getThumbnailImageId(url, ...)  // Generate content-addressed filename
getOriginalImageId(url, ...)   // Generate content-addressed filename
toAbsoluteUrl(id)              // Returns /images/{id}
```

- Default thumbnail size: 12px (for progressive loading placeholders)
- Gallery thumbnail size: configurable (default 384px)
- All images are converted to WebP

## Content-Addressed Storage

Every image gets a SHA-256 hash of its contents as its filename. This provides:

- **Built-in caching**: Same image = same URL = browser cache hit
- **Deduplication**: Identical images (same content) share one processed file
- **Integrity**: Hash-in-filename prevents stale cache issues

## Image Serving Endpoints

| Route | Source | Content |
|---|---|---|
| `/images/[...id]` | `src/theme/pages/public/images/[...id].ts` | Processed public images (background, avatar, friends) |
| `/gallery/_images/[...slug]` | `gallery/_images/[...slug].ts` | Processed gallery images |
| `/share/thumbnail/[...slug]` | `share/thumbnail/[...slug].ts` | Share directory thumbnails |
| `/share/files/[...slug]` | `share/files/[...slug].ts` | Raw share files |

## Image Types

The config system supports two image types:

- **`ProgressiveImage`**: Generates a tiny thumbnail + full image, uses the progressive loading web component
- **`CommonImage`**: Standard `<img>` tag, but still processed through Sharp for WebP conversion
