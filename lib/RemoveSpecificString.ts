export const RemoveLeadingSpaces = (str: string): string => {
	return str.replace(/^\s*\n|^\s*/g, '');
};

export function removeKeyTakeaways(str: string): string {
	return str.replace(/^Key Takeaways:/, '');
}
export const RemoveNewLines = (str: string) => {
	return str.replace(/^\n\n/, '');
};
