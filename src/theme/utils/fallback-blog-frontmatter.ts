import type { AnyEntryMap } from 'astro:content'
import { render } from 'astro:content'
import { uniq } from 'lodash-es'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString } from 'mdast-util-to-string'
import path from 'node:path'
import getReadingTime from 'reading-time'
import { getFileCommitDates } from './git'
import { readMap } from './read-map'
import { slugifyBlogPostUrl } from './slugify-blog-post-url'

type BlogEntryMap = AnyEntryMap['blog']
type BlogEntry = BlogEntryMap[keyof BlogEntryMap]

export interface ProcessedPost {
	entry: BlogEntry
	frontMatter: {
		title: string
		description: string
		isDraft: boolean
		publishDate: Date
		updateDate: Date
		tags: string[]
		cover?: any
		readingTime: ReturnType<typeof getReadingTime>
		slug: string
	}
}

type Fallback<T> = (
	entry: BlogEntry,
	extras: { headings: any[] },
) => T | Promise<T>

export interface ContentProcessorOptions {
	title: Fallback<string>
	description: Fallback<string>
	publishDate: Fallback<Date>
	updateDate: Fallback<Date>
	tags: Fallback<string[]>
	cover: Fallback<any>
	isDraft: Fallback<boolean>
}

export function extractArticleExcerpt(markdown: string): string {
	const moreRegex = /<!--\s*more\s*-->/i
	const match = moreRegex.exec(markdown)
	if (match) {
		return markdown.substring(0, match.index)
	}
	return ''
}
export const defaultContentProcessorOptions: ContentProcessorOptions = {
	title: (entry, { headings }) => {
		const h1 = headings.find((h) => h.depth === 1)?.text
		const basename = path.basename(entry.id, path.extname(entry.id))
		return entry.data.title ?? h1 ?? basename
	},
	description: (entry) =>
		entry.data.description ??
		(entry.body ? extractArticleExcerpt(entry.body) : ''),
	publishDate: async (entry) => {
		const fromFrontmatter =
			entry.data.date ??
			entry.data.ctime ??
			entry.data.pubDate ??
			entry.data.publishDate
		if (fromFrontmatter) return new Date(fromFrontmatter)

		const { created } = await getFileCommitDates(entry.filePath!)
		return created ?? new Date()
	},
	updateDate: async (entry) => {
		const fromFrontmatter = entry.data.mtime ?? entry.data.updatedDate
		if (fromFrontmatter) return new Date(fromFrontmatter)

		const { modified } = await getFileCommitDates(entry.filePath!)
		return modified ?? new Date()
	},
	tags: (entry) => {
		const frontmatterTags = entry.data.tags ?? []
		if (frontmatterTags.length === 0) {
			const dirTags = path
				.dirname(entry.id)
				.split('/')
				.filter((p) => p && p !== '.')
			return uniq(dirTags)
		}
		return uniq(frontmatterTags)
	},
	cover: (entry) => entry.data.cover ?? entry.data.heroImage,
	isDraft: (entry) => entry.data.draft ?? false,
}

const postCache = new Map<string, ProcessedPost>()

export function createFallbackBlogFrontMatterProcessor(
	options: Partial<
		ContentProcessorOptions & {
			options: {
				slugify: boolean
			}
		}
	> = {},
) {
	const finalOptions = { ...defaultContentProcessorOptions, ...options }

	return async function processEntry(entry: BlogEntry): Promise<ProcessedPost> {
		const cacheKey = `${entry.collection}:${entry.id}`
		return readMap(postCache, cacheKey, async () => {
			const { headings } = await render(entry)
			const textContent = entry.body ? toString(fromMarkdown(entry.body)) : ''

			const [publishDate, updateDate] = await Promise.all([
				finalOptions.publishDate(entry, { headings }),
				finalOptions.updateDate(entry, { headings }),
			])

			const link = finalOptions.options?.slugify
				? slugifyBlogPostUrl(entry.id)
				: entry.id

			return {
				entry,
				frontMatter: {
					title: await finalOptions.title(entry, { headings }),
					description: await finalOptions.description(entry, { headings }),
					isDraft: await finalOptions.isDraft(entry, { headings }),
					publishDate,
					updateDate,
					tags: await finalOptions.tags(entry, { headings }),
					cover: await finalOptions.cover(entry, { headings }),
					readingTime: getReadingTime(textContent),
					slug: link,
				},
			}
		})
	}
}
