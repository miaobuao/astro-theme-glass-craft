import { defineConfig } from 'astro/config'
import theme from '.'

export default defineConfig({
	site: 'https://example.com',
	integrations: [
		theme({
			site: {
				backgroundUrl: '/public/background/xiaogou.jpg',
			},
			author: {
				name: 'Meo',
				email: 'example@example.com',
				signature: 'Astro Theme Explorer',
				avatar: {
					url: 'https://avatars.githubusercontent.com/u/62047803?v=4',
					alt: 'Avatar',
				},
			},
			customPages: {
				aboutMe: '/about-me',
			},
			gallery: {
				thumbnail: {
					size: 384,
					format: 'webp',
				},
			},
		}),
	],
	devToolbar: { enabled: false },
})
