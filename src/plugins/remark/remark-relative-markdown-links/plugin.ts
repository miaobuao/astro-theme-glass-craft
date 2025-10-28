import type { Link, Root } from 'mdast'
import * as path from 'path'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import {
	mergeCollectionOptions,
	type Options,
	validateOptions,
} from './options'
import {
	applyTrailingSlash,
	FILE_PATH_SEPARATOR,
	generateSlug,
	getMatter,
	isValidFile,
	isValidRelativeLink,
	normaliseAstroOutputPath,
	PATH_SEGMENT_EMPTY,
	replaceExt,
	resolveCollectionBase,
	resolveSlug,
	shouldProcessFile,
	splitPathFromQueryAndFragment,
	URL_PATH_SEPARATOR,
} from './utils'

/**
 * Remark plugin for Astro to add support for transforming relative links in MD and MDX files into their final page paths.
 * @see {@link Options}
 */
const remarkRelativeMarkdownLinks: Plugin<
	[(Options | null | undefined)?],
	Root
> = (opts) => {
	const options = validateOptions(opts)

	return (tree, file) => {
		visit(tree, 'link', (node: Link) => {
			if (typeof node.url !== 'string' || !node.url) {
				return
			}

			const nodeUrl = node.url
			const [urlPathPart, urlQueryStringAndFragmentPart] =
				splitPathFromQueryAndFragment(nodeUrl)

			if (!isValidRelativeLink(urlPathPart)) {
				return
			}

			const currentFile = file.history[0]

			if (!currentFile) {
				return
			}

			const currentFileParsed = path.parse(currentFile)
			const currentFileDirectory = currentFileParsed.dir

			const urlFilePath = path.resolve(currentFileDirectory, urlPathPart)
			if (!isValidFile(urlFilePath)) {
				return
			}

			// read gray matter from href file
			const { slug: frontmatterSlug } = getMatter(urlFilePath)
			const contentDir = path.resolve(options.srcDir, 'content')
			const trailingSlashMode = options.trailingSlash

			// determine the path of the target file relative to the content path
			const relativeToContentPath = path.relative(contentDir, urlFilePath)
			// based on relative path to content dir, check if we should exclude the file
			if (!shouldProcessFile(relativeToContentPath)) {
				return
			}

			const collectionName = path
				.dirname(relativeToContentPath)
				.split(FILE_PATH_SEPARATOR)[0]

			if (!collectionName) {
				return
			}

			// flatten options merging any collection overrides
			const collectionOptions = mergeCollectionOptions(collectionName, options)
			if (
				collectionName === '..' ||
				(collectionOptions.collectionBase !== false && collectionName === '.')
			) {
				return
			}

			// determine the path of the target file relative to the collection
			// since the slug for content collection pages is always relative to collection root
			const collectionDir = path.join(contentDir, collectionName)
			const relativeToCollectionPath = path.relative(collectionDir, urlFilePath)
			// md/mdx extensions should not be in the final url
			const withoutFileExt = replaceExt(relativeToCollectionPath, '')
			// each path segment should be individually sluggified
			const pathSegments = withoutFileExt.split(FILE_PATH_SEPARATOR)
			// Astro generates a slug for each page on the site as a fallback if the page does not have a custom slug
			const generatedSlug = generateSlug(pathSegments, options.slugify)
			// if we have a custom slug, use it, else use the default
			const resolvedSlug = resolveSlug(generatedSlug, frontmatterSlug)
			// determine the collection base based on specified options
			const resolvedCollectionBase = resolveCollectionBase(collectionOptions)

			// content collection slugs are relative to content collection root (or site root if effective collectionBase is
			// `false`) so build url including the content collection name (if applicable) and the pages slug
			const resolvedUrl = [resolvedCollectionBase, resolvedSlug].join(
				URL_PATH_SEPARATOR,
			)

			// slug of empty string ('') is a special case in Astro for root page (e.g., index.md) of a collection
			let webPathFinal = applyTrailingSlash(
				(collectionOptions.collectionBase === false &&
				frontmatterSlug === PATH_SEGMENT_EMPTY
					? URL_PATH_SEPARATOR
					: frontmatterSlug) || urlPathPart,
				resolvedUrl,
				trailingSlashMode,
			)

			if (urlQueryStringAndFragmentPart) {
				webPathFinal += urlQueryStringAndFragmentPart
			}

			webPathFinal = normaliseAstroOutputPath(webPathFinal, collectionOptions)

			node.url = webPathFinal
		})
	}
}

export default remarkRelativeMarkdownLinks
