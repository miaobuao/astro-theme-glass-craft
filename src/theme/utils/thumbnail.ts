import { createHash } from 'crypto'
import { extname } from 'path'
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

	return needsResize ? `${hashHex}_${size}x${ext}` : `${hashHex}${ext}`
}

async function getOriginalImageId(url: URL, ext: string) {
	const buf = await getImageBytesFromUrl(url)
	const hashHex = sha256Hex(buf)
	return `${hashHex}${ext}`
}

export function getBackgroundThumbnailImageId(
	url: URL,
	ext: string = extname(url.pathname),
) {
	return getThumbnailImageId(url, ext, 48)
}

export function getBackgroundOriginalImageId(
	url: URL,
	ext: string = extname(url.pathname),
) {
	return getOriginalImageId(url, ext)
}

export function getAvatarThumbnailImageId(
	url: URL,
	ext: string = extname(url.pathname),
) {
	return getThumbnailImageId(url, ext, 48)
}

export function getAvatarOriginalImageId(
	url: URL,
	ext: string = extname(url.pathname),
) {
	return getOriginalImageId(url, ext)
}
