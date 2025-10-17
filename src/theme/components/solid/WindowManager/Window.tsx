import { clamp } from 'lodash-es'
import { createSignal, Show } from 'solid-js'
import { DraggableLine } from './DraggableLine'
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
	let [isResizing, setIsResizing] = createSignal(false)

	let offsetX = 0
	let offsetY = 0
	let currentPageX = 0
	let currentPageY = 0
	let lastX = 0
	let lastY = 0
	let rafId: number | null = null

	function updatePosition() {
		const newX = clamp(
			currentPageX + offsetX,
			-props.geometry.width / 2,
			window.innerWidth - props.geometry.width / 2,
		)
		const newY = clamp(currentPageY + offsetY, 0, window.innerHeight - 48)

		// Only update if position actually changed
		if (newX !== lastX || newY !== lastY) {
			lastX = newX
			lastY = newY
			props.onMove(newX, newY)
		}

		// Continue animation loop while dragging
		if (isDragging()) {
			rafId = requestAnimationFrame(updatePosition)
		}
	}

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

		// Only update mouse position, rAF will handle the actual update
		currentPageX = e.pageX
		currentPageY = e.pageY
	}

	function handleDragStart(e: PointerEvent) {
		setIsDragging(true)
		offsetX = props.geometry.x - e.pageX
		offsetY = props.geometry.y - e.pageY
		currentPageX = e.pageX
		currentPageY = e.pageY
		lastX = props.geometry.x
		lastY = props.geometry.y
		e.stopImmediatePropagation()

		// Start rAF loop
		rafId = requestAnimationFrame(updatePosition)

		// Add listeners when drag starts
		window.addEventListener('pointermove', handleDragging)
		window.addEventListener('pointerup', handleDragEnd)
	}

	function handleDragEnd() {
		setIsDragging(false)

		// Cancel rAF loop
		if (rafId !== null) {
			cancelAnimationFrame(rafId)
			rafId = null
		}

		// Remove listeners when drag ends
		window.removeEventListener('pointermove', handleDragging)
		window.removeEventListener('pointerup', handleDragEnd)
	}

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
					onPointerDown={handleDragStart}
					onDblClick={() =>
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
									onClick={props.onDock}
								></i>
							}
						>
							<i
								class="icon-[mdi--maximize] cursor-pointer"
								onClick={props.onFullscreen}
							></i>
						</Show>
						<i
							class="icon-[mdi--close] cursor-pointer"
							onClick={props.onClose}
						></i>
					</span>
				</section>

				<div class="flex-1 rounded-inherit relative">
					<Show when={isDragging() || isResizing()}>
						<div class="absolute inset-0 select-none"></div>
					</Show>
					<iframe
						class={`h-full w-full rounded-inherit ${isDragging() || isResizing() ? 'select-none' : ''}`}
						src={props.url.toString()}
					></iframe>
				</div>

				<DraggableLine
					edge="top"
					geometry={props.geometry}
					onResize={props.onResize}
					onResizingChange={setIsResizing}
				/>
				<DraggableLine
					edge="bottom"
					geometry={props.geometry}
					onResize={props.onResize}
					onResizingChange={setIsResizing}
				/>
				<DraggableLine
					edge="left"
					geometry={props.geometry}
					onResize={props.onResize}
					onResizingChange={setIsResizing}
				/>
				<DraggableLine
					edge="right"
					geometry={props.geometry}
					onResize={props.onResize}
					onResizingChange={setIsResizing}
				/>
				<DraggableLine
					edge="top-left"
					geometry={props.geometry}
					onResize={props.onResize}
					onResizingChange={setIsResizing}
				/>
				<DraggableLine
					edge="top-right"
					geometry={props.geometry}
					onResize={props.onResize}
					onResizingChange={setIsResizing}
				/>
				<DraggableLine
					edge="bottom-left"
					geometry={props.geometry}
					onResize={props.onResize}
					onResizingChange={setIsResizing}
				/>
				<DraggableLine
					edge="bottom-right"
					geometry={props.geometry}
					onResize={props.onResize}
					onResizingChange={setIsResizing}
				/>
			</div>
		</div>
	)
}
