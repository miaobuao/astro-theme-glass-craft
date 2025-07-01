import { Fancybox } from '@fancyapps/ui/dist/fancybox/'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { createEffect, createSignal, onMount } from 'solid-js'
import { layoutImages } from './layout'

export interface ImageProps {
	src: string
	alt?: string
	description?: string
}

export interface AdaptiveImageListProps {
	images: ImageProps[]
}

export function AdaptiveImageList(
	props: AdaptiveImageListProps & {
		className?: string
	},
) {
	const [loadedImages, setLoadedImages] = createSignal<
		(undefined | HTMLImageElement)[]
	>(props.images.map(() => undefined))

	const [imageSizes, setImageSizes] = createSignal<
		{ width: number; height: number }[]
	>([])

	const loadEnd = () => loadedImages().every((flag) => flag)

	const layout = () => {
		const GOLD_HEIGHT = 180
		const MAX_COL = 6
		const MIN_IMAGE_WIDTH = 200
		const imageSizes = loadedImages()
			.filter((img) => !!img)
			.map((img) => ({
				width: img!.naturalWidth,
				height: img!.naturalHeight,
			}))
		const CONTAINER_WIDTH = containerRef.getBoundingClientRect().width
		const layout = layoutImages(
			CONTAINER_WIDTH,
			imageSizes,
			GOLD_HEIGHT,
			MAX_COL,
			MIN_IMAGE_WIDTH,
		)

		const newImageSizes = []
		for (const v of layout) {
			const sizes = imageSizes.slice(v.i, v.j).map(({ width, height }) => {
				return {
					height: GOLD_HEIGHT,
					width: Math.max(width * (GOLD_HEIGHT / height), MIN_IMAGE_WIDTH),
				}
			})
			const sumWidth = sizes.reduce((acc, cur) => acc + cur.width, 0)
			const scale = CONTAINER_WIDTH / sumWidth
			const newSizes = sizes.map(({ width, height }) => ({
				width: Math.floor(width * scale),
				height: Math.floor(height * scale),
			}))
			newImageSizes.push(...newSizes)
		}
		setImageSizes(newImageSizes)
	}

	createEffect(() => {
		if (!loadEnd()) {
			return
		}
		layout()
	})

	let containerRef!: HTMLDivElement

	onMount(() => {
		window.addEventListener('resize', () => {
			layout()
		})

		Fancybox.bind('[data-fancybox]', {
			// Your custom options
		})
	})

	function numberToPx(num: number | undefined) {
		if (num === undefined) {
			return undefined
		}
		return `${num}px`
	}

	return (
		<div ref={containerRef} class={`flex flex-wrap ${props.className}`}>
			{props.images.map((image, index) => {
				return (
					<a
						style={{
							height: numberToPx(imageSizes().at(index)?.height),
							width: numberToPx(imageSizes().at(index)?.width),
						}}
						class="p-0.5 relative group"
						data-fancybox="gallery"
						data-caption={image.description}
						data-src={image.src}
					>
						<img
							src={image.src}
							alt={image.alt}
							ref={(el) => {
								if (el) {
									el.addEventListener('load', function () {
										setLoadedImages((prev) => {
											prev[index] = this
											return [...prev]
										})
									})
								}
							}}
							class="size-full rounded-sm object-cover object-center"
						/>
						<div class="absolute top-0 p-1 max-w-full invisible lg:visible">
							<p class="p-1 bg-black/30 backdrop-blur-md text-xs rounded-lg truncate max-w-full">
								{image.description}
							</p>
						</div>
					</a>
				)
			})}
		</div>
	)
}
