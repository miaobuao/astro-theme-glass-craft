import { clamp } from 'lodash-es'
import { createSignal, onCleanup, onMount, Show } from 'solid-js'
import type { WindowProps } from './emitter'

export function Window(
	props: WindowProps & {
		onResize: (geometry: WindowProps['geometry']) => void
		onFullscreen: () => void
		onDock: () => void
		onMove: (x: number, y: number) => void
		onClose: () => void
	},
) {
	let [isDragging, setIsDragging] = createSignal(false)

	let offsetX = 0
	let offsetY = 0

	function handleDragging(e: MouseEvent | PointerEvent) {
		if (!isDragging()) {
			return
		}

		if (
			e.pageX < 0 ||
			e.pageY < 0 ||
			e.pageX > window.innerWidth ||
			e.pageY > window.innerHeight
		) {
			handleDragEnd()
			return
		}

		e.preventDefault()
		e.stopImmediatePropagation()

		props.onMove(
			clamp(
				e.pageX + offsetX,
				-props.geometry.width / 2,
				window.innerWidth - props.geometry.width / 2,
			),
			clamp(e.pageY + offsetY, 0, window.innerHeight - 48),
		)
	}

	function handleDragStart(e: MouseEvent | PointerEvent) {
		setIsDragging(true)
		offsetX = props.geometry.x - e.pageX
		offsetY = props.geometry.y - e.pageY
		e.stopImmediatePropagation()
	}

	function handleDragEnd() {
		setIsDragging(false)
	}

	onMount(() => {
		window.addEventListener('pointermove', handleDragging)
		window.addEventListener('pointerup', handleDragEnd)
	})

	onCleanup(() => {
		window.removeEventListener('pointermove', handleDragging)
		window.removeEventListener('pointerup', handleDragEnd)
	})

	return (
		<div
			class="fixed p-1"
			style={{
				width: props.geometry.width + 'px',
				height: props.geometry.height + 'px',
				left: props.geometry.x + 'px',
				top: props.geometry.y + 'px',
			}}
		>
			<div class="h-full w-full flex flex-col glassmorphism rounded-sm m-0.5 relative">
				<section
					class="flex justify-around items-center p-1 select-none pointer-events-auto"
					on:mousedown={handleDragStart}
					on:pointerdown={handleDragStart}
					on:dblclick={() =>
						props.status === 'maximum' ? props.onDock() : props.onFullscreen()
					}
				>
					<span class="w-16"></span>
					<span class="flex-1 text-center truncate">{props.title}</span>
					<span class="flex gap-2">
						<i class="icon-[mdi--minimize] cursor-pointer"></i>
						<Show
							when={props.status === 'normal'}
							fallback={
								<i
									class="icon-[mdi--dock-window] cursor-pointer"
									on:click={props.onDock}
								></i>
							}
						>
							<i
								class="icon-[mdi--maximize] cursor-pointer"
								on:click={props.onFullscreen}
							></i>
						</Show>
						<i
							class="icon-[mdi--close] cursor-pointer"
							on:click={props.onClose}
						></i>
					</span>
				</section>

				<div class="flex-1 rounded-inherit relative">
					<Show when={isDragging()}>
						<div class="absolute inset-0"></div>
					</Show>
					<iframe
						class="h-full w-full rounded-inherit"
						src={props.url.toString()}
					></iframe>
				</div>

				<div class="absolute w-full h-1 -top-1 hover:cursor-ns-resize"></div>
				<div class="absolute w-full h-1 -bottom-1 hover:cursor-ns-resize"></div>
				<div class="absolute h-full w-1 -left-1 hover:cursor-ew-resize"></div>
				<div class="absolute h-full w-1 -right-1 hover:cursor-ew-resize"></div>
			</div>
		</div>
	)
}
