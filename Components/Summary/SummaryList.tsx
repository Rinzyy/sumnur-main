import React from 'react';
import { SplitSentence } from '../../lib/splitsentence';

const SummaryList = ({ bool, OutPut, title, delayTime }: any) => {
	return (
		<div
			className={`relative ${
				bool ? ' opacity-1' : ' opacity-0'
			} transition-all duration-500 ${delayTime} `}>
			<div className="absolute left-4 top-2 text-gray-500">
				<span>{title}</span>
			</div>
			<div
				className={`  px-10 pt-8 pb-6 h-auto shadow-lg flex flex-col gap-2 border-2 border-gray-600 rounded-md bg-white transition-all duration-500 `}>
				{Object.keys(OutPut).map(key => (
					<span key={key}>{OutPut[key]}</span>
				))}
			</div>
		</div>
	);
};

export default SummaryList;
