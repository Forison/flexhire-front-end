export const getInitial = (description: string, limit: number): string => {
	return description.slice(0, limit)
}