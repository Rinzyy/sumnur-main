export const RemoveLeadingSpaces = (str: string): string => {
	return str.replace(/^\s*\n|^\s*/g, '');
};
