import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compareString } from '../../../lib/CompareString';
import {
	recieveOutput,
	setButtonAnime,
	setNewInputWrong,
	submitGrammar,
} from '../../../lib/slices/textSlice';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	increment,
	runTransaction,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import {
	CloseNoFuelModal,
	OpenModal,
	OpenNoFuelModal,
} from '../../../lib/slices/userSlice';
import { Modal } from '@mui/material';
import InsufficientFuel from './InsufficientFuel';

interface Options {
	id: number;
	name: string;
	api: string;
}
interface PageData {
	id: number;
	title: string;
	subheading: string;
	Option: Options[];
}

interface Props {
	currData: PageData;
}
const removeNewLines = (str: string) => {
	return str.replace(/^\n\n/, '');
};
interface SubmitProps {
	changeAPI: string;
	fuelCost: number;
}

const removeLeadingSpaces = (str: string): string => {
	return str.replace(/^\s*\n|^\s*/g, '');
};

//update to database might change to transaction in the future
// async function FuelTransaction(userUID: string, fuelCost: number) {
// 	let result = false;
// 	if (userUID == null) return;
// 	try {
// 		const fuelRef = doc(db, 'UsersFuel', userUID);
// 		await runTransaction(db, async transaction => {
// 			const fuelDoc = await transaction.get(fuelRef);
// 			if (!fuelDoc.exists()) {
// 				throw 'Document does not exist!';
// 				//add create user acc merge
// 			}
// 			if (fuelDoc.data().fuel < fuelCost) {
// 				console.log('Insufficent fund');
// 				result = false;
// 				throw 'Insufficient fund';
// 				//add error modal
// 			}

// 			transaction.update(fuelRef, { fuel: increment(-fuelCost) });
// 			result = true;
// 		});
// 		console.log('Transaction successfully committed!');
// 	} catch (e) {
// 		console.log('Transaction failed: ', e);
// 		//error modal
// 	}
// 	return result;
// }

const SubmitButton = ({ changeAPI, fuelCost }: SubmitProps) => {
	const [disableBtn, setDisableBtn] = useState(false);
	const dispatch = useDispatch();
	// const API = useSelector((state: any) => state.textControl.apiPath);
	const Input = useSelector((state: any) => state.textControl.inputString);
	const btnAnimate = useSelector((state: any) => state.textControl.btnAnime);
	const loginBool = useSelector((state: any) => state.userControl.userLogin);
	const userFuel = useSelector((state: any) => state.userControl.userFuel);
	const [reUserFuel, setReUserFuel] = useState<number>(0);
	const [sufficientFuel, SetSufficientFuel] = useState<boolean>(true);
	let cleanOutput;

	const modalHandler = useSelector(
		(state: any) => state.userControl.userNoFuelModal
	);

	const handleOpen = () => {
		dispatch(OpenNoFuelModal());
	};

	const handleClose = () => dispatch(CloseNoFuelModal());
	//get data from firestore
	// const [userFuel, setUserFuel] = useState<any>(0);

	// useEffect(() => {
	// 	setReUserFuel(userFuel);
	// 	if (reUserFuel < fuelCost) {
	// 		SetSufficientFuel(false);
	// 	} else {
	// 		SetSufficientFuel(true);
	// 	}
	// }, [userFuel]);

	const handleKeyDown = async () => {
		//prevent random brekaline
		dispatch(submitGrammar());

		//tell the user it loading in textoutput
		dispatch(recieveOutput(' '));
		dispatch(setButtonAnime());

		//commit to database
		// const fuelChecking = await FuelTransaction(
		// 	JSON.parse(localStorage.getItem('user') as string).uid,
		// 	fuelCost
		// );

		// if (!fuelChecking) {
		// 	dispatch(setButtonAnime());
		// 	handleOpen();
		// 	//pop up modal
		// 	return;
		// }
		//return error

		// checkAPi it work
		// console.log(changeAPI);
		//so openai wont break
		const pureString = removeLeadingSpaces(Input);
		const response = await fetch(changeAPI, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			//send to backeend
			body: JSON.stringify({
				userUID: JSON.parse(localStorage.getItem('user') as string).uid,
				fuelCost: fuelCost,
				changeAPI: changeAPI,
				text: pureString,
			}),
		});

		const data = await response.json();

		// send to back end
		// console.log(JSON.stringify({ data }));

		let inputWrong = compareString(Input, data.result.choices[0].text);
		dispatch(setNewInputWrong(inputWrong));
		//send data to UI
		cleanOutput = data.result.choices[0].text;
		dispatch(recieveOutput(removeNewLines(cleanOutput)));

		// dispatch(
		// 	tokenCal(
		// 		data.result.usage.prompt_tokens +
		// 			' ' +
		// 			data.result.usage.completion_tokens +
		// 			' ' +
		// 			data.result.usage.total_tokens
		// 	)
		// );
		// dispatch(tokenCal(data.result.usage.total_tokens));
		// console.log('working api');

		//animation
		dispatch(setButtonAnime());
	};

	return (
		<>
			{!loginBool ? (
				<>
					<button
						className=" top-40 w-full border-2 px-6 py-2 text-xl bg-white flex flex-row justify-center items-center
					 text-[#604fcd] border-[#604fcd] rounded-md shadow-md hover:scale-102 active:scale-95 transition-all duration-300 hover:bg-gray-100 hover:font-bold
					  disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
						onClick={() => dispatch(OpenModal())}
						disabled={btnAnimate}>
						<span className="font-medium"> Login First </span>
					</button>
				</>
			) : (
				<>
					<button
						className=" top-40 w-full border-2 px-6 py-2 text-xl bg-white flex flex-row justify-center items-center
					 text-[#604fcd] border-[#604fcd] rounded-md shadow-md hover:scale-102 active:scale-95 transition-all duration-300 hover:bg-gray-100 hover:font-bold
					  disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
						onClick={handleKeyDown}
						disabled={btnAnimate}>
						{btnAnimate ? (
							<>
								<svg
									className="mr-3 h-5 w-5 animate-spin text-mainDark"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24">
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								<span className="font-medium"> Processing... </span>
							</>
						) : (
							<span>Check</span>
						)}
					</button>
					<Modal
						open={modalHandler}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description">
						<div>
							<InsufficientFuel closeModal={handleClose} />
						</div>
					</Modal>
				</>
			)}
		</>
	);
};

export default SubmitButton;
