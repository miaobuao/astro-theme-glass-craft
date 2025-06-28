import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import type { AbstractFile } from './abstract-file'

export async function getAllFiles(dirPath: string): Promise<AbstractFile[]> {
	const fileList: AbstractFile[] = []
	for (const file of await readdir(dirPath)) {
		const filePath = join(dirPath, file)
		const fileStat = await stat(filePath)
		if (fileStat.isDirectory()) {
			const children = await getAllFiles(filePath)
			fileList.push({ absPath: filePath, isDir: true, children })
		} else {
			fileList.push({ absPath: filePath, isDir: false })
		}
	}
	return fileList
}
