import { readFile } from 'fs/promises'
import QuickLRU from 'quick-lru'

const imageCache = new QuickLRU<string, Uint8Array>({ maxSize: 64 })

export async function getImageBytesFromUrl(url: URL, useCache = true) {
	if (url.protocol === 'file:') {
		const buffer = await readFile(url)
		return new Uint8Array(buffer)
	}

	if (useCache) {
		const urlString = url.toString()
		const cached = imageCache.get(urlString)
		if (cached) {
			return cached
		}
		const bytes = await fetch(url)
			.then((d) => d.arrayBuffer())
			.then((d) => new Uint8Array(d))
		imageCache.set(urlString, bytes)
		return bytes
	} else {
		const bytes = await fetch(url)
			.then((d) => d.arrayBuffer())
			.then((d) => new Uint8Array(d))
		return bytes
	}
}
