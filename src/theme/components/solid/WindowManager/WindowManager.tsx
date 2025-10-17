import { For } from 'solid-js'
import {
	setWindowOrder,
	setWindows,
	windowOrder,
	windows,
	type WindowProps,
} from './emitter'
import { Window } from './Window'

export function WindowManager() {
	const lastGeometryMap = new Map<number, WindowProps['geometry']>()
	const animationRafMap = new Map<number, number>()

	let id = 0

	// Easing function for smooth animation
	function easeOutCubic(t: number): number {
		return 1 - Math.pow(1 - t, 3)
	}

	// Lerp helper for interpolating between values
	function lerp(start: number, end: number, t: number): number {
		return start + (end - start) * t
	}

	// Handle window focus - reorder and reassign z-index
	function handleFocus(winId: number) {
		const orderIndex = windowOrder.findIndex((id) => id === winId)
		if (orderIndex === -1 || orderIndex === windowOrder.length - 1) {
			return // Already on top or not found
		}

		// Calculate new order
		const newOrder = [
			...windowOrder.slice(0, orderIndex),
			...windowOrder.slice(orderIndex + 1),
			winId,
		]

		// Update window order
		setWindowOrder(newOrder)

		// Reassign z-index to all windows based on new order
		newOrder.forEach((id, index) => {
			setWindows(
				(w) => w.id === id,
				'zIndex',
				() => index + 1,
			)
		})
	}

	// Animate geometry changes with RAF
	function animateGeometry(
		winId: number,
		startGeometry: WindowProps['geometry'],
		endGeometry: WindowProps['geometry'],
		duration: number = 300,
		onComplete?: () => void,
	) {
		// Cancel any existing animation for this window
		const existingRaf = animationRafMap.get(winId)
		if (existingRaf) {
			cancelAnimationFrame(existingRaf)
		}

		const startTime = performance.now()

		function animate(currentTime: number) {
			const elapsed = currentTime - startTime
			const progress = Math.min(elapsed / duration, 1)
			const easedProgress = easeOutCubic(progress)

			const currentGeometry = {
				x: lerp(startGeometry.x, endGeometry.x, easedProgress),
				y: lerp(startGeometry.y, endGeometry.y, easedProgress),
				width: lerp(startGeometry.width, endGeometry.width, easedProgress),
				height: lerp(startGeometry.height, endGeometry.height, easedProgress),
				aspectRatio: endGeometry.aspectRatio,
			}

			setWindows(
				(w) => w.id === winId,
				'geometry',
				() => currentGeometry,
			)

			if (progress < 1) {
				const rafId = requestAnimationFrame(animate)
				animationRafMap.set(winId, rafId)
			} else {
				animationRafMap.delete(winId)
				onComplete?.()
			}
		}

		const rafId = requestAnimationFrame(animate)
		animationRafMap.set(winId, rafId)
	}

	return (
		<div>
			<For each={windows}>
				{(win) => (
					<Window
						{...win}
						onFocus={() => handleFocus(win.id)}
						onClose={() => {
							setWindows((prevWindows) =>
								prevWindows.filter(({ id }) => id !== win.id),
							)
							setWindowOrder((prevOrder) =>
								prevOrder.filter((id) => id !== win.id),
							)
						}}
						onMove={(x, y) => {
							setWindows(
								(w) => w.id === win.id,
								'geometry',
								(g) => ({ ...g, x, y }),
							)
						}}
						onResize={(geometry) => {
							setWindows(
								(w) => w.id === win.id,
								'geometry',
								() => ({ ...geometry }),
							)
						}}
						onFullscreen={() => {
							lastGeometryMap.set(win.id, { ...win.geometry })
							const targetGeometry = {
								width: window.innerWidth,
								height: window.innerHeight,
								x: 0,
								y: 0,
								aspectRatio: window.innerWidth / window.innerHeight,
							}
							animateGeometry(win.id, win.geometry, targetGeometry, 300, () => {
								setWindows(
									(w) => w.id === win.id,
									'status',
									() => 'maximum' as const,
								)
							})
						}}
						onDock={() => {
							const geometry = lastGeometryMap.get(win.id)!
							lastGeometryMap.delete(win.id)
							animateGeometry(win.id, win.geometry, geometry, 300, () => {
								setWindows(
									(w) => w.id === win.id,
									'status',
									() => 'normal' as const,
								)
							})
						}}
					/>
				)}
			</For>
		</div>
	)
}
