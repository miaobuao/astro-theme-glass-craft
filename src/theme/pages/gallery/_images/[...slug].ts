import type { APIRoute, InferGetStaticPropsType } from 'astro'
import { getCollection } from 'astro:content'
import { GalleryHelper } from '../../../utils/gallery'

export async function getStaticPaths() {
	const collection = await getCollection('gallery')
	const galleries = collection.map((entry) => new GalleryHelper(entry))

	async function getStaticPathsFromGallery(gallery: GalleryHelper) {
		return await Promise.all(
			gallery.gallerySections
				.flatMap((s) => s.images)
				.filter((s) => s.absPath)
				.map(async (s) => ({
					params: {
						slug: await s.getOutputFilename(),
					},
					props: {
						buffer: await s.getBuffer(),
					},
				})),
		)
	}
	const res: Awaited<ReturnType<typeof getStaticPathsFromGallery>> = []
	for (const gallery of galleries) {
		const paths = await getStaticPathsFromGallery(gallery)
		res.push(...paths)
	}
	return res
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>

export const GET: APIRoute<Props> = async function ({ props }) {
	return new Response(props.buffer)
}
