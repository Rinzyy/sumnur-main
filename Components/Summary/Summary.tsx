import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Summary = ({ bool, OutPut, title, delayTime }: any) => {
	const [op, setOP] = useState<string>('');
	useEffect(() => {
		// setOP(choose);
	}, [op]);

	return (
		<div
			className={`relative ${
				bool ? ' opacity-1' : ' opacity-0'
			} transition-all duration-500 ${delayTime} `}>
			<div className="absolute left-4 top-2 text-gray-500">
				<span>{title}</span>
			</div>
			<div
				className={`  px-10 py-8 h-auto shadow-lg flex gap-8 border-2 border-gray-600 rounded-md bg-white transition-all duration-500 `}>
				{OutPut}
			</div>
		</div>
	);
};

export default Summary;
