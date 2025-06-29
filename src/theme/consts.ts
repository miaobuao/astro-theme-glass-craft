import type { ThemeConfig } from './config'
//@ts-ignore
import _config from 'virtual:theme-config'
import { join } from 'node:path'

export const config = _config as ThemeConfig

export const ROOT_DIR = process.env.ROOT_DIRNAME!
export const SHARE_DIR = join(ROOT_DIR, 'src/content/share')
export const BLOG_DIR = join(ROOT_DIR, 'src/content/blog')
export const GALLERY_DIR = join(ROOT_DIR, 'src/content/gallery')
