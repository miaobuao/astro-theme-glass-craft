import { createHash } from 'crypto'
import sharp from 'sharp'
import { getImageBytesFromUrl } from './get-image-bytes-from-url'

const DEFAULT_THUMBNAIL_SIZE = 12

function sha256Hex(buf: Uint8Array) {
	return createHash('sha256').update(buf).digest('hex')
}

export async function getThumbnailImageId(
	url: URL,
	ext: string = '.webp',
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

export async function getOriginalImageId(url: URL, ext: string = '.webp') {
	const buf = await getImageBytesFromUrl(url)
	const hashHex = sha256Hex(buf)
	return `${hashHex}${ext}`
}

export async function getThumbnailImage(
	url: URL,
	size = DEFAULT_THUMBNAIL_SIZE,
) {
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

export async function getOriginalImage(url: URL) {
	const buf = await getImageBytesFromUrl(url)
	// Convert to webp but keep original size
	return sharp(buf).webp().toBuffer()
}

export async function toAbsoluteUrl(id: string) {
	return `/images/${id}`
}
