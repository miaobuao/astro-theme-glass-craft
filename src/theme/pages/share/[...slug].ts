import type { APIRoute } from 'astro'
import { readdir, stat, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const SHARE_DIR = join(process.env.ROOT_DIRNAME!, 'src/content/share')

async function getAllFiles(dirPath: string, originalPath: string) {
	const files = await readdir(dirPath)
	let fileList: string[] = []

	for (const file of files) {
		const filePath = join(dirPath, file)
		const fileStat = await stat(filePath)

		if (fileStat.isDirectory()) {
			fileList = fileList.concat(await getAllFiles(filePath, originalPath))
		} else {
			fileList.push(relative(originalPath, filePath))
		}
	}

	return fileList
}

export async function getStaticPaths() {
	const files = await getAllFiles(SHARE_DIR, SHARE_DIR)
	return files.map((path) => ({
		params: { slug: path },
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
