import type { PagefindResult } from './pagefind'

export class PagefindSearchResultItem extends HTMLElement {
	constructor(public result: PagefindResult) {
		super()
	}

	connectedCallback() {
		const template = document.getElementById(
			'template-pagefind-search-result-item',
		) as HTMLTemplateElement

		if (!template) {
			console.error('Pagefind result item template not found')
			return
		}

		this.appendChild(template.content.cloneNode(true))

		const link = this.querySelector('a')
		if (link) {
			link.href = this.result.url
			link
		}
		this.querySelector('p')!.textContent = this.result.meta.title || 'Untitled'

		const excerpt = this.querySelector('.excerpt')
		if (excerpt) {
			excerpt.innerHTML = this.result.excerpt
		}
	}
}

customElements.define('pagefind-search-result-item', PagefindSearchResultItem)
