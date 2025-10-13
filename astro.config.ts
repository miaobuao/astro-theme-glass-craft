import { defineConfig } from 'astro/config'
import theme from './src/theme'

export default defineConfig({
	site: 'https://example.com',
	prefetch: true,
	integrations: [
		theme({
			title: 'Glass Craft Demo | Astro Theme',
			backgroundImage: {
				type: 'progressive',
				url: new URL('./public/background/xiaogou.webp', import.meta.url),
			},
			slugifyArticleUrl: true,

			author: {
				name: 'Demo',
				email: 'example@example.com',
				signature: 'Beautiful glass craft.',
				avatar: {
					type: 'common',
					url: new URL('https://avatars.githubusercontent.com/u/62047803?v=4'),
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
						type: 'common',
						url: new URL(
							'https://avatars.githubusercontent.com/u/62047803?v=4',
						),
					},
					url: 'https://yangqiuyi.com',
					description: 'To be a geek 😉',
				},
				{
					name: 'Kimbleex',
					avatar: {
						type: 'common',
						url: new URL(
							'https://avatars.githubusercontent.com/u/173974903?v=4',
						),
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
					loading: 'eager',
				},
			},
		}),
	],
	devToolbar: { enabled: false },
})
