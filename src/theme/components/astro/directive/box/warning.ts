import { defineCustomElement } from '../../../../utils/define-custom-element'
import { DirectiveBoxBaseElement } from './base'

export class DirectiveBoxWarningElement extends DirectiveBoxBaseElement {
	override className = 'directive warning'
	override iconClass = 'icon-[mdi--warning-box]'
	override title = 'WARNING'
}

defineCustomElement('directive-box-warning', DirectiveBoxWarningElement)
