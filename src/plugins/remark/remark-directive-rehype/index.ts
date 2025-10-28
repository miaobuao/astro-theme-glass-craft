import { h } from 'hastscript'
import { isString } from 'lodash-es'
import { visit } from 'unist-util-visit'

export function remarkDirectiveRehype() {
	return function (tree: any) {
		visit(tree, function (node) {
			if (
				node.type === 'containerDirective' ||
				node.type === 'leafDirective' ||
				node.type === 'textDirective'
			) {
				const data = node.data || (node.data = {})
				const hast = h(node.name, node.attributes || {})
				if ('properties' in hast) {
					data.hProperties = hast.properties
				}
				if ('tagName' in hast && isString(hast.tagName)) {
					data.hName = 'directive-box-' + hast.tagName.toLowerCase()
				}
			}
		})
	}
}
