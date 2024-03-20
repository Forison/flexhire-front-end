export const getInitial = (description: string): string => {
	return `${description.slice(0, 322)}...`
}

export const positionType = (positionType: string[]): string => {
	return positionType.join('   ·   ')
}

export const salary = (max: string, min: string): string => {
	return `   ·   ${min} · ${max}`
}
