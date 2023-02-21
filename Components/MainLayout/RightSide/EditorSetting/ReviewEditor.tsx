import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubmitButton from '../SubmitButton';

import { Accordion, Tooltip } from 'flowbite-react';
import OptionChoice from '../Options/OptionChoice';
import OptionRadio from '../Options/OptionRadio';
import { OptionData } from '../../../../lib/interfaces/RephraseInterface';
import EditIcon from '@mui/icons-material/Edit';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
const ReviewEd = ({ currData }: any) => {
	let RephraseOption = {
		intent: '',
		tone: '',
		power: '',
		isRephrase: false,
		// isParaphrase: false,
	};
	const API = currData.Type[0].api;
	const [intent, setIntent] = React.useState<string>(
		currData.Option.Intent[0].prompt
	);
	const [tone, setTone] = React.useState<string>(
		currData.Option.Tone[0].prompt
	);
	const [para, setPara] = React.useState<boolean>(false);
	const [gramSpell, setGramSpell] = React.useState<boolean>(false);
	const [power, setPower] = React.useState<string>(
		currData.Option.Power[1].level
	);
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

	const handlePowerChange = (event: any) => {
		setPower(event.target.value);
	};

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
		RephraseOption.intent = intent;
		RephraseOption.tone = tone;
		RephraseOption.isRephrase = gramSpell;
		RephraseOption.power = power;
	}, [intent, para, tone, gramSpell]);

	return (
		<>
			<div>
				<div className="hidden md:block w-full h-full">
					<div className=" flex gap-4 flex-col">
						<div className=" flex items-center gap-2">
							<span className=" text-xl font-bold  ">{currData.title}</span>
							<EditIcon className="text-[1.5rem]" />
						</div>
						<span className="-mt-4 text-sm ">{currData.subheading}</span>
						<div className="border-t-2 border-gray "></div>
						<span className=" text-xl font-bold  ">Setting </span>

						<OptionChoice
							name="Tone"
							handleInputChange={handleToneChange}
							option={currData.Option.Tone}
						/>
						{/* 
						<div className="flex justify-between items-center">
							<div
								className={` ${
									para && gramSpell == false ? 'text-gray-700' : 'text-gray-400'
								} cursor-pointer transition-all duration-200`}
								onClick={() => setPara(!para)}>
								Paraphrase
							</div>
							<label className="relative cursor-pointer">
								<input
									type="checkbox"
									checked={para && gramSpell == false}
									onChange={handleChangeCheck}
									disabled={gramSpell == true}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
							</label>
						</div> */}

						<Accordion
							className=" border-b-0 divide-y-0 "
							flush={true}
							alwaysOpen={true}
							collapseAll={true}>
							<Accordion.Panel>
								<Accordion.Title className="px-0 py-2 bg-white text-sm hover:text-primary transition-all duration-300">
									Optional Setting
								</Accordion.Title>
								<Accordion.Content className="px-0 py-0 mb-4  ">
									<div className="w-full flex flex-col gap-4">
										<Tooltip content="Keep the originality of sentence structure ">
											<div className="flex items-center mt-4">
												<input
													id="red-checkbox"
													type="checkbox"
													checked={gramSpell}
													onChange={handleChangeOnlyGramAndSpell}
													className=" text-primary rounded cursor-pointer"
												/>
												<label
													htmlFor="red-checkbox"
													className={`ml-2 text-sm whitespace-nowrap font-medium cursor-pointer ${
														gramSpell ? 'text-gray-700' : 'text-gray-400'
													}`}>
													Only Detect Grammar & Spelling
												</label>
											</div>
										</Tooltip>
										{/* <OptionChoice
											name="Intent"
											handleInputChange={handleIntentChange}
											option={currData.Option.Intent}
										/> */}
										{/* <OptionRadio
											name="Vocabulary"
											defaultVal="Simple"
											Choice={currData.AdvancedOption.Vocabulary}
											handleInputChange={handleVocabChange}
										/> */}
									</div>
								</Accordion.Content>
							</Accordion.Panel>
						</Accordion>

						<SubmitButton
							key={API + 1}
							changeAPI={API}
							fuelCost={fuelCost}
							Options={RephraseOption}
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
							Options={RephraseOption}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReviewEd;
