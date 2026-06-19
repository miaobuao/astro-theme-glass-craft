---
title: 'Scroll Progress Indicators'
description: 'Two visual indicators - ball and line - showing reading progress on blog posts.'
pubDate: 'Jun 19 2026'
tags: [docs, features]
---

Two visual indicators show reading progress: a floating ball and a thin line. Configurable via `scrollProgress` in theme config.

## Ball

`/src/theme/components/astro/ScrollProgress/ScrollProgressBall.astro`

A circular indicator that fills like a progress ring. Positioned fixed at the bottom-right of the viewport. Uses a custom element registered via `defineCustomElement()`.

## Line

`/src/theme/components/astro/ScrollProgress/ScrollProgressLine.astro`

A horizontal line at the bottom of the page that grows from left to right as the user scrolls. Supports customizable `stroke-width`, `linecap`, and `dynamicColor`.

## Selection

```ts
scrollProgress: 'ball' | 'line' | false
```

When `false` (or unset), no indicator is shown. Both indicators target the blog post's scroll container (`#main-scroll-container`).

## Implementation

Both are custom elements defined in `src/theme/components/astro/ScrollProgress/base.ts` using `defineCustomElement()`. They track scroll position via the `scroll` event on the configured container element.
