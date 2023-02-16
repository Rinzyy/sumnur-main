import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import { NextPage } from 'next';
import SummarizeEditor from '../Components/MainLayout/RightSide/EditorSetting/SumarizeEditor';
import { sumData } from '../lib/Data/summarizeData';

import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
const DynamicLoadedEditor = dynamic(
	import('../Components/TextEditor/TextEditor2'),
	{
		loading: () => (
			<div className="p-10 w-full h-[300px] shadow-lg flex gap-8 border-2 rounded-md bg-white"></div>
		),
		ssr: false,
	}
);

const Home: NextPage = () => {
	const OutPut = useSelector((state: any) => state.textControl.outputString);
	const summarizedString = useSelector(
		(state: any) => state.textControl.summarizedString
	);
	const listSumString = useSelector(
		(state: any) => state.textControl.listSummarizedString
	);
	let boole = true;

	return (
		<>
			<section
				id="Editor"
				className=" scroll-smooth transition-all duration-200 bg-gray-100 ">
				<div className="relative w-full h-full flex flex-row transition-all ">
					<div className="hidden md:block w-12 emptyspaceforsidebar"></div>
					<div className="pb-8 w-full min-h-[92vh] md:mt-0 md:w-9/12">
						<div className=" flex flex-col gap-2">
							<div className="mx-10 my-8">
								<DynamicLoadedEditor bool={boole} />
							</div>
							<div className={`mx-10 flex flex-col gap-2 `}>
								<span>Summary</span>
								<div
									className={`  px-10 py-8 h-auto ${
										boole ? 'h-0 opacity-0 ' : ' opacity-1'
									} shadow-lg flex gap-8 border-2 rounded-xl bg-white transition-all duration-500 `}>
									{OutPut}
								</div>
								{/* <UnfoldLessIcon className=" self-center" /> */}
								<div
									className={`  px-10 py-8 h-auto ${
										boole ? 'h-0 opacity-0' : ' opacity-1'
									} shadow-lg flex gap-8 border-2 rounded-xl bg-white transition-all duration-500 delay-300 `}>
									{listSumString}
								</div>
								{/* <UnfoldLessIcon className=" self-center" /> */}

								<div
									className={`  px-10 py-8 h-auto ${
										boole ? 'h-0 opacity-0' : ' opacity-1'
									} shadow-lg flex gap-8 border-2 rounded-xl bg-white transition-all duration-500 delay-700 `}>
									{summarizedString}
								</div>
							</div>
						</div>
					</div>
					<div className=" relative md:w-3/12 md:border bg-white shadow-lg rounded-xl mr-2 my-8 md:px-10 md:py-6">
						<div className="sticky top-20 mb-4">
							<SummarizeEditor currData={sumData} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;

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
