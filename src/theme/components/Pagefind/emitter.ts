import mitt from 'mitt'

export type PagefindEmitterEvents = {
	open: void
	close: void
}

export const pagefindEmitter = mitt<PagefindEmitterEvents>()
