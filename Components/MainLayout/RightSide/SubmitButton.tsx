import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compareString } from '../../../lib/CompareString';
import {
	DetectLanguage,
	recievedListSummarized,
	recievedSummarized,
	recieveOutput,
	setButtonAnime,
	setNewInputWrong,
	submitGrammar,
} from '../../../lib/slices/textSlice';

import {
	CloseNoFuelModal,
	OpenModal,
	OpenNoFuelModal,
} from '../../../lib/slices/userSlice';
import { Modal } from '@mui/material';
import InsufficientFuel from './InsufficientFuel';
import {
	RemoveLeadingSpaces,
	RemoveNewLines,
} from '../../../lib/RemoveSpecificString';

interface Options {
	id: number;
	name: string;
	api: string;
}

interface SubmitProps {
	changeAPI: string;
	fuelCost: number;
	Options: any;
}

//works
function CheckAPIType(API: any, data: any, dispatch: any) {
	let cleanOutput;
	if (API == '/api/AI/Summarize') {
		cleanOutput = data.superSum;
		dispatch(recieveOutput(RemoveNewLines(cleanOutput)));

		cleanOutput = data.summarized;
		dispatch(recievedSummarized(RemoveNewLines(cleanOutput)));

		cleanOutput = data.list;
		dispatch(recievedListSummarized(cleanOutput));
	} else {
		cleanOutput = data.result;
		dispatch(recieveOutput(RemoveNewLines(cleanOutput)));
	}
}

const SubmitButton = ({ changeAPI, Options, fuelCost }: SubmitProps) => {
	const dispatch = useDispatch();
	// const API = useSelector((state: any) => state.textControl.apiPath);
	const Input = useSelector((state: any) => state.textControl.inputString);
	const btnAnimate = useSelector((state: any) => state.textControl.btnAnime);
	const loginBool = useSelector((state: any) => state.userControl.userLogin);
	let cleanOutput;

	const modalHandler = useSelector(
		(state: any) => state.userControl.userNoFuelModal
	);

	const handleOpen = () => {
		dispatch(OpenNoFuelModal());
	};

	const handleClose = () => dispatch(CloseNoFuelModal());

	const handleKeyDown = async () => {
		//prevent random brekaline
		dispatch(submitGrammar());

		//tell the user it loading in textoutput
		dispatch(recieveOutput(' '));
		dispatch(setButtonAnime());

		//so openai wont break and start being concious
		const pureString = RemoveLeadingSpaces(Input);
		const response = await fetch(changeAPI, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			//send to backeend
			body: JSON.stringify({
				userUID: JSON.parse(localStorage.getItem('user') as string).uid,
				fuelCost: fuelCost,
				text: pureString,
				//rename soon to full option so it customizable
				options: Options, //option has any so it scalable
			}),
		});
		console.log(Options);
		const data = await response.json();

		dispatch(DetectLanguage(data.lang));
		// send to back end
		// console.log(JSON.stringify({ data }));

		//rename this
		// let inputWrong = compareString(Input, data.result.choices[0].text);
		// dispatch(setNewInputWrong(inputWrong));

		//how do i fix this only get one data
		//send data to UI
		// cleanOutput = data.result.choices[0].text;
		// dispatch(recieveOutput(RemoveNewLines(cleanOutput)));
		CheckAPIType(changeAPI, data, dispatch);

		//animation
		dispatch(setButtonAnime());
	};

	return (
		<>
			{!loginBool ? (
				<>
					<button
						className=" top-40 w-full border-2 px-6 py-2 text-xl bg-gray-50 flex flex-row justify-center items-center
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
						className=" top-40 w-full border-2 px-6 py-2 text-xl bg-gray-50 flex flex-row justify-center items-center
					 text-primary border-[#604fcd] rounded-md shadow-md hover:scale-102 active:scale-95 transition-all duration-300 hover:bg-gray-200 
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
