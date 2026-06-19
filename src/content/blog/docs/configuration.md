---
title: 'Configuration Reference'
description: 'Complete configuration reference for Astro Theme Glass Craft - all theme options and their types.'
pubDate: 'Jun 19 2026'
tags: [docs]
---

The theme accepts a `ThemeConfig` object passed to the integration function in `astro.config.ts`.

## Basic

| Field | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | â€?| Site title (browser tab, SEO) |
| `description` | `string` | â€?| Site description (SEO meta) |
| `backgroundImage` | `ProgressiveImage \| CommonImage \| false` | Default dog image | Background image. `false` to disable |
| `slugifyArticleUrl` | `boolean` | **required** | Transliterate blog URLs to ASCII |
| `lang` | `'zh' \| 'en'` | â€?| Site language |

## Author

| Field | Type | Required | Description |
|---|---|---|---|
| `author.name` | `string` | Yes | Display name |
| `author.avatar` | `UnionImageType` | Yes | Avatar image |
| `author.email` | `string` | No | Email address |
| `author.signature` | `string` | No | Tagline under name |

## Custom Pages

| Field | Type | Description |
|---|---|---|
| `customPages.aboutMe` | `string` | Path to About Me page (e.g. `/about-me`) |
| `customPages.shareDirectory` | `URL` | `file://` URL to a local directory for file browser |

## Social & Friends

| Field | Type | Description |
|---|---|---|
| `socialLinks.github` | `string` | GitHub profile URL |
| `friends` | `FriendLinkType[]` | Array of friend links with `name`, `url`, `description`, `avatar` |

## Gallery

| Field | Type | Default | Description |
|---|---|---|---|
| `gallery.thumbnail.size` | `number` | `384` | Max dimension for thumbnails (px) |
| `gallery.thumbnail.format` | `'webp' \| 'avif'` | `'webp'` | Thumbnail encoding format |

## Comments

| Field | Type | Description |
|---|---|---|
| `comment.giscus` | `GiscusConfig` | [Giscus widget](https://giscus.app) configuration |

GiscusConfig supports: `repo`, `repoId`, `category`, `categoryId`, `mapping`, `term`, `strict`, `reactionsEnabled`, `emitMetadata`, `inputPosition`, `theme`, `lang`, `loading`.

## RSS

| Field | Type | Default | Description |
|---|---|---|---|
| `rss.content` | `boolean` | â€?| Include full content in RSS |
| `rss.description` | `boolean` | â€?| Include description in RSS |

## Scroll Progress

| Field | Type | Default | Description |
|---|---|---|---|
| `scrollProgress` | `'ball' \| 'line' \| false` | â€?| Scroll progress indicator type |

## Image Types

```ts
interface ProgressiveImage {
  type: 'progressive'
  url: URL        // Source image URL (file:// or http://)
  alt?: string    // Alt text
  loading?: 'eager' | 'lazy'
}

interface CommonImage {
  type: 'common'
  url: URL
  alt?: string
  loading?: 'eager' | 'lazy'
}

type UnionImageType = CommonImage | ProgressiveImage
```
