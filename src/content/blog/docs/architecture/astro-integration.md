---
title: 'Astro Integration Architecture'
description: 'How the theme is packaged as a reusable Astro integration with virtual modules, route injection, and build hooks.'
pubDate: 'Jun 19 2026'
tags: [docs, architecture]
---

The entire theme is packaged as a **reusable Astro integration** â€?not just a starter template. This means it can be installed as a dependency and configured via a function call.

## Entry Point

`src/theme/index.ts` exports a `ThemeIntegration()` function that returns an `AstroIntegration` object:

```ts
export default function ThemeIntegration(userOpts: ThemeConfig): AstroIntegration
```

## Hooks

### `astro:config:setup`

This hook does the heavy lifting:

1. **Injects all routes** â€?18+ routes injected via `injectRoute()` (home, blog, gallery, browse, archive, tags, finder, friend-links, RSS, sitemap, images, share, collection, viewer, embed, robots.txt)

2. **Creates a Virtual Module** â€?`virtual:theme-config` exposes the user's config to both server and client code via SuperJSON serialization:

```ts
const vitePlugin = {
  name: 'vite-plugin-{packageName}',
  resolveId(id) {
    if (id === 'virtual:theme-config') return '\0virtual:theme-config'
  },
  load(id) {
    if (id === '\0virtual:theme-config') {
      return `export default ${JSON.stringify(SuperJSON.serialize(userOpts))}`
    }
  },
}
```

3. **Configures Vite plugins** â€?Tailwind CSS v4 (`@tailwindcss/vite`) and the custom virtual module plugin

4. **Configures Markdown pipeline** â€?Sets up Shiki syntax highlighting, remark/rehype plugins (math, directives, footnotes, relative links, GitHub admonitions, auto-link headings, slugs, KaTeX), and GFM

5. **Configures integrations** â€?Conditionally adds `@astrojs/solid-js`, `@astrojs/mdx`, `astro-pagefind`, `@astrojs/sitemap` if not already present in the user's config

6. **Sets build defaults** â€?`cssTarget: 'chrome61'`, prefetch all with viewport strategy

### `astro:build:done`

After build completion, spawns the Pagefind CLI process to generate search indexes on the output directory. Logging level is passed through from the Astro logger.

## Virtual Module Architecture

```
User Config (TS object)
    â”?    â–?SuperJSON.serialize()
    â”?    â–?virtual:theme-config    â—„â”€â”€ Imported as: import _config from 'virtual:theme-config'
    â”?                          (resolved at Vite resolveId/load)
    â–?consts.ts: SuperJSON.deserialize()  â”€â”€â–?typed ThemeConfig object
```

Available everywhere in the codebase via `import { config } from '../consts'`.

## Package Exports

The `package.json` `exports` field exposes theme internals for external consumption:

```json
{
  "./src/theme/index.ts": "...",
  "./src/theme/pages/*": "...",
  "./src/theme/layouts/*": "..."
}
```

This allows other packages to import theme pages and layouts directly.

## Conditional Integration Loading

The integration guards against duplicate registrations by checking if an integration with the same name already exists in the user's config. This makes it safe for downstream consumers to compose.
