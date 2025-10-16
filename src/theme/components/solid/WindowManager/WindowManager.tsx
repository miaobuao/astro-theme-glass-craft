import { createSignal, For, onMount } from 'solid-js'
import { wmEmitter, type WindowProps } from './emitter'
import { Window } from './Window'

export function WindowManager() {
	const [windows, setWindows] = createSignal<WindowProps[]>([])
	let id = 0
	onMount(() => {
		wmEmitter.on('appendWindow', (win) => {
			setWindows([
				...windows(),
				{
					...win,
					id: ++id,
					status: 'normal',
					geometry: {
						x: 0,
						y: 0,
						width: 100,
						height: 100,
						aspectRatio: 1,
					},
					zIndex: 0,
				},
			])
		})
	})

	return (
		<div>
			<For each={windows()}>{(win) => <Window {...win} />}</For>
		</div>
	)
}
