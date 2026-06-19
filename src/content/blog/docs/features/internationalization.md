---
title: 'Internationalization'
description: 'Lightweight path-key-based i18n system with browser locale detection and extensible language packs.'
pubDate: 'Jun 19 2026'
tags: [docs, features]
---

A lightweight, path-key-based i18n system for multi-language support.

## Architecture

Located in `src/theme/i18n/`:

- **`index.ts`** â€?Core engine: locale detection, translation lookup, type-safe key generation
- **`lang/en.json`** â€?English translation strings
- **`lang/zh.json`** â€?Chinese translation strings

## How It Works

### Locale Detection

`getNavigatorLocale()` inspects `navigator.languages` and matches the first browser language to supported locales (`zh` or `en`). Falls back to `en`.

### Translation Lookup

Keys use dot-separated paths (e.g., `nav.timeline`):

```ts
translate({ locale: 'zh', text: 'nav.timeline' })
// Looks up: zh.json -> { nav: { timeline: "..." } }
```

If the key is not found in the translation file, the key itself is returned as a fallback.

### Type-Safe Keys

`useI18nSource()` generates a TypeScript type that maps all possible key paths from the combined English + Chinese dictionaries. This provides autocomplete and type checking in the editor.

```ts
const t = useI18nSource()
// t.nav.timeline -> type is the path string "nav.timeline"
```

## Extending

To add a new locale:

1. Create `src/theme/i18n/lang/{locale}.json`
2. Add locale detection in `getNavigatorLocale()`
3. Add the locale to `getLangPack()`
