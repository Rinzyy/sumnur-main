import React from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import GppGoodIcon from '@mui/icons-material/GppGood';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const Features = () => {
	return (
		<section className=" py-10 pb-20 bg-gray-100">
			{/* <div className="border h-1 bg-primary border-primary mx-20 rounded-xl flex justify-center">
				{' '}
			</div> */}
			<div className="flex items-center justify-center mt-10">
				<span className=" border-primary border rounded-full p-2 text-primary">
					Why Sumnur
				</span>
			</div>
			<div className="flex items-center justify-center m-10">
				<h1 className="text-4xl">Our AI Tool will help you</h1>
			</div>
			<div className=" grid grid-flow-row md:grid-cols-2 lg:grid-cols-4 items-center justify-evenly gap-8 text-lg m-auto md:mx-10 mt-10">
				<div className=" relative flex flex-col items-center gap-2 bg-gray-50 border-[6px] border-white  rounded-md p-4 shadow-lg">
					<div className="flex items-center w-64 h-20 lg:w-auto justify-start gap-2">
						<TaskAltIcon className="text-primary" />
						<span>Save Countless Hour</span>
					</div>
					<div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-100 border-[3px] border-white px-1 pb-1 pt-[4px] rounded-full">
						<MoreTimeIcon className="text-4xl text-primary" />
					</div>
				</div>
				<div className="relative flex flex-col items-center gap-2 bg-gray-50 border-[6px] border-white  rounded-md p-4 shadow-lg">
					<div className=" flex items-center w-64 h-20 lg:w-auto  justify-start gap-2">
						<TaskAltIcon className="text-primary" />
						<span>Improve Readibility</span>
					</div>
					<div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-100 border-[3px] border-white px-1 pb-1 pt-[4px] rounded-full">
						<FactCheckIcon className="text-4xl text-primary" />
					</div>
				</div>
				<div className="relative flex flex-col items-center gap-2 bg-gray-50 border-[6px] border-white  rounded-md p-4 shadow-lg">
					<div className=" flex items-center w-64 h-20 lg:w-auto  justify-start gap-2">
						<TaskAltIcon className="text-primary" />
						<span>Improve Writing Confident</span>
					</div>
					<div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-100 border-[3px] border-white px-1 pb-1 pt-[4px] rounded-full">
						<AddReactionIcon className="text-4xl text-primary" />
					</div>
				</div>
				<div className="relative flex flex-col items-center gap-2 bg-gray-50 border-[6px] border-white  rounded-md p-4 shadow-lg">
					<div className=" flex items-center w-64 h-20 lg:w-auto  justify-start gap-2">
						<TaskAltIcon className="text-primary" />
						<span>Increase Credibility</span>
					</div>
					<div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-100 border-[3px] border-white px-1 pb-1 pt-[4px] rounded-full">
						<GppGoodIcon className="text-4xl text-primary" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Features;
