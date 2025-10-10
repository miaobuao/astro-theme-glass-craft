export async function readMap<TKey, TValue>(
	cache: Map<TKey, TValue>,
	key: TKey,
	getter: () => TValue | Promise<TValue>,
) {
	if (cache.has(key)) {
		return cache.get(key)!
	}
	const value = await Promise.resolve(getter())
	cache.set(key, value)
	return value
}
