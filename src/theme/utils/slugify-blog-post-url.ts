import { slugify } from 'transliteration'

export function slugifyBlogPostUrl(postId: string) {
	return postId
		.split('/')
		.map((p) => slugify(p))
		.join('/')
}
