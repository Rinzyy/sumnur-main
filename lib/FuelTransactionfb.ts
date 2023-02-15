import { doc, increment, runTransaction } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { db } from '../firebase';
import { OpenNoFuelModal } from './slices/userSlice';

export async function FuelTransaction(userUID: string, fuelCost: number) {
	// const dispatch = useDispatch();
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
				// dispatch(OpenNoFuelModal());
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
