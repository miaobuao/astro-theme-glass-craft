import mitt from 'mitt'

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
