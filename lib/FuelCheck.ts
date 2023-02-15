import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function FuelCheck(userUID: string) {
	const fuelRef = doc(db, 'UsersFuel', userUID);
	const docSnap = await getDoc(fuelRef);
	if (docSnap.exists()) {
		console.log('Document data:', docSnap.data());
		return docSnap.data().fuel;
	} else {
		// doc.data() will be undefined in this case
		console.log('No such document!');
		return null;
	}
}
