export interface Size {
	width: number
	height: number
}

export interface Range {
	min: number
	max: number
}

export interface Vertex {
	i: number
	j: number
	cost: number
}

export function layoutImages(
	screenWidth: number,
	imageSizes: Size[],
	goldHeight: number,
	maxColumnCount: number,
	minImageWidth: number,
) {
	imageSizes = imageSizes.map(({ width, height }) => {
		const aspect = width / height
		return {
			height: goldHeight,
			width: Math.max(goldHeight * aspect, minImageWidth),
		}
	})
	function cost(i: number, j: number) {
		const sumWidth = imageSizes
			.slice(i, j)
			.reduce((acc, { width }) => acc + width, 0)
		const scale = screenWidth / sumWidth
		const heightAfterScale = goldHeight * scale
		return Math.abs(heightAfterScale - goldHeight)
	}

	const unvisited = new Set<Vertex>()
	const distances = new Map<Vertex, number>()
	const predecessors = new Map<Vertex, Vertex>()

	function getDist(v: Vertex) {
		return distances.get(v) ?? Infinity
	}

	function getSuccessors(parent: Vertex) {
		return Array.from(unvisited).filter((v) => v.i === parent.j)
	}

	for (let i = 0; i < imageSizes.length; ++i) {
		for (
			let j = i + 1;
			j <= imageSizes.length && j <= i + maxColumnCount;
			++j
		) {
			const node: Vertex = {
				i,
				j,
				cost: cost(i, j),
			}
			unvisited.add(node)
		}
	}

	const source: Vertex = {
		i: -1,
		j: 0,
		cost: 0,
	}
	const end: Vertex = {
		i: imageSizes.length,
		j: imageSizes.length + 1,
		cost: 0,
	}
	unvisited.add(source)
	unvisited.add(end)
	distances.set(source, 0)

	while (unvisited.size > 0) {
		let minVertex!: Vertex
		let minDist = Infinity
		for (const [v, d] of distances.entries()) {
			if (d < minDist && unvisited.has(v)) {
				minDist = d
				minVertex = v
			}
		}
		unvisited.delete(minVertex)
		const successors = getSuccessors(minVertex)
		for (const successor of successors) {
			const dist = getDist(minVertex) + successor.cost
			if (dist < getDist(successor)) {
				distances.set(successor, dist)
				predecessors.set(successor, minVertex)
			}
		}
	}

	const bestPath: Vertex[] = []
	let current = end
	while (true) {
		current = predecessors.get(current)!
		if (current === source) {
			break
		}
		bestPath.push(current)
	}
	return bestPath.reverse()
}
