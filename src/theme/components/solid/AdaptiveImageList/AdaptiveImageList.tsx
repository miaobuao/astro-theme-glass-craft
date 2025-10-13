import '@fancyapps/ui/dist/fancybox/fancybox.css'

import { Fancybox } from '@fancyapps/ui/dist/fancybox/'
import { createEffect, createSignal, onMount } from 'solid-js'
import { createBreakpoints } from '../breakpoints'
import { layoutImages, type Size } from './layout'

export interface ImageProps {
	naturalWidth: number
	naturalHeight: number
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

	const naturalImageSizes = () => {
		const loaded = loadedImages()
		return props.images.map((img, idx) => {
			const load = loaded[idx]
			if (load) {
				return {
					width: load.naturalWidth,
					height: load.naturalHeight,
				}
			}
			return {
				width: img.naturalWidth,
				height: img.naturalHeight,
			}
		})
	}

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
		const imageSizes = naturalImageSizes()
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
		layout()
	})

	let containerRef!: HTMLDivElement

	onMount(() => {
		layout()

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
						class="p-1 relative"
						data-fancybox="gallery"
						data-caption={image.description}
						data-src={image.src}
					>
						<div class="relative size-full rounded-sm">
							<div
								role="status"
								class="size-full animate-pulse flex items-center justify-center rounded-inherit glassmorphism relative"
							>
								<span class="icon-[ant-design--picture-filled] size-10 md:size-14"></span>
								<span class="sr-only">Loading...</span>
							</div>
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
								class="transition size-full rounded-inherit object-cover object-center absolute top-0 left-0 hover:scale-102 duration-300 cursor-pointer"
								loading="lazy"
							/>
						</div>
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
