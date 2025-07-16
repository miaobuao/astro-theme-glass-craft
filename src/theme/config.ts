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

export interface AvatarType {
	url: string
	alt?: string
}

export interface FriendLinkType {
	name: string
	description?: string
	url: string
	avatar: AvatarType
}

export interface ThemeConfig {
	site: {
		title?: string
		description?: string
		backgroundUrl?: string
		slugifyArticleUrl?: boolean
		lang?: 'zh' | 'en'
	}
	author: {
		name: string
		avatar: AvatarType
		email?: string
		signature?: string
	}
	friends?: FriendLinkType[]
	socialLinks?: {
		github?: string
	}
	customPages?: {
		aboutMe?: string
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
