export class ScrollProgressBase extends HTMLElement {
	private resizeObserver: ResizeObserver | null = null
	private mutationObserver: MutationObserver | null = null

	static get observedAttributes() {
		return ['percentage']
	}

	get percentage() {
		const percentage = this.getAttribute('percentage')
		return percentage ? parseInt(percentage) : 0
	}

	get selector() {
		return this.dataset.selector
	}

	get targetElement() {
		return document.querySelector(this.selector!)
	}

	connectedCallback() {
		if (!this.selector) {
			console.error('ScrollProgress: selector is required')
			return
		}

		if (!this.targetElement) {
			console.error(
				`ScrollProgress: element not found for selector "${this.selector}"`,
			)
			return
		}

		this.targetElement.addEventListener('scroll', this.handleScroll)

		this.resizeObserver = new ResizeObserver(() => {
			this.handleScroll()
		})
		this.resizeObserver.observe(this.targetElement)

		this.mutationObserver = new MutationObserver(() => {
			this.handleScroll()
		})
		this.mutationObserver.observe(this.targetElement, {
			subtree: true,
			childList: true,
		})

		this.handleScroll()
	}

	disconnectedCallback() {
		if (this.targetElement) {
			this.targetElement.removeEventListener('scroll', this.handleScroll)
		}
		if (this.resizeObserver) {
			this.resizeObserver.disconnect()
		}
		if (this.mutationObserver) {
			this.mutationObserver.disconnect()
		}
	}

	private handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } = this.targetElement!
		const maxScroll = scrollHeight - clientHeight
		const percentage = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 100
		const clampedPercentage = Math.min(100, Math.max(0, percentage))
		this.setAttribute('percentage', clampedPercentage.toString())
	}
}
