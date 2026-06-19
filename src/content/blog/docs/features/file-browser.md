---
title: 'File Browser'
description: 'Browse local directories through the browser with file listing, thumbnails, and image preview.'
pubDate: 'Jun 19 2026'
tags: [docs, features]
---

Browse a local directory through the browser with automatic file listing, thumbnails, and image preview.

## Setup

Configure the share directory in `astro.config.ts`:

```ts
customPages: {
  shareDirectory: new URL('./src/content/share', import.meta.url),
}
```

This enables routes only when the config is present â€?no extra setup needed.

## How It Works

### Directory Scanning (`src/theme/utils/get-all-files.ts`)

Recursively reads the configured directory, building an abstract file tree:

```ts
interface AbstractFile {
  name: string
  type: 'file' | 'directory'
  children?: AbstractFile[]
  url?: string
  thumbnailUrl?: string
}
```

### Thumbnail Generation

Image files (jpg, png, webp, gif, etc.) get automatic thumbnails:

- Generated via `sharp` at build time (size: 80px)
- Served at `/share/thumbnail/[...slug]`
- Cached and content-addressed by SHA-256 hash

### File Serving

Files are served via `/share/files/[...slug]` â€?acts as a static file proxy for the share directory.

## Pages

| Route | Description |
|---|---|
| `/browse` | Root directory listing |
| `/browse/[...slug]` | Subdirectory listing |
| `/share/files/[...slug]` | File download/serve endpoint |
| `/share/thumbnail/[...slug]` | Thumbnail image endpoint |

## Features

- Directories listed first, sorted alphabetically
- Image files show thumbnail previews
- Non-image files show file type icons
- Breadcrumb navigation for deep directories
- Responsive grid layout (`BrowseLayout`)
