const Diff = require('diff');

interface stringType {
	input: string;
	output: string;
}

const removeNewLines = (str: string) => {
	return str.replace(/^\n\n/, '');
};

//fix why does it give out 2 string
export function compareString(input: string, output: string) {
	let string1 = input;

	let string2 = removeNewLines(output);
	//add spacebar to prevent long line of red code xd too complex to fix
	let finalOutput = '';
	let results = Diff.diffWords(string1, string2);
	console.log(input + 'input');
	console.log(output + 'output');
	results.forEach((item: any) => {
		if (item.removed) {
			finalOutput += `<strong>${item.value}</strong>`;
		} else if (!item.added) {
			finalOutput += `${item.value}`;
		}
	});
	finalOutput = `<p>${finalOutput}</p>`;
	console.log(finalOutput);

	return finalOutput;
}
