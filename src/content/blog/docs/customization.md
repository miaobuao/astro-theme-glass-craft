---
title: 'Customization Guide'
description: 'How to customize Astro Theme Glass Craft - styling, layout, pages, image pipeline, and more.'
pubDate: 'Jun 19 2026'
tags: [docs]
---

## Styling

### Override CSS

Create a global CSS file and import it in your layout or `BaseHtml.astro`:

```css
/* src/styles/custom.css */
@import 'tailwindcss';

@utility glassmorphism {
  /* Custom glass effect */
  @apply bg-blue-500/30 backdrop-blur-md;
}
```

### Extend Theme

Use Tailwind's `@theme` directive in any CSS file to add custom design tokens.

## Layout

The main layout (`BaseLayout.astro`) can be replaced by editing `src/theme/layouts/BaseLayout.astro`. The component structure:

- `<BaseHtml>` â€?Root document shell
- Sidebar with author info, navigation, `WindowsList`
- `<main>` â€?Scrollable content area with toolbar
- `<aside slot="aside">` â€?Right sidebar (TOC)
- `<WindowManager>` â€?Desktop window system

## Adding Pages

Create pages in `src/pages/` â€?they are picked up by Astro automatically:

```astro
---
// src/pages/projects.astro
import BaseLayout from '../src/theme/layouts/BaseLayout.astro'
---

<BaseLayout title="Projects">
  <h1>My Projects</h1>
</BaseLayout>
```

## Image Pipeline

Override image processing behavior in `src/theme/utils/thumbnail.ts`:

- Change default thumbnail size (currently 12px)
- Change output format (currently WebP)
- Add new image processing steps

## Custom Elements

The theme uses `defineCustomElement()` (`src/theme/utils/define-custom-element.ts`) to register interactive components without a framework. To add your own:

```ts
import { defineCustomElement } from '../utils/define-custom-element'

class MyWidget extends HTMLElement {
  connectedCallback() { /* ... */ }
}

defineCustomElement('my-widget', MyWidget)
```

## Configuration Defaults

The theme sets sensible defaults in `src/theme/index.ts`:

- Default background image: `public/background/xiaogou.webp`
- Gallery thumbnail: 384px, WebP
- Prefetch: all, viewport strategy
- CSS target: Chrome 61+

Override any of these by setting the corresponding config value.

## Adding Social Links

Extend the `ThemeConfig` interface in `src/theme/config.ts` and update navigation icons in `BaseLayout.astro` to support additional social platforms.

## Custom Remark Plugins

Add custom remark/rehype plugins by extending the markdown configuration in `src/theme/index.ts` or by adding them to `astro.config.ts`:

```ts
export default defineConfig({
  markdown: {
    remarkPlugins: [myCustomPlugin],
  },
})
```

The integration merges user plugins with its defaults via `uniq()`.
