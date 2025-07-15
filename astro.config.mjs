import { defineConfig } from 'astro/config'
import theme from '.'

export default defineConfig({
	site: 'https://example.com',
	integrations: [
		theme({
			site: {
				backgroundUrl: '/background/xiaogou.webp',
				slugifyArticleUrl: true,
			},
			author: {
				name: 'Meo',
				email: 'example@example.com',
				signature: 'Glass Craft',
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
