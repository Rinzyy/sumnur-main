import { async } from '@firebase/util';
import console from 'console';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { resolve } from 'path';
import { FuelTransaction } from '../../../../lib/FuelTransactionfb';
import { removeKeyTakeaways } from '../../../../lib/RemoveSpecificString';
import { SplitSentence, SplitSentenceKM } from '../../../../lib/splitsentence';
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
		// console.log(detectedLang);

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
		// console.log(req.body.text);

		//prompt
		let summarizePrompt = `Provide a concise summary of the following text by identifying and presenting its key points. As you summarize, consider the main ideas and supporting details presented in the text, the author's purpose in writing, and be sure to use your own words in the summary. Your goal is to effectively communicate the author's message in a brief and accurate way: [${translatedText}]`;
		let listPrompt = `List down the all key takeaways in bullet points from the following text. Consider the main ideas and supporting details presented in the text, the author's purpose in writing. Your goal is to create a concise and accurate list of the most important takeaways from the text: [${translatedText}]`;

		//call 2 async at once
		const responses = await Promise.all([
			OpenAIRequest(summarizePrompt),
			OpenAIRequest(listPrompt),
		]);
		let summarizedAnswer = responses[0];
		let listAnswer = responses[1];

		//sum of sum
		let forSuperSum = summarizedAnswer;
		let superSumPrompt = `Summarize the following paragraph in one sentence, capturing the main idea or key takeaway presented in the paragraph: [${forSuperSum.data.choices[0].text}]`;
		let superSumAnswer = await OpenAIRequest(superSumPrompt);

		//cleaning object to be string for frontend
		let cleanSummarized = summarizedAnswer.data.choices[0].text;
		let cleanList = listAnswer.data.choices[0].text;
		let cleanSuperSum = superSumAnswer.data.choices[0].text;
		let splitCleanList = SplitSentence(cleanList as string);
		splitCleanList['sentence_1'] = removeKeyTakeaways(
			splitCleanList['sentence_1']
		);
		if (detectedLang.language == 'km') {
			// var promises: any = [];
			//loop cannot run ascyne and wait so when one of the array is finished async it send all the array and doesn't wait for other
			// Object.keys(splitCleanList).forEach(async (key: any, index: any) => {
			// 	promises.push(
			// 		(splitCleanList[key] = await quickStart(splitCleanList[key], 'km'))
			// 	);
			// });

			const promises = Object.keys(splitCleanList).map(async (key: any) => {
				return new Promise(async resolve => {
					splitCleanList[key] = await quickStart(splitCleanList[key], 'km');
					resolve(splitCleanList[key]);
				});
			});

			const translatedResponses = await Promise.all([
				quickStart(cleanSummarized, 'km'),
				quickStart(cleanSuperSum, 'km'),
			]);
			//wait for loop async to finish all of it array
			await Promise.all(promises);
			console.log(promises);

			cleanSummarized = translatedResponses[0];
			cleanSuperSum = translatedResponses[1];
		}

		//works
		res.status(200).json({
			summarized: cleanSummarized,
			superSum: cleanSuperSum,
			list: splitCleanList,
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
