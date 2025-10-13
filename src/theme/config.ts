import type { GiscusWidget } from 'giscus'

export type GiscusConfig = Pick<
	GiscusWidget,
	| 'repo'
	| 'repoId'
	| 'category'
	| 'categoryId'
	| 'mapping'
	| 'term'
	| 'strict'
	| 'reactionsEnabled'
	| 'emitMetadata'
	| 'inputPosition'
	| 'theme'
	| 'lang'
	| 'loading'
>

export interface ProgressiveImage {
	type: 'progressive'
	url: URL
	alt?: string
	loading?: 'eager' | 'lazy'
}

export interface CommonImage {
	type: 'common'
	url: URL
	alt?: string
	loading?: 'eager' | 'lazy'
}

export type UnionImageType = CommonImage | ProgressiveImage

export interface FriendLinkType {
	name: string
	description?: string
	url: string
	avatar: UnionImageType
}

export interface ThemeConfig {
	title?: string
	description?: string
	backgroundImage?: UnionImageType | false
	slugifyArticleUrl?: boolean
	lang?: 'zh' | 'en'
	customPages?: {
		aboutMe?: string
	}
	author: {
		name: string
		avatar: UnionImageType
		email?: string
		signature?: string
	}
	friends?: FriendLinkType[]
	socialLinks?: {
		github?: string
	}
	gallery?: {
		thumbnail?: {
			size?: number
			format?: 'webp' | 'avif'
		}
	}
	comment?: {
		giscus?: GiscusConfig
	}
}
