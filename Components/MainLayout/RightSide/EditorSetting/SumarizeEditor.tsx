import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubmitButton from '../SubmitButton';

import { Accordion, Tooltip } from 'flowbite-react';
import OptionChoice from '../Options/OptionChoice';
import OptionRadio from '../Options/OptionRadio';
import { OptionData } from '../../../../lib/interfaces/RephraseInterface';

const SummarizeEditor = ({ currData }: any) => {
	let sumarizeOption = {
		intent: '',
		tone: '',
		isRephrase: false,
		// isParaphrase: false,
	};

	//request to backend
	const API = currData.Type[0].api;

	const [intent, setIntent] = React.useState<string>(
		currData.Option.Intent[0].prompt
	);
	const [tone, setTone] = React.useState<string>(
		currData.Option.Tone[0].prompt
	);
	const [para, setPara] = React.useState<boolean>(false);
	const [gramSpell, setGramSpell] = React.useState<boolean>(false);

	// const [power, setPower] = React.useState<string>(
	// 	currData.Option.Power[1].level
	// );
	// const [vocab, setVocab] = React.useState<string>(
	// 	currData.AdvancedOption.Vocabulary[0].level
	// );
	// const [style, setStyle] = React.useState<string>(
	// 	currData.AdvancedOption.Style[0].prompt
	// );
	// const [audience, setAudience] = React.useState<string>(
	// 	currData.AdvancedOption.Audience[0].prompt
	// );

	const handleChangeCheck = (e: any) => {
		setPara(e.target.checked);

		// do whatever you want with isChecked value
	};
	const handleChangeOnlyGramAndSpell = (e: any) => {
		setGramSpell(e.target.checked);

		// do whatever you want with isChecked value
	};

	const fuelCost = useSelector((state: any) => state.userControl.fuelCost);

	const handleIntentChange = (event: any) => {
		setIntent(event.target.value);
		console.log(intent);
		// dispatch(setNewAPI(event.target.value));
		//cool bug it console log previous string
		// console.log(API);
	};
	const handleToneChange = (event: any) => {
		setTone(event.target.value);
	};

	// const handlePowerChange = (event: any) => {
	// 	setPower(event.target.value);
	// };

	//advanced
	// const handleVocabChange = (event: any) => {
	// 	setVocab(event.target.value);
	// };
	// const handleStyleChange = (event: any) => {
	// 	setStyle(event.target.value);
	// };
	// const handleAudienceChange = (event: any) => {
	// 	setAudience(event.target.value);
	// };

	useEffect(() => {
		sumarizeOption.intent = intent;
		sumarizeOption.tone = tone;
		sumarizeOption.isRephrase = gramSpell;
	}, [intent, para, tone, gramSpell]);

	return (
		<>
			<div>
				<div className="hidden md:block w-full h-full">
					<div className=" flex gap-4 flex-col">
						<span className=" text-xl font-bold  text-center">
							{currData.title}
						</span>
						<span className="-mt-4 text-sm text-center">
							{currData.subheading}
						</span>
						<hr />

						<OptionChoice
							name="Intent"
							handleInputChange={handleIntentChange}
							option={currData.Option.Intent}
						/>
						<OptionChoice
							name="Tone"
							handleInputChange={handleToneChange}
							option={currData.Option.Tone}
						/>

						<SubmitButton
							key={API + 1}
							changeAPI={API}
							fuelCost={fuelCost}
							Options={sumarizeOption}
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
				<div className="fixed top-[90%] left-1/2 transform -translate-x-1/2 flex justify-center items-center  md:hidden z-10">
					<div className="sticky flex gap-2  top-[90%] mb-12  w-[] bg-white z-60">
						<SubmitButton
							key={API + 1}
							changeAPI={API}
							fuelCost={fuelCost}
							Options={sumarizeOption}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default SummarizeEditor;
