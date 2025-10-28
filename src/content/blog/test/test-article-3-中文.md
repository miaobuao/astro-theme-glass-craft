---
title: Test Article 3 - 测试中文文件名
description: Testing slugify with Chinese characters in filename
publishDate: 2025-01-28
tags: [test, chinese, slugify, i18n]
---

# Test Article 3 - 中文测试

这是一个文件名包含中文字符的测试文章。

## 测试目的

测试插件的 slugify 功能是否能正确处理：
1. 中文文件名
2. 特殊字符
3. 混合英文和中文的路径

## 相对链接测试

### 返回上级目录

- 返回根目录文章：[测试文章 1](../test-article-1.md)
- 同级文章：[测试文章 2](./test-article-2.md)

### 带锚点的链接

- 跳转到文章 2 的特定章节：[文章 2 - Section 1](./test-article-2.md#section-1)

## Slugify 预期行为

### 当启用 slugify 时

文件名 `test-article-3-中文.md` 应该被转换为：
- URL: `/blog/test/test-article-3-zhong-wen`

链接 `../test-article-1.md` 应该转换为：
- URL: `/blog/test-article-1`

### 当禁用 slugify 时

应该保留原始路径（去除 .md 扩展名）：
- `/blog/test/test-article-3-中文`
- `/blog/test-article-1`

## Mixed Language Test

This article 包含 mixed 中英文 content to test 各种场景.

### Unicode and Special Characters

Testing links with:
- 中文字符 (Chinese)
- 日本語 (Japanese)
- 한글 (Korean)
- Español (Spanish accents)
- Emoji 🚀 (if supported)

## 循环引用测试

- 自我引用：[本文章](./test-article-3-中文.md)
- 形成链接循环：
  1. 文章 1 → 文章 2
  2. 文章 2 → 文章 3
  3. 文章 3 → 文章 1

[返回文章 1](../test-article-1.md) | [返回文章 2](./test-article-2.md)
