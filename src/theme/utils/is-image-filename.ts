import mime from 'mime-types'

export function isImageFilename(filename: string) {
	const lookup = mime.lookup(filename)
	if (lookup) {
		return lookup.startsWith('image/')
	}
	return false
}
