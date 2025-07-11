import { Fancybox } from '@fancyapps/ui/dist/fancybox/'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { createEffect, createSignal, onMount } from 'solid-js'
import { createBreakpoints } from '../breakpoints'
import { layoutImages, type Size } from './layout'
export interface ImageProps {
	src: string
	alt?: string
	description?: string
	thumbnailUrl?: string
}

export interface AdaptiveImageListProps {
	images: ImageProps[]
}

export function AdaptiveImageList(
	props: AdaptiveImageListProps & {
		className?: string
	},
) {
	const breakpoints = createBreakpoints()
	const [loadedImages, setLoadedImages] = createSignal<
		(undefined | HTMLImageElement)[]
	>(props.images.map(() => undefined))

	const [imageSizes, setImageSizes] = createSignal<
		{ width: number; height: number }[]
	>([])

	const loadEnd = () => loadedImages().every((flag) => flag)

	const layout = () => {
		let GOLD_HEIGHT = 224
		let MIN_IMAGE_WIDTH = 224
		let MAX_COL = 3
		if (breakpoints.md()) {
			GOLD_HEIGHT = 384
			MIN_IMAGE_WIDTH = 384
		}
		if (breakpoints.lg()) {
			MAX_COL = 4
		}
		if (breakpoints['2xl']()) {
			MAX_COL = 5
		}
		const imageSizes = loadedImages()
			.filter((img) => !!img)
			.map((img) => ({
				width: img!.naturalWidth,
				height: img!.naturalHeight,
			}))
		const aspectRadios = imageSizes.map(({ width, height }) => width / height)
		const CONTAINER_WIDTH = containerRef.getBoundingClientRect().width
		const layout = layoutImages(
			CONTAINER_WIDTH,
			aspectRadios,
			GOLD_HEIGHT,
			MAX_COL,
			MIN_IMAGE_WIDTH,
		)

		const newImageSizes: Size[] = []
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
			Hash: false,
		})
	})

	function numberToPx(num: number | undefined) {
		if (num === undefined) {
			return undefined
		}
		return `${num}px`
	}

	return (
		<div ref={containerRef} class={`flex flex-wrap ${props.className || ''}`}>
			{props.images.map((image, index) => {
				return (
					<a
						style={{
							height: numberToPx(imageSizes().at(index)?.height),
							width: numberToPx(imageSizes().at(index)?.width),
						}}
						class="p-1 relative hover:scale-101"
						data-fancybox="gallery"
						data-caption={image.description}
						data-src={image.src}
					>
						<img
							src={image.thumbnailUrl || image.src}
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
							class="transition size-full rounded-sm object-cover object-center"
						/>
						<div class="absolute top-0 pt-2 px-1 max-w-full invisible lg:visible">
							<p class="p-1 glassmorphism text-xs rounded-lg truncate max-w-full">
								{image.description}
							</p>
						</div>
					</a>
				)
			})}
		</div>
	)
}
