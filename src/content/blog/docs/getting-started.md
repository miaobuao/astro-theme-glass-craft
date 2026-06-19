---
title: 'Getting Started'
description: 'Quick start guide for Astro Theme Glass Craft - installation, configuration, and adding content.'
pubDate: 'Jun 19 2026'
tags: [docs]
---

## Prerequisites

- Node.js 22+
- pnpm (recommended) or npm

## Installation

Create a new Astro project with the theme:

```bash
# Create a new project
git clone <theme-repo> my-site
cd my-site

# Install dependencies
pnpm install
```

## Configuration

Edit `astro.config.ts` to configure the theme:

```ts
// astro.config.ts
import { defineConfig } from 'astro/config'
import theme from './src/theme'

export default defineConfig({
  site: 'https://example.com',
  integrations: [
    theme({
      title: 'My Site',
      slugifyArticleUrl: true,
      author: {
        name: 'Your Name',
        avatar: {
          type: 'common',
          url: new URL('https://example.com/avatar.jpg'),
        },
        signature: 'Your tagline',
      },
    }),
  ],
})
```

## Adding Content

### Blog Posts

Create markdown files in `src/content/blog/`:

```md
---
title: My First Post
date: 2025-01-01
tags: [tech, tutorial]
---

Content here...

<!--more-->

This part after the excerpt marker is hidden from previews.
```

Subdirectories become tags automatically. If `date` is omitted, the theme falls back to Git commit dates.

### Gallery

Create markdown files in `src/content/gallery/`:

```md
## Section Name

![Description](images/photo.jpg)
```

Images are automatically extracted, thumbnailed, and displayed in an adaptive grid.

### Share Directory (File Browser)

Point to a local directory in config:

```ts
customPages: {
  shareDirectory: new URL('./src/content/share', import.meta.url),
}
```

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

The build generates all pages, RSS feed, sitemap, Pagefind search index, and processed images.
