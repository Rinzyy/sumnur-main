import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubmitButton from '../SubmitButton';

import { Accordion } from 'flowbite-react';
import OptionChoice from '../Options/OptionChoice';
import OptionRadio from '../Options/OptionRadio';
import { OptionData } from '../../../../lib/interfaces/RephraseInterface';

const EmailConversionEditor = ({ currData }: any) => {
	let emailOption = {
		intent: '',
	};
	const API = currData.Type[0].api;
	// const [intent, setIntent] = React.useState<string>(
	// 	currData.Option.Intent[0].prompt
	// );

	const fuelCost = useSelector((state: any) => state.userControl.fuelCost);

	// const handleIntentChange = (event: any) => {
	// 	setIntent(event.target.value);
	// 	console.log(intent);
	// 	// dispatch(setNewAPI(event.target.value));
	// 	//cool bug it console log previous string
	// 	// console.log(API);
	// };

	// useEffect(() => {
	// 	emailOption.intent = intent;
	// }, [intent]);

	return (
		<>
			<div>
				<div className="hidden md:block w-full h-full">
					<div className=" flex gap-4 flex-col">
						<span className=" text-xl font-bold ">{currData.title}</span>
						<span className="-mt-4 text-sm ">{currData.subheading}</span>
						<div className="border-t border-gray-600 -mx-8"></div>
						{/* 
						<OptionChoice
							name="Intent"
							handleInputChange={handleIntentChange}
							option={currData.Option.Intent}
						/> */}

						{/* <Accordion
							className=" border-b-0 divide-y-0 "
							flush={true}
							alwaysOpen={true}
							collapseAll={true}>
							<Accordion.Panel>
								<Accordion.Title className="px-0 py-2 bg-white text-sm hover:text-primary">
									Advance Setting
								</Accordion.Title>
								<Accordion.Content className="px-0 py-0 mb-4  ">
									<div className="w-full flex flex-col gap-4">
										<OptionRadio
											name="Vocabulary"
											defaultVal="Simple"
											Choice={currData.AdvancedOption.Vocabulary}
											handleInputChange={handleVocabChange}
										/>
										<OptionChoice
											name="Style"
											option={currData.AdvancedOption.Style}
											handleInputChange={handleStyleChange}
										/>
										<OptionChoice
											name="Audience"
											option={currData.AdvancedOption.Audience}
											handleInputChange={handleAudienceChange}
										/>
									</div>
								</Accordion.Content>
							</Accordion.Panel>
						</Accordion> */}

						<SubmitButton
							key={API + 1}
							changeAPI={API}
							fuelCost={fuelCost}
							Options={emailOption}
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
							Options={emailOption}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default EmailConversionEditor;
