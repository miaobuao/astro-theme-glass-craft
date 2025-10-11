import type { APIRoute, InferGetStaticPropsType } from 'astro'
import { config } from '../../../consts'
import {
	getBackgroundOriginalImage,
	getBackgroundOriginalImageId,
	getBackgroundThumbnailImage,
	getBackgroundThumbnailImageId,
} from '../../../utils/thumbnail'

export async function getStaticPaths() {
	const backgroundImage = config.backgroundImage

	if (!backgroundImage || backgroundImage.type !== 'progressive') {
		return []
	}

	const bgUrl = backgroundImage.url

	const [thumbnailId, originalId] = await Promise.all([
		getBackgroundThumbnailImageId(bgUrl),
		getBackgroundOriginalImageId(bgUrl),
	])

	return [
		{
			params: { id: thumbnailId },
			props: { url: bgUrl, isThumbnail: true },
		},
		{
			params: { id: originalId },
			props: { url: bgUrl, isThumbnail: false },
		},
	]
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>

export const GET: APIRoute<Props> = async function ({ props }) {
	const buffer = props.isThumbnail
		? await getBackgroundThumbnailImage(props.url)
		: await getBackgroundOriginalImage(props.url)

	return new Response(new Uint8Array(buffer), {
		headers: {
			'Content-Type': 'image/webp',
		},
	})
}
