---
title: 'Content Collections'
description: 'Blog and gallery collection schemas and loaders defined with Astro content collections API.'
pubDate: 'Jun 19 2026'
tags: [docs, architecture]
---

Defined in `src/content.config.ts` using Astro's content collections API with `glob` loaders.

## Blog Collection

```ts
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),

    // Date aliases (any one can be used)
    date: z.coerce.date().optional(),
    ctime: z.coerce.date().optional(),
    pubDate: z.coerce.date().optional(),
    publishDate: z.coerce.date().optional(),
    mtime: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),

    // Cover image aliases
    heroImage: image().optional(),
    cover: image().optional(),

    draft: z.boolean().optional().default(false),
  }),
})
```

**Source:** `src/content/blog/**/*.{md,mdx}`
**Schema:** Zod with multiple date and image field aliases for flexibility.

### Smart Frontmatter Processing

The raw collection entries are enriched through `createFallbackBlogFrontMatterProcessor()` (`src/theme/utils/fallback-blog-frontmatter.ts`), which computes fallback values for fields missing from frontmatter. See [Blog System](../features/blog-system.md) for details.

## Gallery Collection

```ts
const gallery = defineCollection({
  loader: glob({ base: './src/content/gallery', pattern: '**/*.md' }),
  schema: () => z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
})
```

**Source:** `src/content/gallery/**/*.md`
**Schema:** Minimal â€?title and description only. Images are extracted from markdown body via `GalleryHelper`.

Images are not stored in frontmatter; they're parsed from the markdown AST at runtime using `remark().parse()`. This allows galleries to be authored as natural markdown with embedded images.

## Collection Architecture

```
content.config.ts
    â”?    â”œâ”€â”€ blog collection â”€â”€â–?createFallbackBlogFrontMatterProcessor()
    â”?      â”?                    â”?    â”?      â”?                    â–?    â”?      â”?             ProcessedPost[]
    â”?      â”?             (title, description, dates, tags, readingTime, slug)
    â”?      â”?    â”?      â–?             (cached per entry)
    â”?  Blog pages consume via getCollection('blog')
    â”?    â””â”€â”€ gallery collection â”€â”€â–?GalleryHelper
            â”?                    â”?            â”?                    â–?            â”?             GallerySection[]
            â”?             (title, images[])
            â”?            â–?        Gallery pages consume via getCollection('gallery')
```
