import type { AbstractFile } from './abstract-file'

export function flattenFiles(files: AbstractFile[]): AbstractFile[] {
	const fileList: AbstractFile[] = []
	for (const file of files) {
		if (file.isDir && file.children) {
			fileList.push(file, ...flattenFiles(file.children))
		} else {
			fileList.push(file)
		}
	}
	return fileList
}
