import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { FuelTransaction } from '../../../lib/FuelTransactionfb';

const configuration = new Configuration({
	organization: 'org-i5ZJjyWAyhGgofxS14HjKmEZ',
	apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.body.text == '') {
			req.body.text = 'Please type ur text above.';
		}
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: `rephrase the following text to make it clear, concise, and easily understandable for a general audience: '${req.body.text}'`,
			// prompt: `Rephrase the following text to reflect a ${req.body.options.tone} tone and intent to ${req.body.options.intent} in a standard english format, with simple synonym: '${req.body.text}'`,
			max_tokens: 1000,
			temperature: 0.7,
		});

		res.status(200).json({ result: response.data });
	} catch (error) {
		res.status(400).json({
			result: {
				choices: [{ text: '\n\n Server Error. Please try again later.' }],
			},
		});
	}

	console.log();
}