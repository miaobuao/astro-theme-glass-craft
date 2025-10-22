import { fileURLToPath } from 'node:url'
import SuperJSON from 'superjson'
import type { ThemeConfig } from './config'

// @ts-ignore
import _config from 'virtual:theme-config'

export const config = SuperJSON.deserialize(_config) as ThemeConfig

export const ROOT_DIR = process.env.ROOT_DIRNAME!
export const SHARE_DIR = config.customPages?.shareDirectory
	? fileURLToPath(config.customPages?.shareDirectory)
	: undefined
export const GALLERY_THUMBNAIL_CONFIG = {
	size: config.gallery?.thumbnail?.size ?? 384,
	format: config.gallery?.thumbnail?.format ?? 'webp',
}
export const SHARE_THUMBNAIL_SIZE = 80
