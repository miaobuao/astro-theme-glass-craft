import mitt from 'mitt'
import { createStore } from 'solid-js/store'

export interface WindowInitialStatus {
	url: URL
	title: string
	width?: number
	height?: number
}

export interface WindowProps {
	id: number
	url: URL
	title: string
	status: 'normal' | 'maximum' | 'minimum' | 'alwaysOnTop'

	geometry: {
		aspectRatio: number
		x: number
		y: number
		width: number
		height: number
	}

	zIndex: number
}

export type WmEmitterEvents = {
	appendWindow: WindowInitialStatus
}

export const wmEmitter = mitt<WmEmitterEvents>()

export const [windowOrder, setWindowOrder] = createStore<number[]>([])
export const [windows, setWindows] = createStore<WindowProps[]>([])

let id = 0

wmEmitter.on('appendWindow', (win) => {
	const clientWidth = window.innerWidth
	const clientHeight = window.innerHeight

	// Use provided width/height or calculate defaults
	let width =
		win.width ??
		(clientWidth > 1000 ? 438 : clientWidth >= 768 ? 375 : clientWidth)
	let height = win.height ?? Math.min(clientHeight, 768)

	// Ensure window fits within viewport
	width = Math.min(width, clientWidth)
	height = Math.min(height, clientHeight)

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
				return true
			}
		}
		return false
	}
	while (updateGeometry()) {}
	const newId = ++id
	const newWindow: WindowProps = {
		...win,
		id: newId,
		status: 'normal' as const,
		geometry: {
			x,
			y,
			width,
			height,
			aspectRatio: width / height,
		},
		zIndex: windows.length + 1, // New window gets highest z-index
	}
	setWindows([...windows, newWindow])
	setWindowOrder([...windowOrder, newId])
})
