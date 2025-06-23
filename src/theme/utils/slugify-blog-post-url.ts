import { slugify } from 'transliteration'
import { type AnyEntryMap } from 'astro:content'

type BlogEntryMap = AnyEntryMap['blog']
type Post = BlogEntryMap[keyof BlogEntryMap]

export function slugifyBlogPostUrl(postId: string) {
	return slugify(postId)
}
