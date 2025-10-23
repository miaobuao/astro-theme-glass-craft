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

	const posts = await getCollection('blog')
		.then((posts) => Promise.all(posts.map(fallback)))
		.then((posts) =>
			posts
				.filter((post) => post.frontMatter.isDraft === false)
				.toSorted((a, b) => {
					return a.frontMatter.publishDate > b.frontMatter.publishDate
						? -1
						: a.frontMatter.publishDate < b.frontMatter.publishDate
							? 1
							: 0
				}),
		)

	return rss({
		title: config?.title ?? '',
		description: config?.description ?? '',
		site: context.site!,
		items: posts.map((post) => ({
			author: config.author.name,
			...post.entry.data,
			description: config.rss?.description ? post.entry.data.description : undefined,
			pubDate: post.frontMatter.publishDate,
			updatedDate: post.frontMatter.updateDate,
			link: `/blog/${post.frontMatter.slug}/`,
			content: config.rss?.content ? post.entry.rendered?.html : undefined,
		})),
	})
}
