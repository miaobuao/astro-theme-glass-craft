import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import theme from '.'

export default defineConfig({
	site: 'https://example.com',
	integrations: [
		theme({
			author: {
				name: 'Astro Theme Explorer',
				email: 'example@example.com',
				signature: 'Astro Theme Explorer',
				avatar: {
					url: '/avatar.png',
					alt: 'Astro Theme Explorer',
				},
			},
		}),
	],
})
