import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubmitButton from '../SubmitButton';

import { Accordion, Tooltip } from 'flowbite-react';
import OptionChoice from '../Options/OptionChoice';
import OptionRadio from '../Options/OptionRadio';
import { OptionData } from '../../../../lib/interfaces/RephraseInterface';

const SummarizeEditor = ({ currData }: any) => {
	let sumarizeOption = {
		Options: '',
	};

	//request to backend
	const API = currData.Type[0].api;

	const fuelCost = useSelector((state: any) => state.userControl.fuelCost);

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
