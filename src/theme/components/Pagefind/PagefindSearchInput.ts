import { debounce } from 'lodash-es'
import type { PagefindSearchResults } from './PagefindSearchResults'
import { pagefindEmitter } from './emitter'
import type { PagefindResult } from './pagefind'

class PagefindSearchInput extends HTMLElement {
	input = this.querySelector('input')!
	clearBtn = this.querySelector('button')!
	results: PagefindSearchResults = this.querySelector(
		'pagefind-search-results',
	)!

	private handleKeyup = (e: KeyboardEvent) => {
		if (e.isComposing) {
			return
		}
		this.adjustResultsHeight()
		this.search(this.input.value)
		if (this.input.value.length) {
			this.clearBtn.classList.remove('hidden')
		} else {
			this.clearBtn.classList.add('hidden')
		}
	}

	private handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			this.results.clear()
			pagefindEmitter.emit('close')
			this.input.blur()
			e.preventDefault()
		}
	}

	private handleFocus = () => {
		this.adjustResultsHeight()
		this.search(this.input.value)
	}

	private handleClearClick = (e: MouseEvent) => {
		this.input.value = ''
		pagefindEmitter.emit('close')
		this.results?.clear()
		e.preventDefault()
	}

	private handleClose = () => {
		this.results?.clear()
	}

	connectedCallback() {
		this.input.addEventListener('keyup', this.handleKeyup)
		this.input.addEventListener('keydown', this.handleKeydown)
		this.input.addEventListener('focus', this.handleFocus)
		this.clearBtn.addEventListener('mousedown', this.handleClearClick)

		// Listen for close events to clear input
		pagefindEmitter.on('close', this.handleClose)

		if (this.input.value.length) {
			this.search(this.input.value)
			this.clearBtn.classList.remove('hidden')
		}
	}

	disconnectedCallback() {
		this.input.removeEventListener('keyup', this.handleKeyup)
		this.input.removeEventListener('keydown', this.handleKeydown)
		this.input.removeEventListener('focus', this.handleFocus)
		this.clearBtn.removeEventListener('mousedown', this.handleClearClick)
		pagefindEmitter.off('close', this.handleClose)
	}

	search = debounce(async (text) => {
		if (!text.length) {
			return
		}
		// @ts-expect-error pagefind defined on window
		const searchResults = await pagefind.search(text)
		this.results.clear()
		searchResults.results.forEach(async (res: any) => {
			const data: PagefindResult = await res.data()
			const slices = data.excerpt
				.split('<mark>')
				.map((slice) => slice.split('</mark>'))
				.flat()
				.map((s) => s.trim())
			data.url += `#:~:text=${encodeURI(slices[1])}`
			this.results.push(data)
		})
	}, 200)

	adjustResultsHeight() {
		const resultRect = this.results.getBoundingClientRect()
		this.results.setAttribute(
			'style',
			`max-height:calc(100vh - ${Math.ceil(resultRect.top)}px);`,
		)
	}
}

customElements.define('pagefind-search-input', PagefindSearchInput)
