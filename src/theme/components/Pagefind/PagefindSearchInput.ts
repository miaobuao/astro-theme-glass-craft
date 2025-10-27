import { debounce } from 'lodash-es'
import type { PagefindSearchResults } from './PagefindSearchResults'
import type { PagefindResult } from './pagefind'

class PagefindSearchInput extends HTMLElement {
	input = this.querySelector('input')!
	clearBtn = this.querySelector('button')!
	results: PagefindSearchResults = this.querySelector(
		'pagefind-search-results',
	)!
	mask: HTMLElement = this.querySelector('pagefind-mask')!

	connectedCallback() {
		this.input.placeholder = '🔍 搜索文章...'

		this.input.addEventListener('keyup', (e) => {
			if ((e as KeyboardEvent).isComposing) {
				return
			}
			this.adjustResultsHeight()
			this.search(this.input.value)
			if (this.input.value.length) {
				this.clearBtn.classList.remove('hidden')
			} else {
				this.clearBtn.classList.add('hidden')
			}
		})

		this.input.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				this.results.clear()
				this.mask.classList.add('hidden')
				this.input.blur()
				e.preventDefault()
			}
		})

		this.input.addEventListener('focus', () => {
			this.adjustResultsHeight()
			this.search(this.input.value)
		})

		this.mask.addEventListener('click', () => {
			this.mask.classList.add('hidden')
			this.results?.clear()
		})

		this.clearBtn.addEventListener('mousedown', (e) => {
			this.input.value = ''
			this.mask?.classList.add('hidden')
			this.results?.clear()
			e.preventDefault()
		})

		if (this.input.value.length) {
			this.search(this.input.value)
			this.clearBtn.classList.remove('hidden')
		}
	}

	search = debounce(async (text) => {
		if (!text.length) {
			return
		}
		// @ts-expect-error pagefind defined on window
		const searchResults = await pagefind.search(text)
		this.results.clear()
		if (searchResults.results.length) {
			this.mask?.classList.remove('hidden')
		}
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
