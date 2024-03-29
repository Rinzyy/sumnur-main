import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { FuelTransaction } from '../../../../lib/FuelTransactionfb';
import { detectLanguage, quickStart } from '../../../../lib/Translation';

const configuration = new Configuration({
	organization: process.env.OPENAI_ORG_ID,
	apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

async function OpenAIRequest(prompt: string) {
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: prompt,
		max_tokens: 2000,
		temperature: 0,
	});
	return response;
}
function switchTone(inputTone: string) {
	let tone;
	switch (inputTone) {
		case 'formal':
			tone = ', with formal tone';
			break;
		case 'confident':
			tone = ', with informal tone';
			break;
		case 'empathic':
			tone = ', with with empathetic tone';
			break;
		default:
			tone = '';
			break;
	}
	return tone;
}
function switchIntent(inputIntent: string) {
	let intent;
	switch (inputIntent) {
		case 'persuade':
			intent = 'with intent to persuade';
			break;
		case 'advise':
			intent = 'with intent to advise';
			break;
		case 'clarifying':
			intent = 'with intent to clarify';
			break;
		case 'funny':
			intent = 'with intent to be funny';
			break;
		default:
			intent = '';
			break;
	}
	return intent;
}
function switchInstruct(inputInstruct: string) {
	let instruct;
	if (inputInstruct) {
		instruct = 'Revise';
	} else {
		instruct = 'Rephrase';
	}
	return instruct;
}
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		//prevent form postman request
		if (req.body.userUID == null) {
			res.status(400).json({
				result: `Error no userUID`,
			});
		}

		//check fuel if it enough if not return erro
		FuelTransaction(req.body.userUID, req.body.fuelCost);

		//eat up user fuel
		if (req.body.text == '') {
			req.body.text = 'Please type ur text above.';
		}

		//check intents,tone
		let intent, tone, instruct;
		tone = switchTone(req.body.options.tone);
		intent = switchIntent(req.body.options.intent);
		instruct = switchInstruct(req.body.options.isRephrase);

		//using google API
		let detectedLang = await detectLanguage(req.body.text);
		console.log(detectedLang);
		let translatedText = req.body.text;
		let languageIcon = detectedLang.language;
		translatedText = await quickStart(req.body.text, 'en');

		let finalPrompt = `${instruct} the following text to make it more clear, concise,grammatically correct and easily understandable for a general audience ${intent}${tone}: "${translatedText}"`;
		let response = await OpenAIRequest(finalPrompt);

		let cleanOutput = response.data.choices[0].text;
		//works
		// console.log(await quickStart(response.data.choices[0].text, 'km'));
		console.log(finalPrompt);
		res.status(200).json({ result: cleanOutput, lang: languageIcon });
	} catch (error) {
		res.status(400).json({
			result: '\n\n Server Error. Please try again later.',
		});
	}

	console.log();
}
