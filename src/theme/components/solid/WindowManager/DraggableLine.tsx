import { clamp } from 'lodash-es'
import { createSignal } from 'solid-js'
import type { WindowProps } from './emitter'

type EdgeType = 'top' | 'bottom' | 'left' | 'right'

interface DraggableLineProps {
	edge: EdgeType
	geometry: WindowProps['geometry']
	onResize: (geometry: WindowProps['geometry']) => void
	onResizingChange?: (isResizing: boolean) => void
	minWidth?: number
	minHeight?: number
}

export function DraggableLine(props: DraggableLineProps) {
	const [isResizing, setIsResizing] = createSignal(false)

	const minWidth = props.minWidth ?? 300
	const minHeight = props.minHeight ?? 200

	let startX = 0
	let startY = 0
	let currentPageX = 0
	let currentPageY = 0
	let startGeometry = { ...props.geometry }
	let lastGeometry = { ...props.geometry }
	let rafId: number | null = null

	function updateGeometry() {
		const deltaX = currentPageX - startX
		const deltaY = currentPageY - startY

		let newGeometry = { ...startGeometry }

		switch (props.edge) {
			case 'top':
				// Resize from top edge - changes y and height
				newGeometry.height = clamp(
					startGeometry.height - deltaY,
					minHeight,
					window.innerHeight - startGeometry.y - deltaY,
				)
				newGeometry.y =
					startGeometry.y + (startGeometry.height - newGeometry.height)
				break

			case 'bottom':
				// Resize from bottom edge - only changes height
				newGeometry.height = clamp(
					startGeometry.height + deltaY,
					minHeight,
					window.innerHeight - startGeometry.y,
				)
				break

			case 'left':
				// Resize from left edge - changes x and width
				newGeometry.width = clamp(
					startGeometry.width - deltaX,
					minWidth,
					window.innerWidth - startGeometry.x - deltaX,
				)
				newGeometry.x =
					startGeometry.x + (startGeometry.width - newGeometry.width)
				break

			case 'right':
				// Resize from right edge - only changes width
				newGeometry.width = clamp(
					startGeometry.width + deltaX,
					minWidth,
					window.innerWidth - startGeometry.x,
				)
				break
		}

		const aspectRatio = newGeometry.width / newGeometry.height

		// Only update if geometry actually changed
		if (
			newGeometry.x !== lastGeometry.x ||
			newGeometry.y !== lastGeometry.y ||
			newGeometry.width !== lastGeometry.width ||
			newGeometry.height !== lastGeometry.height
		) {
			lastGeometry = { ...newGeometry, aspectRatio }
			props.onResize({
				...newGeometry,
				aspectRatio,
			})
		}

		// Continue animation loop while resizing
		if (isResizing()) {
			rafId = requestAnimationFrame(updateGeometry)
		}
	}

	function handleResizing(e: MouseEvent | PointerEvent) {
		if (!isResizing()) {
			return
		}

		e.preventDefault()
		e.stopImmediatePropagation()

		// Only update mouse position, rAF will handle the actual update
		currentPageX = e.pageX
		currentPageY = e.pageY
	}

	function handleResizeStart(e: PointerEvent) {
		setIsResizing(true)
		props.onResizingChange?.(true)
		startX = e.pageX
		startY = e.pageY
		currentPageX = e.pageX
		currentPageY = e.pageY
		startGeometry = { ...props.geometry }
		lastGeometry = { ...props.geometry }
		e.stopImmediatePropagation()

		// Start rAF loop
		rafId = requestAnimationFrame(updateGeometry)

		window.addEventListener('pointermove', handleResizing)
		window.addEventListener('pointerup', handleResizeEnd)
	}

	function handleResizeEnd() {
		setIsResizing(false)
		props.onResizingChange?.(false)

		// Cancel rAF loop
		if (rafId !== null) {
			cancelAnimationFrame(rafId)
			rafId = null
		}

		window.removeEventListener('pointermove', handleResizing)
		window.removeEventListener('pointerup', handleResizeEnd)
	}

	const edgeStyles = () => {
		switch (props.edge) {
			case 'top':
				return 'absolute w-full h-1 -top-1 hover:cursor-ns-resize'
			case 'bottom':
				return 'absolute w-full h-1 -bottom-1 hover:cursor-ns-resize'
			case 'left':
				return 'absolute h-full w-1 -left-1 hover:cursor-ew-resize'
			case 'right':
				return 'absolute h-full w-1 -right-1 hover:cursor-ew-resize'
		}
	}

	return <div class={edgeStyles()} onPointerDown={handleResizeStart}></div>
}
