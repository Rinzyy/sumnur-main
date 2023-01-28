import { doc, increment, runTransaction } from 'firebase/firestore';
import { db } from '../firebase';

export async function FuelTransaction(userUID: string, fuelCost: number) {
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
