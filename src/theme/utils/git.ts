import { existsSync } from 'fs'
import { simpleGit, type DefaultLogFields } from 'simple-git'
import { readMap } from './read-map'
const git = simpleGit()

interface FileCommitInfo {
	created: Date | undefined
	modified: Date | undefined
}

const commitInfoCache = new Map<string, FileCommitInfo>()

export async function getFileCommitDates(
	filePath: string,
): Promise<FileCommitInfo> {
	if (!existsSync(filePath)) {
		return { created: undefined, modified: undefined }
	}

	return readMap(commitInfoCache, filePath, async () => {
		try {
			const log = await git.log<DefaultLogFields>({ file: filePath })

			if (log.total === 0) {
				return { created: undefined, modified: undefined }
			}

			const createdDate = log.all[log.total - 1]?.date
			const modifiedDate = log.latest?.date

			return {
				created: createdDate ? new Date(createdDate) : undefined,
				modified: modifiedDate ? new Date(modifiedDate) : undefined,
			}
		} catch (error) {
			console.error(`Error getting git log for ${filePath}:`, error)
			return { created: undefined, modified: undefined }
		}
	})
}
