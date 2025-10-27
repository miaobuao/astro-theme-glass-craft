import { pagefindEmitter } from './emitter'

class PagefindButton extends HTMLElement {
	private handleClick = () => {
		pagefindEmitter.emit('open')
	}

	private handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			pagefindEmitter.emit('open')
			e.preventDefault()
		}
	}

	connectedCallback() {
		this.addEventListener('click', this.handleClick)
		this.addEventListener('keydown', this.handleKeydown)
	}

	disconnectedCallback() {
		this.removeEventListener('click', this.handleClick)
		this.removeEventListener('keydown', this.handleKeydown)
	}
}

customElements.define('pagefind-search-button', PagefindButton)
