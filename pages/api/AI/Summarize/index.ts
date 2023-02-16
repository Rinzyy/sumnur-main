import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { FuelTransaction } from '../../../../lib/FuelTransactionfb';
import { detectLanguage, quickStart } from '../../../../lib/Translation';

const configuration = new Configuration({
	organization: 'org-i5ZJjyWAyhGgofxS14HjKmEZ',
	apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

async function OpenAIRequest(prompt: string) {
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: prompt,
		max_tokens: 1000,
		temperature: 0,
	});
	return response;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		//prevent form postman request
		if (req.body.userUID == null) {
			res.status(400).json({
				result: {
					choices: [
						{
							text: `Error no userUID`,
						},
					],
				},
			});
		}

		let detectedLang = await detectLanguage(req.body.text);
		console.log(detectedLang);

		let translatedText = req.body.text;
		let languageIcon = '';
		//if it not en or km throw error
		//language not supportglg
		if (detectedLang.language != 'en') {
			translatedText = await quickStart(req.body.text, 'en');
			console.log('converted Lang');
			if (detectedLang.language == 'km') {
				languageIcon = 'Khmer';
			}
		}

		//eat up user fuel
		if (req.body.text == '') {
			req.body.text = 'Please type ur text above.';
			//put a return and breakout
		}

		//check fuel if it enough if not return erro
		FuelTransaction(req.body.userUID, req.body.fuelCost);
		console.log(req.body.text);
		//sum
		// let summarizePrompt = `Summarize the following paragraph in one sentence, capturing the main idea or key takeaway presented in the paragraph: [${req.body.text}]`;
		let summarizePrompt = `Provide a concise summary of the following text by identifying and presenting its key points. As you summarize, consider the main ideas and supporting details presented in the text, the author's purpose in writing, and be sure to use your own words in the summary. Your goal is to effectively communicate the author's message in a brief and accurate way: [${req.body.text}]`;
		let summarizedAnswer = await OpenAIRequest(summarizePrompt);
		console.log(summarizedAnswer.data.choices[0].text);

		let forSuperSum = summarizedAnswer;
		//sum of sum
		let superSumPrompt = `Summarize the following paragraph in one sentence, capturing the main idea or key takeaway presented in the paragraph: [${forSuperSum.data.choices[0].text}]`;
		let superSumAnswer = await OpenAIRequest(superSumPrompt);
		console.log(superSumAnswer.data.choices[0].text);

		//list
		let listPrompt = `List down the key takeaways from the following text. Consider the main ideas and supporting details presented in the text, the author's purpose in writing. Your goal is to create a concise and accurate list of the most important takeaways from the text: [${req.body.text}]`;
		let listAnswer = await OpenAIRequest(listPrompt);
		//works
		res.status(200).json({
			summarized: summarizedAnswer.data,
			superSum: superSumAnswer.data,
			list: listAnswer.data,
			lang: languageIcon,
		});
	} catch (error) {
		res.status(400).json({
			result: {
				choices: [{ text: '\n\n Server Error. Please try again later.' }],
			},
		});
	}

	console.log();
}
