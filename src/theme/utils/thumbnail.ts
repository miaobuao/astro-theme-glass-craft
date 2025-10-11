import { createHash } from 'crypto'
import sharp from 'sharp'
import { getImageBytesFromUrl } from './get-image-bytes-from-url'

const DEFAULT_THUMBNAIL_SIZE = 48

function sha256Hex(buf: Uint8Array) {
	return createHash('sha256').update(buf).digest('hex')
}

async function getThumbnailImageId(
	url: URL,
	ext: string,
	size = DEFAULT_THUMBNAIL_SIZE,
) {
	const buf = await getImageBytesFromUrl(url)

	const [metadata, hashHex] = await Promise.all([
		sharp(buf).metadata(),
		Promise.resolve(sha256Hex(buf)),
	])

	const width = metadata.width ?? 0
	const height = metadata.height ?? 0
	const needsResize = Math.max(width, height) > size

	return needsResize ? `${hashHex}_${size}x.${ext}` : `${hashHex}.${ext}`
}

export function getBackgroundThumbnailImageId(url: URL, ext: string) {
	return getThumbnailImageId(url, ext, 48)
}

export function getAvatarThumbnailImageId(url: URL, ext: string) {
	return getThumbnailImageId(url, ext, 48)
}
