import { doc, increment, runTransaction } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { db } from '../../../firebase';

async function FuelTransaction(userUID: string, fuelCost: number) {
	let result = false;
	if (userUID == null) return;
	try {
		const fuelRef = doc(db, 'UsersFuel', userUID);
		await runTransaction(db, async transaction => {
			const fuelDoc = await transaction.get(fuelRef);
			if (!fuelDoc.exists()) {
				throw 'Document does not exist!';
				//add create user acc merge
			}
			if (fuelDoc.data().fuel < fuelCost) {
				console.log('Insufficent fund');
				result = false;
				throw 'Insufficient fund';
				//add error modal
			}

			transaction.update(fuelRef, { fuel: increment(-fuelCost) });
			result = true;
		});
		console.log('Transaction successfully committed!');
	} catch (e) {
		console.log('Transaction failed: ', e);
		//error modal
	}
	return result;
}

interface resultArray {
	intent: string;
	tone: string;
	power: string;
}

function CheckingRequest(
	intent: string,
	tone: string,
	power: string,
	resultArray: resultArray
) {
	switch (intent) {
		case 'Describe':
			resultArray.intent = 'describe test';
			break;
	}

	switch (tone) {
		case 'Describe':
			resultArray.tone = 'describe test';
			break;
	}

	switch (power) {
		case 'Describe':
			resultArray.power = 'describe test';
			break;
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		let finalPrompt: resultArray = {
			intent: '',
			tone: '',
			power: '',
		};

		CheckingRequest(
			// req.body.option,
			req.body.intent,
			req.body.tone,
			req.body.power,
			finalPrompt
		);

		console.log(finalPrompt);

		FuelTransaction(req.body.userUID, req.body.fuelCost);

		const response = await fetch('https://sumnur.com/api/AI/General', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			//send to backeend
			body: JSON.stringify({ text: req.body.Input }),
		});

		const data = await response.json();
		console.log(data);
		res.status(200).json({ result: data });
	} catch (error) {
		console.error(error);
		res.status(400).json({
			result: {
				choices: [
					{
						text: `\n\n Server Error. Please try again later. ${process.env.BLAH}`,
					},
				],
			},
		});
	}

	console.log();
}
