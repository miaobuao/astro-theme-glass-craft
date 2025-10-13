import type { APIRoute, InferGetStaticPropsType } from 'astro'
import { config } from '../../../consts'
import {
	getOriginalImage,
	getOriginalImageId,
	getThumbnailImage,
	getThumbnailImageId,
} from '../../../utils/thumbnail'

export async function getStaticPaths() {
	const paths = []

	// Author avatar
	const avatar = config.author.avatar

	const avatarUrl = new URL(avatar.url)
	const [thumbnailId, originalId] = await Promise.all([
		getThumbnailImageId(avatarUrl),
		getOriginalImageId(avatarUrl),
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

	// Friend avatars
	if (config.friends) {
		for (const friend of config.friends) {
			const friendAvatarUrl = new URL(friend.avatar.url)
			const [thumbnailId, originalId] = await Promise.all([
				getThumbnailImageId(friendAvatarUrl),
				getOriginalImageId(friendAvatarUrl),
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

	// Background
	if (config.backgroundImage) {
		const bgUrl = new URL(config.backgroundImage.url)

		const [thumbnailId, originalId] = await Promise.all([
			getThumbnailImageId(bgUrl),
			getOriginalImageId(bgUrl),
		])

		paths.push(
			{
				params: { id: thumbnailId },
				props: { url: bgUrl, isThumbnail: true },
			},
			{
				params: { id: originalId },
				props: { url: bgUrl, isThumbnail: false },
			},
		)
	}

	return paths
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>

export const GET: APIRoute<Props> = async function ({ props }) {
	const buffer = props.isThumbnail
		? await getThumbnailImage(props.url)
		: await getOriginalImage(props.url)

	return new Response(new Uint8Array(buffer), {
		headers: {
			'Content-Type': 'image/webp',
		},
	})
}
