import type { APIRoute } from 'astro'
import { readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import sharp from 'sharp'
import { SHARE_DIR, SHARE_THUMBNAIL_SIZE } from '../../../consts'
import { flattenFiles } from '../../../utils/flatten-files'
import { getAllFiles } from '../../../utils/get-all-files'
import { isImageFilename } from '../../../utils/is-image-filename'

export async function getStaticPaths() {
	if (!SHARE_DIR) {
		throw new Error('SHARE_DIR cannot be void')
	}
	const files = await getAllFiles(SHARE_DIR)
	return flattenFiles(files)
		.filter((f) => !f.isDir && isImageFilename(f.absPath))
		.map((path) => ({
			params: { slug: relative(SHARE_DIR!, path.absPath) },
		}))
}

export const GET: APIRoute = async function ({ params }) {
	const { slug } = params
	if (!slug) {
		return new Response('Not Found', { status: 404 })
	}
	if (!SHARE_DIR) {
		throw new Error('SHARE_DIR cannot be void')
	}
	const absPath = join(SHARE_DIR, slug)
	const content = await readFile(absPath)
	try {
		const { width, height } = await sharp(content).metadata()
		if (width > height) {
			var thumbnailWidth = Math.min(SHARE_THUMBNAIL_SIZE, width)
			var thumbnailHeight = Math.round((height * thumbnailWidth) / width)
		} else {
			var thumbnailHeight = Math.min(SHARE_THUMBNAIL_SIZE, height)
			var thumbnailWidth = Math.round((width * thumbnailHeight) / height)
		}
		const thumbnail = await sharp(content)
			.resize(thumbnailWidth, thumbnailHeight)
			.webp({ quality: 100 })
			.toBuffer()
		return new Response(new Uint8Array(thumbnail))
	} catch {
		return new Response(new Uint8Array(content))
	}
}
