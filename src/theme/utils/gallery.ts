import { type AnyEntryMap } from 'astro:content'
import { readFile } from 'fs/promises'
import { sha256 } from 'hash-wasm'
import { basename, extname, isAbsolute, relative, resolve } from 'path'
import { remark } from 'remark'
import { slugify } from 'transliteration'
import { visit } from 'unist-util-visit'
import { GALLERY_DIR, ROOT_DIR } from '../consts'
import { isValidHttpUrl } from './is-valid-http-url'

type GalleryEntryMap = AnyEntryMap['gallery']
type Gallery = GalleryEntryMap[keyof GalleryEntryMap]

export interface GalleryImageProps {
	description?: string
	url: string
	absPath?: string
}

export interface GallerySection {
	title?: string
	images: GalleryImage[]
}

const HASH_VALUE_MAP = new Map<string, string>()

class GalleryImage {
	constructor(public attrs: GalleryImageProps) {}

	get absPath() {
		return this.attrs.absPath
	}

	async getBuffer() {
		if (this.absPath) {
			const buffer = await readFile(this.absPath)
			return buffer
		} else {
			return fetch(this.attrs.url)
				.then((res) => res.arrayBuffer())
				.then((arrayBuffer) => Buffer.from(arrayBuffer))
		}
	}

	async getUrl() {
		return isValidHttpUrl(this.attrs.url)
			? this.attrs.url
			: `/gallery/_images/${await this.getOutputFilename()}`
	}

	async getOutputFilename() {
		return this.absPath
			? `${await this.hash()}${extname(this.absPath)}`
			: undefined
	}

	get description() {
		return this.attrs.description
	}

	async hash() {
		if (this.absPath) {
			if (HASH_VALUE_MAP.has(this.absPath)) {
				return HASH_VALUE_MAP.get(this.absPath)!
			} else {
				const buffer = await readFile(this.absPath)
				const hash = await sha256(buffer)
				HASH_VALUE_MAP.set(this.absPath, hash)
				return hash
			}
		}
	}
}

export class GalleryHelper {
	constructor(public gallery: Gallery) {}

	get gallerySections() {
		const sections: GallerySection[] = []
		let currentSection: GallerySection | null = null
		visit(this.markdownTree, (node) => {
			if (node.type === 'heading' && node.depth === 2) {
				currentSection = {
					title: this.markdownText.slice(
						node.position!.start.offset! + 2,
						node.position!.end.offset,
					),
					images: [],
				}
				sections.push(currentSection)
			} else if (node.type === 'image') {
				if (!currentSection) {
					currentSection = {
						images: [],
					}
					sections.push(currentSection)
				}
				currentSection.images.push(
					new GalleryImage({
						description: node.alt ?? undefined,
						url: node.url,
						absPath: isValidHttpUrl(node.url)
							? undefined
							: isAbsolute(node.url)
								? node.url
								: resolve(ROOT_DIR, this.gallery.filePath!, '..', node.url),
					}),
				)
			}
		})
		return sections
	}

	get markdownText() {
		return this.gallery.body!
	}

	get markdownTree() {
		return remark().parse(this.markdownText)
	}

	get slugUrl() {
		const absPath = resolve(ROOT_DIR, this.gallery.filePath!)
		const relPath = relative(GALLERY_DIR, absPath)
		return relPath
			.split('/')
			.map((d) => slugify(d))
			.join('/')
	}

	get title() {
		return basename(this.gallery.filePath!, extname(this.gallery.filePath!))
	}
}
