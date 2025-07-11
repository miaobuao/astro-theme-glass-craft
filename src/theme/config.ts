export interface AvatarType {
	url: string
	alt?: string
}

export interface FriendLinkType {
	name: string
	url: string
	avatar: AvatarType
}

export interface ThemeConfig {
	site: {
		title?: string
		description?: string
		backgroundUrl?: string
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
}
