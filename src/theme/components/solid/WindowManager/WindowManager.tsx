import { For, onMount } from 'solid-js'
import { createStore } from 'solid-js/store'
import { wmEmitter, type WindowProps } from './emitter'
import { Window } from './Window'

export function WindowManager() {
	const [windows, setWindows] = createStore<WindowProps[]>([])
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
	onMount(() => {
		wmEmitter.on('appendWindow', (win) => {
			const clientWidth = window.innerWidth
			const clientHeight = window.innerHeight
			let width =
				clientWidth > 1000 ? 438 : clientWidth >= 768 ? 375 : clientWidth
			let height = Math.min(clientHeight, 768)
			let x = clientWidth - width
			let y = 0
			function updateGeometry() {
				for (const win of windows) {
					if (
						win.geometry.x === x &&
						win.geometry.y === y &&
						win.geometry.width === width
					) {
						y += 32
						x -= 32
						return true
					}
				}
				return false
			}
			while (updateGeometry()) {}
			setWindows([
				...windows,
				{
					...win,
					id: ++id,
					status: 'normal',
					geometry: {
						x,
						y,
						width,
						height,
						aspectRatio: width / height,
					},
					zIndex: 0,
				},
			])
		})
	})

	return (
		<div>
			<For each={windows}>
				{(win) => (
					<Window
						{...win}
						onClose={() => {
							setWindows((prevWindows) =>
								prevWindows.filter(({ id }) => id !== win.id),
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
