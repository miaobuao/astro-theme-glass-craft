import type { WindowProps } from './emitter'

export function Window(
	props: WindowProps & {
		onResize?: (width: number, height: number) => void
		onMove?: (x: number, y: number) => void
	},
) {
	return (
		<div
			class="flex flex-col fixed"
			style={{
				width: props.geometry.width + 'px',
				height: props.geometry.height + 'px',
				left: props.geometry.x + 'px',
				top: props.geometry.y + 'px',
			}}
		>
			<section class="flex">
				<span></span>
				<span>{props.title}</span>
				<span class="flex gap-1">
					<i class="icon-[mdi--minimize]"></i>
					<i class="icon-[mdi--maximize]"></i>
					<i class="icon-[mdi--close]"></i>
				</span>
			</section>

			<iframe class="flex-1" src={props.url.toString()}></iframe>
		</div>
	)
}
