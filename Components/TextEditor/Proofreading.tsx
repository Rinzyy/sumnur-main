import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import EditorSetting from '../MainLayout/RightSide/EditorSetting/ReviewEditor';
import style from '../../pages/editor.module.css';
import SouthIcon from '@mui/icons-material/South';
import { pageData } from '../../lib/Data/pageData';

const DynamicLoadedEditor = dynamic(import('./TextEditor'), {
	loading: () => (
		<div className="p-10 w-full flex flex-col gap-8 border-r-2"></div>
	),
	ssr: false,
});
const DynamicLoadedOutput = dynamic(import('./TextOutput'), {
	loading: () => (
		<div className="p-10 w-full flex flex-col gap-8 border-r-2"></div>
	),
	ssr: false,
});

const Proofreading = () => {
	return (
		<div>
			<div className="relative w-full flex flex-row ">
				<div className="hidden md:block w-12 emptyspaceforsidebar"></div>
				<div className="w-full mt-10 md:mt-0 md:w-9/12">
					<div className={style.bgpattern}>
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
				<div className=" md:w-3/12 md:border-l-2 md:px-10 md:py-6">
					<EditorSetting currData={pageData} />
				</div>
			</div>
		</div>
	);
};

export default Proofreading;

{
	/* <div className={style.bgpattern}>
	<span className="md:hidden text-xl text-center mb-4">Proofreading</span>
	<div className="md:w-full lg:w-5/12">
		<DynamicLoadedEditor />
	</div>
	<div className=" md:block lg:w-2/12 m-2">
		<EditorSetting />
	</div>
	<div className="md:w-full lg:w-5/12">
		<DynamicLoadedOutput ReadOnly={true} />
	</div>
</div> */
}

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
