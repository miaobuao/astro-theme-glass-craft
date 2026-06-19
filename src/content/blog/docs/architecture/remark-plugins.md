---
title: 'Remark/Rehype Plugins'
description: 'Custom remark plugins for directives and relative links used in the theme.'
pubDate: 'Jun 19 2026'
tags: [docs, architecture]
---

The theme includes two custom markdown plugins in `src/plugins/remark/`.

## remark-directive-rehype

Transforms remark directives (`::info`, `::warning`, `::error`) into `<container-directive>` custom HTML elements with a `class` attribute for styling.

This plugin bridges the gap between `remark-directive` (which parses directives into an AST) and the final HTML output. Without it, directives would remain as abstract nodes.

## remark-relative-markdown-links

Resolves relative links between markdown files to their final HTML URLs. When a blog post links to `../other-post/` as a markdown path, this plugin converts it to the actual deployed URL.

### Options

```ts
{
  slugify: false | ((segment: string) => string)
}
```

The slugify callback is passed from the theme config's `slugifyArticleUrl` â€?when enabled, URL segments are transliterated to ASCII before resolving.

## Third-party Plugin Pipeline

```ts
remarkPlugins: [
  remarkParse,                              // Parse markdown to AST
  remarkDirective,                          // Parse ::directive syntax
  remarkDirectiveRehype,                    // Convert directives to HTML
  [remarkFootnotesExtra, { breakLink: true }], // Enhanced footnotes
  [remarkRelativeMarkdownLinks, { slugify }],  // Resolve relative links
  remarkGithubAdmonitionsToDirectives,      // > [!NOTE] â†?directives
  remarkMath,                               // $...$ and $$...$$
]

rehypePlugins: [
  rehypeHeadingIds,                         // Add IDs to headings
  [rehypeAutoLinkHeadings, { behavior: 'wrap' }], // Auto-link headings
  rehypeSlug,                               // Slugify heading IDs
  [rehypeKatex, { output: 'mathml' }],      // Render math
]
```
