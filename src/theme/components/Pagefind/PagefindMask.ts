import { pagefindEmitter } from './emitter'

class PagefindMask extends HTMLElement {
	private handleOpen = () => this.show()
	private handleClose = () => this.hide()
	private handleClick = (e: Event) => {
		if (e.target === this) {
			pagefindEmitter.emit('close')
		}
	}

	connectedCallback() {
		// Listen for events to show/hide the modal
		pagefindEmitter.on('open', this.handleOpen)
		pagefindEmitter.on('close', this.handleClose)

		// Close modal when clicking on the mask background
		this.addEventListener('click', this.handleClick)
	}

	disconnectedCallback() {
		// Clean up event listeners
		pagefindEmitter.off('open', this.handleOpen)
		pagefindEmitter.off('close', this.handleClose)
		this.removeEventListener('click', this.handleClick)
	}

	show() {
		this.classList.remove('hidden')
		const input = this.querySelector('input')
		input?.focus()
	}

	hide() {
		this.classList.add('hidden')
	}
}

customElements.define('pagefind-mask', PagefindMask)
