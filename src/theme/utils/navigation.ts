import { getCollection } from 'astro:content'
import { config } from '../consts'

/**
 * Get navigation visibility conditions
 * These conditions determine which navigation items should be shown
 */
export async function getNavigationConditions() {
	const showGallery = (await getCollection('gallery')).length > 0
	const showArchive = (await getCollection('blog')).length > 0
	const showFriendLinks = !!config.friends && config.friends.length > 0
	const showShare = !!config.customPages?.shareDirectory
	const showFinder = showGallery || showFriendLinks || showShare

	return {
		showGallery,
		showArchive,
		showFriendLinks,
		showShare,
		showFinder,
	}
}
