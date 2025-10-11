import { readFile } from 'fs/promises'

export async function getImageBytesFromUrl(url: URL) {
	if (url.protocol === 'file:') {
		const buffer = await readFile(url)
		return new Uint8Array(buffer)
	}
	return fetch(url).then((d) => d.bytes())
}
