---
title: 'Blog System'
description: 'Markdown/MDX articles with smart frontmatter fallback, tag categorization, archive, and RSS.'
pubDate: 'Jun 19 2026'
tags: [docs, features]
---

Markdown/MDX articles with smart frontmatter fallback, tag categorization, archive, and RSS.

## Content Source

Blog posts live in `src/content/blog/` as `.md` or `.mdx` files. Subdirectories become tags.

```
src/content/blog/
â”œâ”€â”€ tech/
â”?  â”œâ”€â”€ getting-started.md
â”?  â””â”€â”€ advanced-usage.md
â””â”€â”€ life/
    â””â”€â”€ my-journey.md
```

In this example, `getting-started.md` gets the tag `tech` automatically.

## Frontmatter

```yaml
---
title: My Post
description: Optional short description
date: 2025-01-01        # publish date (aliases: ctime, pubDate, publishDate)
mtime: 2025-06-01        # update date (aliases: updatedDate)
tags: [custom, tags]
heroImage: ../../assets/cover.jpg   # cover image (alias: cover)
draft: true              # hide from production
---
```

### Smart Fallback System

If frontmatter fields are omitted, the theme intelligently fills them in (`src/theme/utils/fallback-blog-frontmatter.ts`):

| Field | Fallback Chain |
|---|---|
| `title` | Frontmatter â†?first H1 â†?filename |
| `description` | Frontmatter â†?`<!--more-->` excerpt â†?empty |
| `publishDate` | Frontmatter (`date`/`ctime`/`pubDate`/`publishDate`) â†?Git commit creation date â†?current time |
| `updateDate` | Frontmatter (`mtime`/`updatedDate`) â†?Git last modified date â†?current time |
| `tags` | Frontmatter â†?directory path segments |
| `cover` | `cover` â†?`heroImage` |
| `draft` | Defaults to `false` |

### Excerpt via `<!--more-->`

Place `<!--more-->` in your markdown to define an excerpt. Everything before it becomes the description.

## Reading Time

Automatically calculated from word count using the `reading-time` library. Exposed as `frontMatter.readingTime` for display in blog lists.

## URL Slugging

When `slugifyArticleUrl: true`, URLs are transliterated to ASCII. A Chinese filename like `ä½ å¥½ä¸–ç•Œ.md` becomes `ni-hao-shi-jie`. Implementation in `src/theme/utils/slugify-blog-post-url.ts`.

## Pages

| Route | Description |
|---|---|
| `/` | Blog timeline (home) |
| `/blog/[...slug]` | Single blog post |
| `/archive` | Archive with all posts grouped |
| `/tags/[...slug]` | Filtered by tag |

## Embeds

`/embed/blog/[...slug]` renders a minimal layout without the main chrome â€?designed for iframe embedding (used by the Window Manager).

## Data Flow

1. Content collection loads all `.md`/`.mdx` files from `src/content/blog/`
2. `createFallbackBlogFrontMatterProcessor()` enriches each entry with computed frontmatter
3. Results are cached per-entry in a `Map` keyed by `collection:id:slugify`
4. Pages consume the processed posts sorted by date
