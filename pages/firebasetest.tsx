import { async } from '@firebase/util';
import { dividerClasses } from '@mui/material';
import { addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { currency } from '../types/currency';

const firebasetest = () => {
	const [curr, setCurr] = useState<currency[]>([]);
	const currencyCollection = collection(db, 'currency');
	const [newCurr, setNewCurr] = useState<number>(0);
	const [newRank, setNewRank] = useState<string>('');

	const createNewCurrency = async () => {
		await addDoc(currencyCollection, { fuel: newCurr, rank: newRank });
		console.log('added');
	};
	const getCurrency = async () => {
		const data = await getDocs(currencyCollection);
		data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
		setCurr(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	};
	useEffect(() => {
		// onSnapshot(currencyCollection, snapshot => {
		// 	setCurr(
		// 		snapshot.docs.map(doc => {
		// 			return {
		// 				id: doc.id,
		// 				data: doc.data,
		// 			};
		// 		})
		// 	);
		// });
		getCurrency();
		console.log(curr);
	}, []);

	return (
		<div>
			<input
				type="number"
				placeholder="currency"
				onChange={event => {
					setNewCurr(parseInt(event.target.value));
				}}
			/>
			<input
				type="text"
				placeholder="rank"
				onChange={event => {
					setNewRank(event.target.value);
				}}
			/>

			<button
				className=" border"
				onClick={() => createNewCurrency()}>
				Submit
			</button>
			{curr.map(user => {
				return (
					<div key={user.id}>
						<div>{user.fuel}</div>
						<div>{user.rank}</div>
						<div>{user.id}</div>
					</div>
				);
			})}
		</div>
	);
};

export default firebasetest;
