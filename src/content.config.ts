import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string().optional(),
			description: z.string().optional(),
			summary: z.string().optional(),
			tags: z.array(z.string()).optional(),

			// pub date
			date: z.coerce.date().optional(),
			ctime: z.coerce.date().optional(),
			pubDate: z.coerce.date().optional(),
			publishDate: z.coerce.date().optional(),

			// mtime
			mtime: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),

			// cover
			heroImage: image().optional(),
			cover: image().optional(),

			draft: z.boolean().optional().default(false),
		}),
})

const gallery = defineCollection({
	loader: glob({ base: './src/content/gallery', pattern: '**/*.md' }),
	schema: () =>
		z.object({
			title: z.string().optional(),
			description: z.string().optional(),
		}),
})

export const collections = { blog, gallery }
