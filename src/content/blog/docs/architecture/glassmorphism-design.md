---
title: 'Glassmorphism Design System'
description: 'CSS utility system, Tailwind v4 configuration, and responsive patterns that define the glassmorphism aesthetic.'
pubDate: 'Jun 19 2026'
tags: [docs, architecture]
---

The theme's visual identity is built around the glassmorphism aesthetic â€?frosted glass panels with blur, transparency, and soft borders.

## Tailwind CSS v4 Configuration

`src/theme/assets/css/global.css` is the Tailwind entry point:

```css
@import 'tailwindcss' source('../../../../src');
@plugin "@tailwindcss/typography";
@plugin "@iconify/tailwind4";
```

Uses the `source()` function to configure Tailwind's content detection scope.

## Glassmorphism Utility

```css
@utility glassmorphism {
  @apply border-amber-50/20;
  @apply bg-white/50 backdrop-blur-lg;
  @apply dark:bg-black/50;
  @apply not-supports-[...]:bg-white/85;
  @apply not-supports-[...]:dark:bg-black/85;
}
```

Key properties:
- **`backdrop-blur-lg`** â€?The signature frosted glass blur effect
- **`bg-white/50`** â€?Semi-transparent white (light mode)
- **`bg-black/50`** â€?Semi-transparent black (dark mode)
- **`border-amber-50/20`** â€?Subtle warm border
- **`not-supports-[]`** â€?Fallback for browsers without `backdrop-filter` support

## No-Glassmorphism Utility

```css
@utility no-glassmorphism {
  @apply bg-transparent backdrop-blur-none;
}
```

Used to remove the glass effect on nested elements.

## Additional Utilities

| Utility | Effect |
|---|---|
| `no-scrollbar` | Hide scrollbars cross-browser |
| `col-count-*` | CSS columns count |
| `col-gap-*` | CSS columns gap |
| `image-pixelated` | Pixelated image rendering |

## Typography

The `@tailwindcss/typography` plugin (`prose` class) is customized:

- **Headings**: Anchor link with `#` prefix on hover
- **Footnotes**: Separator line, hidden `.sr-only` labels
- Article content uses `prose dark:prose-invert` for automatic dark mode

## Icon System

Iconify icons via `@iconify/tailwind4` plugin, using the `icon-[...]` convention:

```html
<i class="icon-[material-symbols--nest-clock-farsight-analog]" />
```

Icons have filled/outlined variants for active/inactive navigation states.

## Dark Mode

Uses Tailwind's built-in `dark:` variant. The `<html>` element conditionally gets the `dark` class based on the `prefers-color-scheme` media query or user preference.

## Responsive Design

Breakpoints use Tailwind's defaults (`sm: 640px`, `md: 768px`, `lg: 1024px`). Key responsive patterns:

- **< sm**: Bottom navigation bar, full-width content, Finder launcher
- **sm+**: Sidebar navigation, left-aligned layout, WindowsList visible
- **lg+**: Table of Contents in right aside column
- **2xl**: Max-width container at 7xl
