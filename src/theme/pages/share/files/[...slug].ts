import type { APIRoute } from 'astro'
import { readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { SHARE_DIR } from '../../../consts'
import { flattenFiles } from '../../../utils/flatten-files'
import { getAllFiles } from '../../../utils/get-all-files'

export async function getStaticPaths() {
	const files = await getAllFiles(SHARE_DIR)
	return flattenFiles(files)
		.filter((f) => !f.isDir)
		.map((path) => ({
			params: { slug: relative(SHARE_DIR, path.absPath) },
		}))
}

export const GET: APIRoute = async function ({ params }) {
	const { slug } = params
	if (!slug) {
		return new Response('Not Found', { status: 404 })
	}
	const path = join(SHARE_DIR, slug)
	const content = await readFile(path)
	return new Response(content)
}
