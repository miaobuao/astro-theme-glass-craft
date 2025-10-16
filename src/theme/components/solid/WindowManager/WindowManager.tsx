import { For, onMount } from 'solid-js'
import { createStore } from 'solid-js/store'
import { wmEmitter, type WindowProps } from './emitter'
import { Window } from './Window'

export function WindowManager() {
	const [windows, setWindows] = createStore<WindowProps[]>([])
	const lastGeometryMap = new Map<number, WindowProps['geometry']>()

	let id = 0
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
								(g) => ({ ...geometry }),
							)
						}}
						onFullscreen={() => {
							lastGeometryMap.set(win.id, { ...win.geometry })
							setWindows(
								(w) => w.id === win.id,
								'geometry',
								(g) => ({
									...g,
									width: window.innerWidth,
									height: window.innerHeight,
									x: 0,
									y: 0,
								}),
							)
							setWindows(
								(w) => w.id === win.id,
								'status',
								(g) => 'maximum' as const,
							)
						}}
						onDock={() => {
							const geometry = lastGeometryMap.get(win.id)!
							lastGeometryMap.delete(win.id)
							setWindows(
								(w) => w.id === win.id,
								'geometry',
								(g) => geometry,
							)
							setWindows(
								(w) => w.id === win.id,
								'status',
								(g) => 'normal' as const,
							)
						}}
					/>
				)}
			</For>
		</div>
	)
}
