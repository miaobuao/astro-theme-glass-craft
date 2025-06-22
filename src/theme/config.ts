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
}
