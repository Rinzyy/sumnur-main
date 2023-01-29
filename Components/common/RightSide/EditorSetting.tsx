import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compareString } from '../../../lib/CompareString';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {
	recieveOutput,
	setNewAPI,
	setNewInputWrong,
	submitGrammar,
	tokenCal,
} from '../../../lib/slices/textSlice';
import SubmitButton from './SubmitButton';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { async } from '@firebase/util';
import {
	CloseNoFuelModal,
	OpenNoFuelModal,
	ShowUserFuel,
} from '../../../lib/slices/userSlice';
import { Fab, Modal } from '@mui/material';
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

// const removeNewLines = (str: string) => {
// 	return str.replace(/^\n\n/, '');
// };
async function FuelCheck(userUID: string) {
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

const EditorSetting = ({ currData }: Props) => {
	// const token = useSelector((state: any) => state.textControl.totalToken);
	// let initialAPI = currData.Option[0].api;
	const [API, setAPI] = React.useState<string>(currData.Option[0].api);
	const dispatch = useDispatch();
	const fuelCost = useSelector((state: any) => state.userControl.fuelCost);
	const userFuel = useSelector((state: any) => state.userControl.userFuel);
	const userUID = useSelector((state: any) => state.userControl.userUID);

	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAPI(event.target.value);
		// dispatch(setNewAPI(event.target.value));
		//cool bug it console log previous string
		// console.log(API);
	};

	useEffect(() => {
		dispatch(setNewAPI(API));
	}, []);

	useEffect(() => {
		// console.log(userUID);
		// if (localStorage.getItem(userFuel) != null) {
		// 	dispatch(ShowUserFuel(localStorage.getItem('userFuel')));
		// }

		if (JSON.parse(localStorage.getItem('user') as string) != null) {
			onSnapshot(
				doc(
					db,
					'UsersFuel',
					JSON.parse(localStorage.getItem('user') as string).uid
				),
				doc => {
					console.log('Current data: ', doc.data());
					dispatch(ShowUserFuel(doc.data()?.fuel));
					localStorage.setItem('userFuel', doc.data()?.fuel);
					// setUserFuel(doc.data()?.fuel);
				},
				error => {
					console.log(error);
				}
			);
		}
	}, [userFuel, userUID]);

	return (
		<>
			<div className="hidden md:block w-full h-full">
				<div className=" top-[100px] flex gap-4 flex-col">
					<span className=" text-xl font-bold  text-center">
						{currData.title}
					</span>
					<span className="-mt-4 text-sm text-center">
						{currData.subheading}
					</span>
					<hr />
					<div className="flex flex-col">
						{currData.Option.map(item => (
							<div
								key={item.id}
								className="flex items-center gap-2 mb-2 ">
								<label className="cursor-pointer flex gap-1 justify-center items-center">
									<input
										type="radio"
										id={item.name}
										name="general"
										value={item.api}
										defaultChecked={item.id === 1 ? true : false}
										onChange={handleOptionChange}
										className="cursor-pointer peer sr-only"
									/>
									<RadioButtonCheckedIcon className=" text-gray-400 peer-checked:text-primary" />
									<span className=" peer-checked:text-primary">
										{item.name}
									</span>
								</label>
							</div>
						))}
					</div>
					<hr />

					<SubmitButton
						key={API + 1}
						changeAPI={API}
						fuelCost={fuelCost}
					/>
					<button className="flex flex-row bg-primary"></button>
					<div className=" flex justify-center opacity-50 text-sm -m-6 text-gray-500 gap-2">
						<div>
							<span className="  mr-1">{fuelCost} </span>
							<span className="">Fuel</span>
						</div>
					</div>
				</div>
			</div>

			{/* //mobile */}
			<div className="absolute w-full h-full left-1/2 transform -translate-x-1/2 flex justify-center items-center  md:hidden z-10">
				<div className="sticky flex gap-2  top-[90%] mb-12  w-[] bg-white z-60">
					<SubmitButton
						key={API + 2}
						changeAPI={API}
						fuelCost={fuelCost}
					/>
				</div>
			</div>
		</>
	);
};

export default EditorSetting;
