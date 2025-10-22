export interface AbstractFile {
	absPath: string
	isDir: boolean
	children?: AbstractFile[]
	imageDimensions?: {
		width: number
		height: number
	}
}
