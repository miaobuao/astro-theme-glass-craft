import { clamp } from 'lodash-es'
import mitt from 'mitt'
import { batch } from 'solid-js'
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

export function isOuterWindow(win: WindowProps) {
	const { x, y, width, height } = win.geometry
	return (
		x + width > window.innerWidth ||
		y + height > window.innerHeight ||
		x < 0 ||
		y < 0
	)
}

window.addEventListener('resize', () => {
	const MIN_WIDTH = Math.min(window.innerWidth, 300)
	const MIN_HEIGHT = Math.min(window.innerHeight, 400)

	batch(() => {
		for (const win of windows) {
			if (!isOuterWindow(win)) {
				continue
			}
			let { x, y, width, height } = win.geometry
			const maxWidth = clamp(width, MIN_WIDTH, window.innerWidth)
			const maxHeight = clamp(height, MIN_HEIGHT, window.innerHeight)
			const scale = Math.min(maxWidth / width, maxHeight / height)
			width = Math.floor(scale * width)
			height = Math.floor(scale * height)
			if (x + width / 2 > window.innerWidth) {
				x = Math.max(0, window.innerWidth - width / 2)
			}
			if (y > window.innerHeight - 48) {
				y = clamp(y, 0, window.innerHeight - 48)
			}
			setWindows(
				(w) => w.id === win.id,
				'geometry',
				(g) => ({ ...g, x, y, width, height }),
			)
		}
	})
})
