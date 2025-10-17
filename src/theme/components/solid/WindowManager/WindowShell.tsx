import { clamp } from 'lodash-es'
import { type JSX, Show, children, createEffect, createSignal } from 'solid-js'
import { activeElement } from '../activeElement'
import { DraggableLine } from './DraggableLine'
import type { WindowProps } from './emitter'

export interface WindowShellProps extends WindowProps {
	onResize: (geometry: WindowProps['geometry']) => void
	onFullscreen: () => void
	onDock: () => void
	onMove: (x: number, y: number) => void
	onClose: () => void
	onFocus: () => void
	children: JSX.Element
}

export function WindowShell(props: WindowShellProps) {
	let [isDragging, setIsDragging] = createSignal(false)
	let [isResizing, setIsResizing] = createSignal(false)

	const content = children(() => props.children)

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			props.onClose()
		}
	}

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

	let container: HTMLDivElement | undefined

	createEffect(() => {
		if (container?.contains(activeElement())) {
			props.onFocus()
		}
	})

	return (
		<div
			ref={container}
			class="fixed p-1"
			style={{
				width: props.geometry.width + 'px',
				height: props.geometry.height + 'px',
				left: props.geometry.x + 'px',
				top: props.geometry.y + 'px',
				'z-index': props.zIndex,
			}}
			role="dialog"
			aria-modal="false"
			tabindex={-1}
			onFocus={props.onFocus}
			onKeyDown={handleKeyDown}
		>
			<div class="h-full w-full flex flex-col glassmorphism rounded-sm m-0.5 relative">
				<section
					class="flex justify-around items-center p-1 select-none pointer-events-auto text-[1.25rem]"
					onPointerDown={handleDragStart}
					onDblClick={() =>
						props.status === 'maximum' ? props.onDock() : props.onFullscreen()
					}
				>
					<span class="w-16"></span>
					<h2 class="flex-1 text-center truncate m-0 font-normal text-base">
						{props.title}
					</h2>
					<span class="flex gap-2" role="group" aria-label="Window controls">
						<i
							class="icon-[mdi--minimize] cursor-pointer"
							aria-label="Minimize window"
							tabindex={0}
						></i>
						<Show
							when={props.status === 'normal'}
							fallback={
								<i
									class="icon-[mdi--dock-window] cursor-pointer"
									onClick={props.onDock}
									aria-label="Restore window"
									tabindex={0}
								></i>
							}
						>
							<i
								class="icon-[mdi--maximize] cursor-pointer"
								onClick={props.onFullscreen}
								aria-label="Maximize window"
								tabindex={0}
							></i>
						</Show>
						<i
							class="icon-[mdi--close] cursor-pointer"
							onClick={props.onClose}
							aria-label="Close window"
							tabindex={0}
						></i>
					</span>
				</section>

				<div class="flex-1 rounded-inherit relative overflow-hidden">
					<Show when={isDragging() || isResizing()}>
						<div class="absolute inset-0 select-none"></div>
					</Show>
					<div
						class={`h-full w-full rounded-inherit ${isDragging() || isResizing() ? 'select-none' : ''}`}
					>
						{content()}
					</div>
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
