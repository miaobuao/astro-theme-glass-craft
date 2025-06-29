import { slugify } from 'transliteration'

export function slugifyBlogPostUrl(postId: string) {
	return slugify(postId)
}
