import type { WindowProps } from './emitter'

export function Window(props: WindowProps) {
	return (
		<div>
			<iframe src={props.url.toString()}></iframe>
		</div>
	)
}
