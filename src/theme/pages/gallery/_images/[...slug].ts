import type { APIRoute, InferGetStaticPropsType } from 'astro'
import { getCollection } from 'astro:content'
import sharp from 'sharp'
import { GALLERY_THUMBNAIL_CONFIG } from '../../../consts'
import { GalleryHelper, getResizedOutputFilename } from '../../../utils/gallery'

export async function getStaticPaths() {
	const collection = await getCollection('gallery')
	const galleries = collection.map((entry) => new GalleryHelper(entry))

	async function getStaticPathsFromGallery(gallery: GalleryHelper) {
		const paths = await Promise.all(
			gallery.gallerySections
				.flatMap((s) => s.images)
				.filter((s) => s.absPath)
				.map(async (img) => ({
					params: {
						slug: await img.getOutputFilename(),
					},
					props: {
						buffer: await img.getBuffer(),
					},
				})),
		)

		async function generateThumbnail(
			maxSize: number,
			format: 'avif' | 'webp' = 'webp',
		) {
			return await Promise.all(
				paths.map(async (p) => {
					const outputFilename = getResizedOutputFilename(
						p.params.slug!,
						maxSize,
						format,
					)
					let image = sharp(p.props.buffer)
					const metadata = await image.metadata()
					const aspectRadio = metadata.width / metadata.height
					if (metadata.height > metadata.width) {
						if (metadata.height > maxSize) {
							image = image.resize({
								width: Math.floor(maxSize * aspectRadio),
								height: Math.floor(maxSize),
							})
						}
					} else {
						if (metadata.width > maxSize) {
							image = image.resize({
								width: Math.floor(maxSize),
								height: Math.floor(maxSize / aspectRadio),
							})
						}
					}
					if (format === 'avif') {
						image = image.avif()
					} else if (format === 'webp') {
						image = image.webp()
					}
					return {
						params: {
							slug: outputFilename,
						},
						props: {
							buffer: await image.toBuffer(),
						},
					}
				}),
			)
		}
		const maxSize = GALLERY_THUMBNAIL_CONFIG.size
		const thumbnailFormat = GALLERY_THUMBNAIL_CONFIG.format
		return [
			paths,
			await generateThumbnail(maxSize, thumbnailFormat),
			await generateThumbnail(maxSize, thumbnailFormat),
		].flat()
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
