import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { config } from '../consts'

export const GET: APIRoute = async function (context) {
	const posts = await getCollection('blog')
	return rss({
		title: config?.title ?? '',
		description: config?.description ?? '',
		site: context.site!,
		items: posts.map((post) => ({
			author: config.author.name,
			...post.data,
			pubDate: post.data.pubDate || new Date(),
			link: `/blog/${post.id}/`,
		})),
	})
}
