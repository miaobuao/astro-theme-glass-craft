import sharp from 'sharp'
import { existsSync } from 'fs'

export interface ImageDimensions {
	width: number
	height: number
}

/**
 * Get image dimensions from file path
 * @param absPath Absolute path to image file
 * @returns Image dimensions or undefined if not an image or error occurs
 */
export async function getImageDimensions(
	absPath: string,
): Promise<ImageDimensions | undefined> {
	try {
		if (!existsSync(absPath)) {
			return undefined
		}

		const metadata = await sharp(absPath).metadata()

		if (!metadata.width || !metadata.height) {
			return undefined
		}

		return {
			width: metadata.width,
			height: metadata.height,
		}
	} catch (error) {
		// Not an image file or error reading
		return undefined
	}
}
