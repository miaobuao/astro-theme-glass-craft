---
title: Theme Document
pubDate: 2025-06-24
---

## 主题配置 / Theme Configuration

### 中文配置说明 / Chinese Configuration Guide

主题支持丰富的配置选项，所有字段均为可选（除了必需字段），可以根据需要进行配置。

#### 基础配置
- `title` (可选) - 站点标题，显示在浏览器标签页和页面头部
- `description` (可选) - 站点描述，用于SEO和页面元信息
- `backgroundImage` (可选) - 背景图片设置，支持渐进式图片和普通图片，可设为false禁用背景图
- `slugifyArticleUrl` (必需) - 是否对文章URL进行slugify处理，使URL更友好
- `lang` (可选) - 站点语言，支持'zh'或'en'

#### 自定义页面
- `customPages.aboutMe` (可选) - 关于我页面的路径
- `customPages.shareDirectory` (可选) - 共享目录的URL路径，用于文件浏览器功能

#### 作者信息
- `author.name` (必需) - 作者姓名
- `author.avatar` (必需) - 作者头像，支持渐进式图片和普通图片
- `author.email` (可选) - 作者邮箱
- `author.signature` (可选) - 作者签名

#### 友情链接
- `friends` (可选) - 友情链接数组，每个链接包含名称、描述、URL和头像

#### 社交链接
- `socialLinks.github` (可选) - GitHub个人主页链接

#### 相册配置
- `gallery.thumbnail.size` (可选) - 相册缩略图大小，默认384px
- `gallery.thumbnail.format` (可选) - 相册缩略图格式，支持'webp'或'avif'，默认'webp'

#### 评论系统
- `comment.giscus` (可选) - Giscus评论系统配置，基于GitHub Discussions

#### RSS配置
- `rss.content` (可选) - 是否在RSS中包含文章内容
- `rss.description` (可选) - 是否在RSS中包含文章描述

#### 其他功能
- `scrollProgress` (可选) - 滚动进度指示器，支持'ball'（球形）、'line'（线条）或false（禁用）

### English Configuration Guide

The theme supports extensive configuration options. All fields are optional (except required fields), and can be configured as needed.

#### Basic Configuration
- `title` (optional) - Site title, displayed in browser tab and page header
- `description` (optional) - Site description, used for SEO and page meta information
- `backgroundImage` (optional) - Background image setting, supports progressive images and common images, can be set to false to disable background image
- `slugifyArticleUrl` (required) - Whether to slugify article URLs for friendlier URLs
- `lang` (optional) - Site language, supports 'zh' or 'en'

#### Custom Pages
- `customPages.aboutMe` (optional) - Path to the About Me page
- `customPages.shareDirectory` (optional) - URL path to the shared directory, used for file browser functionality

#### Author Information
- `author.name` (required) - Author name
- `author.avatar` (required) - Author avatar, supports progressive images and common images
- `author.email` (optional) - Author email
- `author.signature` (optional) - Author signature

#### Friend Links
- `friends` (optional) - Array of friend links, each containing name, description, URL and avatar

#### Social Links
- `socialLinks.github` (optional) - GitHub profile link

#### Gallery Configuration
- `gallery.thumbnail.size` (optional) - Gallery thumbnail size, default 384px
- `gallery.thumbnail.format` (optional) - Gallery thumbnail format, supports 'webp' or 'avif', default 'webp'

#### Comment System
- `comment.giscus` (optional) - Giscus comment system configuration, based on GitHub Discussions

#### RSS Configuration
- `rss.content` (optional) - Whether to include article content in RSS
- `rss.description` (optional) - Whether to include article description in RSS

#### Other Features
- `scrollProgress` (optional) - Scroll progress indicator, supports 'ball' (circular), 'line' (linear) or false (disabled)

## 共享文件浏览器 / Shared File Browser

### 中文功能说明 / Chinese Feature Guide

共享文件浏览器功能允许您在网站上展示和分享存储在特定目录中的文件。用户可以通过网页界面浏览文件夹结构，查看和下载文件。

要启用此功能，您需要：
1. 在配置中设置 `customPages.shareDirectory` 字段，指向您想要共享的本地目录
2. 将需要共享的文件放置在该目录中

当用户访问 `/browse` 路径时，将看到文件浏览器界面，其中：
- 文件夹以特殊样式显示，点击可进入子目录
- 图片文件会显示缩略图预览
- 其他文件显示文件名和图标
- 支持多级目录结构浏览

### English Feature Guide

The shared file browser feature allows you to display and share files stored in a specific directory on your website. Users can browse the folder structure through a web interface, view and download files.

To enable this feature, you need to:
1. Set the `customPages.shareDirectory` field in the configuration, pointing to the local directory you want to share
2. Place the files you want to share in that directory

When users visit the `/browse` path, they will see the file browser interface, where:
- Folders are displayed with a special style, click to enter subdirectories
- Image files show thumbnail previews
- Other files display filename and icons
- Multi-level directory structure browsing is supported

## 相册功能 / Gallery Feature

### 中文功能说明 / Chinese Feature Guide

相册功能允许您在网站上展示图片集合。用户可以通过网页界面浏览相册，查看图片大图。

要使用此功能，您需要：
1. 在 `src/content/gallery` 目录中创建相册Markdown文件（.md）
2. 在相册Markdown文件同级创建一个assets文件夹，用于存放该相册的图片
3. 在assets文件夹中按相册名称创建子文件夹存放图片

相册Markdown文件的格式如下：
```markdown
---
title: 相册标题
---

## 相册章节标题

![图片描述](assets/相册名称/图片文件名.jpg)

## 另一个章节

![另一张图片](assets/相册名称/另一张图片文件名.jpg)
```

具体示例可参考项目中的 `src/content/gallery/勇敢小猫-六月.md` 文件：
```markdown
---
title: 勇敢小猫-六月
---

## 幼年体！

![刚来的时候](assets/勇敢小猫-六月/IMG_20220730_222232.jpg)

![干饭喵，健康长大！](assets/勇敢小猫-六月/IMG_20220731_103031.jpg)
```

当用户访问 `/gallery` 路径时，将看到所有相册的缩略图列表。点击相册可进入相册详情页，其中：
- 图片以网格形式展示
- 点击图片可查看大图
- 支持图片懒加载
- 自动生成缩略图以提高页面加载速度
- 图片按章节分组展示

### English Feature Guide

The gallery feature allows you to display image collections on your website. Users can browse albums through a web interface and view large images.

To use this feature, you need to:
1. Create album Markdown files (.md) in the `src/content/gallery` directory
2. Create an assets folder at the same level as the album Markdown file to store images for that album
3. Create subfolders in the assets folder named after the album to store images

The format of the album Markdown file is as follows:
```markdown
---
title: Album Title
---

## Album Section Title

![Image Description](assets/album-name/image-filename.jpg)

## Another Section

![Another Image](assets/album-name/another-image-filename.jpg)
```

For a concrete example, refer to `src/content/gallery/勇敢小猫-六月.md` in the project:
```markdown
---
title: 勇敢小猫-六月
---

## 幼年体！

![刚来的时候](assets/勇敢小猫-六月/IMG_20220730_222232.jpg)

![干饭喵，健康长大！](assets/勇敢小猫-六月/IMG_20220731_103031.jpg)
```

When users visit the `/gallery` path, they will see a thumbnail list of all albums. Clicking on an album takes you to the album details page, where:
- Images are displayed in a grid
- Clicking on an image shows a larger version
- Supports image lazy loading
- Automatically generates thumbnails to improve page loading speed
- Images are displayed grouped by sections

## Directive Box 示例 / Directive Box Examples

### 中文用法说明 / Chinese Usage Guide

Directive Box 是一种用于在文档中突出显示重要信息的Markdown扩展语法。它支持三种类型：信息(info)、警告(warning)和错误(error)。

#### 信息框 (info)
用于显示一般性提示信息。

```markdown
:::info
这是一条信息提示
:::
```

:::info
这是一条信息提示
:::

#### 警告框 (warning)
用于显示需要注意的警告信息。

```markdown
:::warning
这是一个警告信息！
:::
```

:::warning
这是一个警告信息！
:::

#### 错误框 (error)
用于显示错误或危险信息。

```markdown
:::error
这是一条错误信息
:::
```

:::error
这是一条错误信息
:::

### English Usage Guide

Directive Box is a Markdown extension syntax used to highlight important information in documents. It supports three types: info, warning, and error.

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
