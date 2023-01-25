import React from 'react';
import style from './home.module.css';
const CallToAction = () => {
	return (
		<div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 ">
			<div className="rounded-xl p-10 w-[100%] bg-white shadow-lg flex flex-col items-center gap-4">
				<span className="text-xl whitespace-nowrap md:text-4xl">
					Start Improving your Writing Today!
				</span>
				<button
					className="  border-2 px-6 py-2 text-xl bg-white flex flex-row justify-center items-center
						text-[#604fcd] border-[#604fcd] rounded-md shadow-md hover:scale-102 active:scale-95 transition-all duration-300 hover:bg-gray-100 hover:font-bold
						disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100">
					<span className="font-medium"> Start Free Trial </span>
				</button>
			</div>
		</div>
	);
};

export default CallToAction;
