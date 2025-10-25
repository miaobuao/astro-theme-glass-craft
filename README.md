# Astro Theme Glass Craft

<div align="center">
  
[![Astro](https://img.shields.io/badge/Astro-FF3E00?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

A glassmorphism design theme built with Astro, featuring a modern interface and rich functionality.

[English](README.md) | [中文](docs/README_zh.md)

## Introduction

Astro Theme Glass Craft is a beautiful, modern, and feature-rich Astro theme with a popular glassmorphism design style. The theme provides multiple functions such as blog, gallery, and file browser, making it suitable for personal websites, portfolios, or technical blogs.

## Features

- 🎨 Glassmorphism Design - Modern UI design style
- 📱 Responsive Layout - Adapts to various screen sizes
- ✍️ Blog System - Markdown/MDX support, tag categorization, RSS feed
- 🖼️ Gallery Feature - Automatic image display, lightbox viewer
- 📁 File Browser - Shared directory browsing, image preview
- 💬 Comment System - Integrated Giscus comments
- 🔍 Search Functionality - Full-text search support
- 🌍 Internationalization - Multi-language support
- 🧮 Mathematical Formulas - KaTeX/MathJax support
- 📝 Code Highlighting - Shiki code highlighting

## Core Features

### Glassmorphism Design

- Frosted glass background with semi-transparent elements
- Soft shadows and border effects

### Responsive Layout

- Adaptive to different screen sizes

### Blog System

- Markdown/MDX article support
- Automatic generation of post lists and archive pages
- Tag categorization system
- RSS feed functionality

### Gallery Feature

- Automatic scanning and display of image collections
- Responsive image grid layout
- Image lightbox viewer
- Automatic thumbnail generation

### File Browser

- Shared directory file browsing
- Automatic file list generation
- Image file preview functionality
- Thumbnail generation

### Comments and Social Features

- Integrated Giscus comment system, based on GitHub Discussions
- Friend links page
- Social media link integration
- Personal information display

### Other Features

- Search functionality
- Code highlighting and mathematical formula support
- Scroll progress indicator (ball or line)
- Markdown directive support (info, warning, error boxes)
- Internationalization support

## Configuration Options

The theme supports extensive configuration options. All fields are optional (except required fields), and can be configured as needed:

### Basic Configuration

- `title` (optional) - Site title, displayed in browser tab and page header
- `description` (optional) - Site description, used for SEO and page meta information
- `backgroundImage` (optional) - Background image setting, supports progressive images and common images, can be set to false to disable background image
- `slugifyArticleUrl` (required) - Whether to slugify article URLs for friendlier URLs
- `lang` (optional) - Site language, supports 'zh' or 'en'

### Custom Pages

- `customPages.aboutMe` (optional) - Path to the About Me page
- `customPages.shareDirectory` (optional) - URL path to the shared directory, used for file browser functionality

### Author Information

- `author.name` (required) - Author name
- `author.avatar` (required) - Author avatar, supports progressive images and common images
- `author.email` (optional) - Author email
- `author.signature` (optional) - Author signature

### Friend Links

- `friends` (optional) - Array of friend links, each containing name, description, URL and avatar

### Social Links

- `socialLinks.github` (optional) - GitHub profile link

### Gallery Configuration

- `gallery.thumbnail.size` (optional) - Gallery thumbnail size, default 384px
- `gallery.thumbnail.format` (optional) - Gallery thumbnail format, supports 'webp' or 'avif', default 'webp'

### Comment System

- `comment.giscus` (optional) - Giscus comment system configuration, based on GitHub Discussions

### RSS Configuration

- `rss.content` (optional) - Whether to include article content in RSS
- `rss.description` (optional) - Whether to include article description in RSS

### Other Features

- `scrollProgress` (optional) - Scroll progress indicator, supports 'ball' (circular), 'line' (linear) or false (disabled)
