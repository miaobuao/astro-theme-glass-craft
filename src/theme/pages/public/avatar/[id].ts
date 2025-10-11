import type { APIRoute, InferGetStaticPropsType } from 'astro'
import { config } from '../../../consts'
import {
	getAvatarOriginalImage,
	getAvatarOriginalImageId,
	getAvatarThumbnailImage,
	getAvatarThumbnailImageId,
} from '../../../utils/thumbnail'

export async function getStaticPaths() {
	const paths = []

	// Author avatar
	const avatar = config.author.avatar
	if (avatar.type === 'progressive') {
		const avatarUrl = avatar.url
		const [thumbnailId, originalId] = await Promise.all([
			getAvatarThumbnailImageId(avatarUrl),
			getAvatarOriginalImageId(avatarUrl),
		])

		paths.push(
			{
				params: { id: thumbnailId },
				props: { url: avatarUrl, isThumbnail: true },
			},
			{
				params: { id: originalId },
				props: { url: avatarUrl, isThumbnail: false },
			},
		)
	}

	// Friend avatars
	if (config.friends) {
		for (const friend of config.friends) {
			if (friend.avatar.type === 'progressive') {
				const friendAvatarUrl = friend.avatar.url
				const [thumbnailId, originalId] = await Promise.all([
					getAvatarThumbnailImageId(friendAvatarUrl),
					getAvatarOriginalImageId(friendAvatarUrl),
				])

				paths.push(
					{
						params: { id: thumbnailId },
						props: { url: friendAvatarUrl, isThumbnail: true },
					},
					{
						params: { id: originalId },
						props: { url: friendAvatarUrl, isThumbnail: false },
					},
				)
			}
		}
	}

	return paths
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>

export const GET: APIRoute<Props> = async function ({ props }) {
	const buffer = props.isThumbnail
		? await getAvatarThumbnailImage(props.url)
		: await getAvatarOriginalImage(props.url)

	return new Response(new Uint8Array(buffer), {
		headers: {
			'Content-Type': 'image/webp',
		},
	})
}
