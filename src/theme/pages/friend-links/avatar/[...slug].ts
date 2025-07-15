import type { APIRoute, InferGetStaticPropsType } from 'astro'
import { digest, hash } from 'ohash'

import sharp from 'sharp'
import { config } from '../../../consts'
import { isValidHttpUrl } from '../../../utils/is-valid-http-url'

export async function getStaticPaths() {
	return await Promise.all(
		config.friends
			?.filter((f) => isValidHttpUrl(f.avatar.url))
			.map(async (f) => {
				const slug = digest(hash(f)) + '.webp'
				const buffer = await fetch(f.avatar.url).then((d) => d.arrayBuffer())
				const image = sharp(buffer).webp()
				const newBuffer = await image.toBuffer()
				return {
					params: {
						slug,
					},
					props: { buffer: newBuffer },
				}
			}) ?? [],
	)
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>

export const GET: APIRoute<Props> = async function ({ props }) {
	return new Response(props.buffer)
}
