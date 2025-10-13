import { join } from 'node:path'
import SuperJSON from 'superjson'
import type { ThemeConfig } from './config'

// @ts-ignore
import _config from 'virtual:theme-config'

export const config = SuperJSON.deserialize(_config) as ThemeConfig

export const ROOT_DIR = process.env.ROOT_DIRNAME!
export const SHARE_DIR = join(ROOT_DIR, 'src/content/share')
export const BLOG_DIR = join(ROOT_DIR, 'src/content/blog')
export const GALLERY_DIR = join(ROOT_DIR, 'src/content/gallery')
export const GALLERY_THUMBNAIL_CONFIG = {
	size: config.gallery?.thumbnail?.size ?? 384,
	format: config.gallery?.thumbnail?.format ?? 'webp',
}
