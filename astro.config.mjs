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
			comment: {
				giscus: {
					repo: 'miaobuao/astro-theme-glass-craft',
					repoId: 'R_kgDOO__Q6Q',
					categoryId: 'DIC_kwDOO__Q6c4Cs_JX',
					mapping: 'og:title',
					strict: '0',
					reactionsEnabled: '1',
					emitMetadata: '0',
					inputPosition: 'top',
					theme: 'preferred_color_scheme',
					lang: 'zh-CN',
				},
			},
		}),
	],
	devToolbar: { enabled: false },
})
