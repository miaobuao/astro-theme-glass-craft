import { BLOG_DIR, ROOT_DIR } from '../consts'
import { join, relative } from 'node:path'
import { slugifyBlogPostUrl } from './slugify-blog-post-url'

export function blogFilePath2Url(filePath: string) {
	const absPath = join(ROOT_DIR, filePath)
	const relPath = relative(BLOG_DIR, absPath)
	return relPath.split('/').map(slugifyBlogPostUrl).join('/')
}
