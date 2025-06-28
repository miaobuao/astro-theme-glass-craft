import type { AbstractFile } from './abstract-file'

export function isSubFile(parent: AbstractFile, child: AbstractFile) {
	return parent.children?.includes(child)
}
