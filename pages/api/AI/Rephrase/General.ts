import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	organization: 'org-i5ZJjyWAyhGgofxS14HjKmEZ',
	apiKey: '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',
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
			prompt: `Provide a rephrasing of the following sentence in a more readable general English format: ${req.body.text}`,
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
