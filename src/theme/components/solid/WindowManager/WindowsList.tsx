import { For } from 'solid-js'
import { wmEmitter, type WindowProps } from './emitter'
import { windows } from './windows'

export function WindowsList(props: { className?: string }) {
	return (
		<div class={`no-scrollbar ${props.className}`}>
			<For each={windows}>{(win) => <WindowItem {...win} />}</For>
		</div>
	)
}

function WindowItem(props: WindowProps) {
	const icon = () => {
		if (props.icon) {
			if (props.icon.type === 'image') {
				return (
					<img
						src={props.icon.url.toString()}
						class={`size-[1rem] shrink-0 ${props.icon.className}`}
					/>
				)
			} else {
				return <i class={`shrink-0 ${props.icon.className}`}></i>
			}
		} else {
			return (
				<i class="size-[1.25rem] shrink-0 icon-[vscode-icons--default-file]"></i>
			)
		}
	}

	const url = () => {
		if (props.url.origin === location.origin) {
			return props.url.pathname
		} else {
			return props.url.toString()
		}
	}
	return (
		<div
			class="transition-all flex items-center gap-1 hover:glassmorphism hover:cursor-pointer border-none p-1 rounded-md select-none"
			onClick={() => {
				wmEmitter.emit('focusWindow', { id: props.id })
			}}
		>
			{icon()}
			<p class="flex-1 flex gap-1 truncate items-end">
				<span>{props.title}</span>
				<span class="text-sm font-serif italic truncate opacity-50">
					{url()}
				</span>
			</p>
			<i
				class="icon-[mdi--close] hover:scale-120 hover:rotate-180 transition-all"
				onClick={() => {
					wmEmitter.emit('closeWindow', {
						id: props.id,
					})
				}}
			></i>
		</div>
	)
}
