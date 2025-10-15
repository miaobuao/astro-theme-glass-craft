import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { config } from '../consts'
import { createFallbackBlogFrontMatterProcessor } from '../utils/fallback-blog-frontmatter'

export const GET: APIRoute = async function (context) {
	const fallback = createFallbackBlogFrontMatterProcessor({
		options: {
			slugify: config.slugifyArticleUrl,
		},
	})

	const posts = await getCollection('blog').then((posts) =>
		Promise.all(posts.map(fallback)),
	)

	return rss({
		title: config?.title ?? '',
		description: config?.description ?? '',
		site: context.site!,
		items: posts.map((post) => ({
			author: config.author.name,
			...post.entry.data,
			pubDate: post.frontMatter.publishDate,
			updatedDate: post.frontMatter.updateDate,
			link: `/blog/${post.frontMatter.slug}/`,
		})),
	})
}
