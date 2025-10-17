import type { WindowProps } from './emitter'
import { WindowShell } from './WindowShell'

export function Window(
	props: WindowProps & {
		onResize: (geometry: WindowProps['geometry']) => void
		onFullscreen: () => void
		onDock: () => void
		onMove: (x: number, y: number) => void
		onClose: () => void
		onFocus: () => void
	},
) {
	return (
		<WindowShell {...props}>
			<iframe
				class="h-full w-full rounded-inherit"
				src={props.url.toString()}
				title={props.title}
			/>
		</WindowShell>
	)
}
