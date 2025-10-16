export function resolveUrl(urlString: string) {
	try {
		return new URL(urlString)
	} catch (e) {
		return new URL(urlString, window.location.href)
	}
}
