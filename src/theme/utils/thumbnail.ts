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

export function getBackgroundThumbnailImageId(
	url: URL,
	ext: string = extname(url.pathname),
) {
	return getThumbnailImageId(url, ext, 48)
}

export function getAvatarThumbnailImageId(
	url: URL,
	ext: string = extname(url.pathname),
) {
	return getThumbnailImageId(url, ext, 48)
}

async function getOriginalImageId(url: URL, ext: string) {
	const buf = await getImageBytesFromUrl(url)
	const hashHex = sha256Hex(buf)
	return `${hashHex}${ext}`
}

export function getBackgroundOriginalImageId(
	url: URL,
	ext: string = extname(url.pathname),
) {
	return getOriginalImageId(url, ext)
}

export function getAvatarOriginalImageId(
	url: URL,
	ext: string = extname(url.pathname),
) {
	return getOriginalImageId(url, ext)
}

async function getThumbnailImage(url: URL, size = DEFAULT_THUMBNAIL_SIZE) {
	const buf = await getImageBytesFromUrl(url)

	const metadata = await sharp(buf).metadata()
	const width = metadata.width ?? 0
	const height = metadata.height ?? 0
	const needsResize = Math.max(width, height) > size

	if (!needsResize) {
		return sharp(buf).webp().toBuffer()
	}

	const resized = await sharp(buf)
		.resize(size, size, {
			fit: 'inside',
			withoutEnlargement: true,
		})
		.webp()
		.toBuffer()

	return resized
}

export function getBackgroundThumbnailImage(url: URL) {
	return getThumbnailImage(url, 48)
}

export function getAvatarThumbnailImage(url: URL) {
	return getThumbnailImage(url, 48)
}
