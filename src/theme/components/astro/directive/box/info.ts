import { defineCustomElement } from '../../../../utils/define-custom-element'
import { DirectiveBoxBaseElement } from './base'

export class DirectiveBoxInfoElement extends DirectiveBoxBaseElement {
	override className = 'directive info'
	override iconClass = 'icon-[icon-park-solid--tips-one]'
	override title = 'INFO'
}

defineCustomElement('directive-box-info', DirectiveBoxInfoElement)
