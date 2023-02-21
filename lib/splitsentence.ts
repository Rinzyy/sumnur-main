const jsonString = `1. The importance of having a good work-life balance: it can help reduce stress, improve productivity, and increase overall happiness.
2. Ways to achieve a better work-life balance: setting boundaries, taking breaks, and delegating tasks.
3. Benefits of having a good work-life balance: improved mental and physical health, better relationships, and increased job satisfaction.
4. Strategies for maintaining a good work-life balance: setting realistic goals, prioritizing tasks, and taking time for yourself.`;
const json: any = {};

export function SplitSentence(paragraph: string) {
	const sentences = paragraph.split('\n');
	sentences.forEach((sentence, index) => {
		json[`sentence_${index + 1}`] = sentence.trim();
	});
	return json;
}
export function SplitSentenceKM(paragraph: string) {
	const sentences = paragraph.split('។\n');
	sentences.forEach((sentence, index) => {
		json[`sentence_${index + 1}`] = sentence.trim();
	});
	return json;
}

const mappedJson = Object.keys(json).map(key => {
	return {
		key,
		value: json[key],
	};
});
