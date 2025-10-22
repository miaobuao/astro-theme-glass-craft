export class DirectiveBoxBaseElement extends HTMLElement {
	public className = 'directive'
	public iconClass = ''
	public title = ''

	connectedCallback() {
		this.classList.add('block', ...this.className.split(' '))

		const outerContainer = document.createElement('div')
		outerContainer.className = 'flex flex-col gap-2 p-1'

		const title = `<div class="flex items-center gap-1">
			<i class="size-[1.5rem] ${this.iconClass}"></i>
			<span class="font-semibold">${this.title}</span>
		</div>`
		outerContainer.innerHTML = title

		const contentContainer = document.createElement('div')
		contentContainer.classList.add('px-1')
		contentContainer.append(...this.childNodes)

		outerContainer.appendChild(contentContainer)

		this.appendChild(outerContainer)
	}
}
