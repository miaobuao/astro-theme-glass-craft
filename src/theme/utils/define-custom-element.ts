export function defineCustomElement(
	name: string,
	component: CustomElementConstructor,
	options?: ElementDefinitionOptions,
) {
	if (customElements.get(name)) {
		return
	}
	customElements.define(name, component, options)
}
