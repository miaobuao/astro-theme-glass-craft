---
title: 'Markdown Enhancements'
description: 'KaTeX math, admonitions, directives, footnotes, code highlighting, auto-linked headings, and relative link resolution.'
pubDate: 'Jun 19 2026'
tags: [docs, features]
---

The theme configures a rich remark/rehype pipeline for enhanced markdown rendering.

## Math Formulas

KaTeX via `rehype-katex` (output: MathML) + `remark-math`.

```latex
$$
E = mc^2
$$
```

## Admonitions / Directives

Three directive types rendered as custom HTML elements:

```markdown
::info
This is an info box.
::

::warning
This is a warning.
::

::error
This is an error message.
::
```

Rendered as `<info-box>`, `<warning-box>`, `<error-box>` custom elements defined in `src/theme/components/astro/directive/box/`. Styles in `global.css`:

| Type | Background | Text |
|---|---|---|
| info | `#d9edf7cc` | `#31708f` |
| warning | `#fcf8e3cc` | `#8a6d3b` |
| error | `#f2dedecc` | `#a94442` |

### Rendered Examples

#### Info Box

Used to display general informational messages.

```markdown
:::info
This is an informational message
:::
```

:::info
This is an informational message
:::

#### Warning Box

Used to display cautionary warning messages.

```markdown
:::warning
This is a warning message!
:::
```

:::warning
This is a warning message!
:::

#### Error Box

Used to display error or danger messages.

```markdown
:::error
This is an error message
:::
```

:::error
This is an error message
:::

### Pipeline

1. `remark-directive` parses `::directive` syntax into directive nodes
2. `remark-github-admonitions-to-directives` converts GitHub-flavored `> [!NOTE]` syntax into the same directive format
3. Custom `remarkDirectiveRehype` plugin (`src/plugins/remark/remark-directive-rehype.ts`) transforms directives into `<container-directive>` HTML

## Footnotes

Enhanced via `remark-footnotes-extra` with `breakLink: true` for better back-link support.

## Code Highlighting

Shiki with `wrap: true` and `@shikijs/colorized-brackets` transformer for bracket pair colorization.

## Auto-Linked Headings

`rehype-autolink-headings` wraps heading text in anchor links. On hover, a `#` prefix appears before the heading.

## Relative Markdown Links

`remarkRelativeMarkdownLinks` plugin (`src/plugins/remark/remark-relative-markdown-links.ts`) resolves relative links between markdown files to their final HTML URLs �?essential for cross-referencing blog posts.

## Full Plugin Pipeline

```ts
remarkPlugins: [
  remarkParse,
  remarkDirective,
  remarkDirectiveRehype,
  [remarkFootnotesExtra, { breakLink: true }],
  [remarkRelativeMarkdownLinks, { slugify }],
  remarkGithubAdmonitionsToDirectives,
  remarkMath,
]

rehypePlugins: [
  rehypeHeadingIds,
  [rehypeAutoLinkHeadings, { behavior: 'wrap' }],
  rehypeSlug,
  [rehypeKatex, { output: 'mathml' }],
]
```
