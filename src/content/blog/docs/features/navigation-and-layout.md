---
title: 'Navigation & Layout'
description: 'Responsive navigation system adapting between desktop sidebar and mobile bottom nav bar.'
pubDate: 'Jun 19 2026'
tags: [docs, features]
---

Responsive navigation system that adapts between desktop (sidebar) and mobile (bottom nav bar).

## Layout Architecture

### `BaseLayout.astro`

The main layout wrapping all pages, composed of:

| Section | Desktop | Mobile |
|---|---|---|
| **Sidebar** | Fixed left column (w-48 md:w-52) | Bottom fixed bar |
| **Author Info** | Above sidebar (avatar, name, signature) | Hidden |
| **Toolbar** | Sticky top bar with Collection/Archive/Search buttons | Same |
| **Main Content** | Scrollable center area | Full width |
| **Aside** | Right column for TOC (hidden < lg) | Hidden |

### Navigation Items

Visibility is computed dynamically by `getNavigationConditions()` (`src/theme/utils/navigation.ts`):

| Nav Item | Shows When |
|---|---|
| Timeline | Always (home) |
| Gallery | `src/content/gallery/` has entries |
| Share | `customPages.shareDirectory` is configured |
| Friends | `friends` array is non-empty |
| About Me | `customPages.aboutMe` is configured |
| Finder | Gallery, Share, or Friends are available (mobile only) |

### AdaptiveIconButton

Navigation buttons with filled/outlined icon states based on whether the current route matches. Uses Iconify icons via Tailwind plugin: icons show filled state when active, outlined when inactive.

### Finder (Mobile Launcher)

The `/finder` page serves as a mobile launcher for Gallery, Share, and Friends â€?providing quick access to features that are hidden on the small screen.

### Toolbar

Sticky top bar with:
- Collection button (links to `/collection`)
- Archive button (links to `/archive`, disabled on archive page)
- Search button (opens Pagefind modal)

### Scroll Redirection

A script in the layout redirects wheel events from `<body>` to `#main-scroll-container`, ensuring smooth scrolling within the main content area even when the cursor is over page margins.
