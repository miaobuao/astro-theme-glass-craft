# Astro Theme Glass Craft

<div align="center">
  
[![Astro](https://img.shields.io/badge/Astro-FF3E00?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

一个基于 Astro 构建的玻璃拟态设计主题，具有现代化的界面和丰富的功能。

[English](README.md) | [中文](docs/README_zh.md)

## 简介

Astro Theme Glass Craft 是一个美观、现代且功能丰富的 Astro 主题，采用流行的玻璃拟态设计风格。该主题提供了博客、相册、文件浏览器等多种功能，适合个人网站、作品集或技术博客使用。

## 特性

- 🎨 玻璃拟态设计 - 现代化 UI 设计风格
- 📱 响应式布局 - 适配各种设备屏幕
- ✍️ 博客系统 - Markdown/MDX 支持，标签分类，RSS 订阅
- 🖼️ 相册功能 - 自动图片展示，灯箱查看器
- 📁 文件浏览器 - 共享目录浏览，图片预览
- 💬 评论系统 - 集成 Giscus 评论
- 🔍 搜索功能 - 全文搜索支持
- 🌍 国际化 - 多语言支持
- 🧮 数学公式 - KaTeX/MathJax 支持
- 📝 代码高亮 - Shiki 代码高亮

## 核心功能

### 玻璃拟态设计

- 毛玻璃背景与半透明元素
- 柔和的阴影和边框效果

### 响应式布局

- 自适应不同屏幕尺寸

### 博客系统

- Markdown/MDX 文章支持
- 自动生成文章列表和归档页面
- 标签分类系统
- RSS 订阅功能

### 相册功能

- 自动扫描并展示图片集
- 响应式图片网格布局
- 图片灯箱查看器
- 自动生成缩略图

### 文件浏览器

- 共享目录文件浏览
- 自动生成文件列表
- 图片文件预览功能
- 缩略图生成

### 评论与社交功能

- 集成 Giscus 评论系统，基于 GitHub Discussions
- 友情链接页面
- 社交媒体链接集成
- 个人信息展示

### 其他特性

- 搜索功能
- 代码高亮和数学公式支持
- 滚动进度指示器（球形或线条）
- Markdown 指令支持（提示框、警告框、错误框）
- 国际化支持

## 配置选项

主题支持丰富的配置选项，所有字段均为可选（除了必需字段），可以根据需要进行配置：

### 基础配置

- `title` (可选) - 站点标题，显示在浏览器标签页和页面头部
- `description` (可选) - 站点描述，用于SEO和页面元信息
- `backgroundImage` (可选) - 背景图片设置，支持渐进式图片和普通图片，可设为false禁用背景图
- `slugifyArticleUrl` (必需) - 是否对文章URL进行slugify处理，使URL更友好
- `lang` (可选) - 站点语言，支持'zh'或'en'

### 自定义页面

- `customPages.aboutMe` (可选) - 关于我页面的路径
- `customPages.shareDirectory` (可选) - 共享目录的URL路径，用于文件浏览器功能

### 作者信息

- `author.name` (必需) - 作者姓名
- `author.avatar` (必需) - 作者头像，支持渐进式图片和普通图片
- `author.email` (可选) - 作者邮箱
- `author.signature` (可选) - 作者签名

### 友情链接

- `friends` (可选) - 友情链接数组，每个链接包含名称、描述、URL和头像

### 社交链接

- `socialLinks.github` (可选) - GitHub个人主页链接

### 相册配置

- `gallery.thumbnail.size` (可选) - 相册缩略图大小，默认384px
- `gallery.thumbnail.format` (可选) - 相册缩略图格式，支持'webp'或'avif'，默认'webp'

### 评论系统

- `comment.giscus` (可选) - Giscus评论系统配置，基于GitHub Discussions

### RSS配置

- `rss.content` (可选) - 是否在RSS中包含文章内容
- `rss.description` (可选) - 是否在RSS中包含文章描述

### 其他功能

- `scrollProgress` (可选) - 滚动进度指示器，支持'ball'（球形）、'line'（线条）或false（禁用）
