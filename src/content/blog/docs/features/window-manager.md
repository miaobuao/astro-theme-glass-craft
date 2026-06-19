---
title: 'Window Manager'
description: 'Desktop-like floating window system with draggable, resizable, dockable windows for blog posts.'
pubDate: 'Jun 19 2026'
tags: [docs, features]
---

A desktop-like floating window system built with SolidJS. Blog posts open as draggable, resizable "windows" within the browser â€?one of the most distinctive features of this theme.

## Architecture

### Components

- **`WindowManager`** (`src/theme/components/solid/WindowManager/WindowManager.tsx`) â€?Root container that renders all active windows. Handles geometry animation via `requestAnimationFrame` with cubic easing.

- **`Window`** (`src/theme/components/solid/WindowManager/Window.tsx`) â€?Wraps a `WindowShell` with an `<iframe>` pointing to the blog post's embed URL.

- **`WindowShell`** â€?Core window UI: title bar, resize handles (8 directions), close/minimize/maximize/dock buttons.

- **`WindowsList`** â€?Sidebar list of open windows. Shows minimized windows collapsed; clicking restores them.

- **`DraggableLine`** â€?Draggable divider between windows.

### State Management (`src/theme/components/solid/WindowManager/windows.ts`)

SolidJS store using `createStore`. Each window has:

```ts
interface WindowState {
  id: number
  title: string
  url: URL
  geometry: { x, y, width, height, aspectRatio }
  status: 'normal' | 'minimum' | 'maximum'
  zIndex: number
}
```

### Event System (`src/theme/components/solid/WindowManager/emitter.ts`)

`mitt`-based event emitter (`wmEmitter`) for cross-component communication:

| Event | Payload | Description |
|---|---|---|
| `openWindow` | `{ title, url }` | Open a new window |
| `closeWindow` | `{ id }` | Close a window |
| `focusWindow` | `{ id }` | Bring window to front |

## Window Operations

| Action | Behavior |
|---|---|
| **Drag** | Click and drag the title bar to move |
| **Resize** | 8-directional resize handles on edges and corners |
| **Minimize** | Collapses to sidebar list |
| **Maximize** | Fills the viewport with smooth animation |
| **Dock** | Restores maximized window to previous size/position |
| **Close** | Removes the window |
| **Focus** | Clicking a window raises its z-index |

## Integration

The Window Manager only appears on desktop (`invisible md:visible`) and sits outside the main content area in `BaseLayout`. Blog posts are loaded via `<iframe>` using the embed route (`/embed/blog/[...slug]`).
