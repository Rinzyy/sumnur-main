import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import SouthIcon from '@mui/icons-material/South';
import style from './editor.module.css';
import EmailConversionEditor from '../Components/MainLayout/RightSide/EditorSetting/EmailConversionEditor';
import {
	emailData,
	newData,
	newEmailData,
	pageData,
} from '../lib/Data/pageData';
import EditorLayout from '../Components/EditorLayout';
const DynamicLoadedEditor = dynamic(
	import('../Components/TextEditor/TextEditor'),
	{
		loading: () => (
			<div className="p-10 w-full flex flex-col gap-8 border-r-2"></div>
		),
		ssr: false,
	}
);
const DynamicLoadedOutput = dynamic(
	import('../Components/TextEditor/TextOutput'),
	{
		loading: () => (
			<div className="p-10 w-full flex flex-col gap-8 border-r-2"></div>
		),
		ssr: false,
	}
);

const toEmail = () => {
	return (
		<>
			<section
				id="Editor"
				className=" bg-gray-100 scroll-smooth transition-all duration-200 ">
				<div className="relative w-full h-full flex flex-row transition-all ">
					<EditorLayout />
					<div className="hidden md:block w-12 emptyspaceforsidebar"></div>
					<div className="w-full min-h-auto  md:mt-0 md:w-9/12">
						<div className=" px-8 py-8 flex flex-col gap-2 bg-gray-100">
							<div className="md:w-full">
								<DynamicLoadedEditor />
							</div>
							<div className=" text-center">
								<SouthIcon />
							</div>
							<div className="md:w-full">
								<DynamicLoadedOutput ReadOnly={true} />
							</div>
						</div>
					</div>
					<div className=" relative md:w-3/12 md:border-l-2 border-gray-600 bg-white md:px-8 md:py-6">
						<div className="sticky top-20 mb-4">
							<EmailConversionEditor currData={newEmailData} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default toEmail;

// old;
// <div className="relative w-full flex">
// 			<div className=" sm:hidden gap-10 sticky top-[66px] md:border-r-2 md:w-14 md:h-[100vh] md:-mt-4 md:block">
// 				<div className=" sticky top-[86px] flex flex-col ml-4 mt-4 gap-4 text-gray-400">
// 					<MenuOutlinedIcon className="text-black" />
// 					<PublishedWithChangesOutlinedIcon />
// 					<NoteAltOutlinedIcon />
// 				</div>
// 			</div>
// 			<div className="m w-full md:w-4/5 lg:w-3/5 bg-slate-50">
// 				<div className="p-10 w-full flex flex-col gap-8 border-r-2">
// 					<DynamicLoadedEditor ReadOnly={false} />
// 				</div>
// 			</div>
// 			<div className="hidden md:block p-10 w-2/5 md:1/5">
// 				<EditorRight textC="a" />
// 			</div>
// 		</div>
