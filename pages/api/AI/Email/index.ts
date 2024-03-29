import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { FuelTransaction } from '../../../../lib/FuelTransactionfb';

const configuration = new Configuration({
	organization: process.env.OPENAI_ORG_ID,
	apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
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

		FuelTransaction(req.body.userUID, req.body.fuelCost);
		if (req.body.text == '') {
			req.body.text = 'Please type ur text above.';
		}
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: `Write an email to '[Name]' about the input text. Include a greeting, the main message, and a closing: "${req.body.text}"`,
			max_tokens: 1000,
			temperature: 0.7,
		});
		let cleanOutput = response.data.choices[0].text;

		res.status(200).json({ result: cleanOutput });
	} catch (error) {
		res.status(400).json({
			result: {
				choices: [{ text: '\n\n Server Error. Please try again later.' }],
			},
		});
	}

	console.log();
}
