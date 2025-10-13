import type { AbstractFile } from './abstract-file'

export function sortAbstractFiles(files: AbstractFile[]) {
	return [...files].sort((a, b) => {
		if (a.isDir && !b.isDir) {
			return -1
		}
		if (!a.isDir && b.isDir) {
			return 1
		}
		return a.absPath.localeCompare(b.absPath)
	})
}
