import { defineConfig } from 'astro/config'
import theme from './src/theme'

export default defineConfig({
	site: 'https://example.com',
	prefetch: true,
	integrations: [
		theme({
			site: {
				title: 'Glass Craft Demo | Astro Theme',
				backgroundUrl: '/background/xiaogou.webp',
				slugifyArticleUrl: true,
			},
			author: {
				name: 'Demo',
				email: 'example@example.com',
				signature: 'Beautiful glass craft.',
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
			friends: [
				{
					name: 'YangQiuyi',
					avatar: {
						url: 'https://avatars.githubusercontent.com/u/62047803?v=4',
					},
					url: 'https://yangqiuyi.com',
					description: 'To be a geek 😉',
				},
				{
					name: 'Kimbleex',
					avatar: {
						url: 'https://avatars.githubusercontent.com/u/173974903?v=4',
					},
					url: 'https://blog.kimbleex.top/',
					description: '丢掉幻想，准备斗争',
				},
			],
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
