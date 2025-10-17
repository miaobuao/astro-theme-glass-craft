import { createSignal } from 'solid-js'

function update() {
	if (activeElement() !== document.activeElement) {
		setActiveElement(document.activeElement)
	}
	requestAnimationFrame(update)
}

requestAnimationFrame(update)

export const [activeElement, setActiveElement] = createSignal<Element | null>(
	null,
)
