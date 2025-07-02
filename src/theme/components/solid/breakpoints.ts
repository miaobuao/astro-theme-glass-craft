import { createSignal, onCleanup } from 'solid-js'

export function createMediaQuery(query: string) {
	if (typeof window === 'undefined') {
		return () => false
	}

	const mediaQueryList = window.matchMedia(query)
	const [matches, setMatches] = createSignal<boolean>(mediaQueryList.matches)
	const listener = (event: MediaQueryListEvent) => {
		setMatches(event.matches)
	}

	mediaQueryList.addEventListener('change', listener)

	onCleanup(() => {
		mediaQueryList.removeEventListener('change', listener)
	})
	return matches
}

const breakpointsDef = {
	sm: '(min-width: 640px)',
	md: '(min-width: 768px)',
	lg: '(min-width: 1024px)',
	xl: '(min-width: 1280px)',
	'2xl': '(min-width: 1536px)',
}

type BreakpointKeys = keyof typeof breakpointsDef

export function createBreakpoints() {
	return Object.fromEntries(
		Object.entries(breakpointsDef).map(([key, query]) => [
			key,
			createMediaQuery(query),
		]),
	) as Record<BreakpointKeys, () => boolean>
}
