import type { APIRoute } from 'astro'
import { readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { SHARE_DIR } from '../../../consts'
import { flattenFiles } from '../../../utils/flatten-files'
import { getAllFiles } from '../../../utils/get-all-files'

export async function getStaticPaths() {
	if (!SHARE_DIR) {
		throw new Error('SHARE_DIR cannot be void')
	}
	const files = await getAllFiles(SHARE_DIR)
	return flattenFiles(files)
		.filter((f) => !f.isDir)
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
	const path = join(SHARE_DIR, slug)
	const content = await readFile(path)
	return new Response(new Uint8Array(content))
}
