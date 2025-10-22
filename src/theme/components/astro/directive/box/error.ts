import { defineCustomElement } from '../../../../utils/define-custom-element'
import { DirectiveBoxBaseElement } from './base'

export class DirectiveBoxErrorElement extends DirectiveBoxBaseElement {
	override className = 'directive error'
	override iconClass = 'icon-[mdi--error]'
	override title = 'ERROR'
}

defineCustomElement('directive-box-error', DirectiveBoxErrorElement)
