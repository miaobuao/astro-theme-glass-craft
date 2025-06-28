import type { APIRoute } from 'astro'
import { readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { getAllFiles } from '../../utils/get-all-files'
import { SHARE_DIR } from '../../consts'
import { flattenFiles } from '../../utils/flatten-files'
import { isImageFilename } from '../../utils/is-image-filename'
import sharp from 'sharp'

export async function getStaticPaths() {
	const files = await getAllFiles(SHARE_DIR)
	return flattenFiles(files)
		.filter((f) => !f.isDir && isImageFilename(f.absPath))
		.map((path) => ({
			params: { slug: relative(SHARE_DIR, path.absPath) },
		}))
}

export const GET: APIRoute = async function ({ params }) {
	const { slug } = params
	if (!slug) {
		return new Response('Not Found', { status: 404 })
	}
	const absPath = join(SHARE_DIR, slug)
	const content = await readFile(absPath)
	try {
		const { width, height } = await sharp(content).metadata()
		if (width > height) {
			var thumbnailWidth = Math.min(256, width)
			var thumbnailHeight = Math.round((height * thumbnailWidth) / width)
		} else {
			var thumbnailHeight = Math.min(256, height)
			var thumbnailWidth = Math.round((width * thumbnailHeight) / height)
		}
		const thumbnail = await sharp(content)
			.resize(thumbnailWidth, thumbnailHeight)
			.webp({ quality: 100 })
			.toBuffer()
		return new Response(thumbnail)
	} catch {
		return new Response(content)
	}
}
