import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import style from './editor.module.css';
import SouthIcon from '@mui/icons-material/South';
import { NextPage } from 'next';
import Head from 'next/head';
import { Fab } from '@mui/material';
import { newData, pageData } from '../lib/Data/pageData';
import RephraseEditor from '../Components/MainLayout/RightSide/EditorSetting/ReviewEditor';
import ReviewEditor from '../Components/MainLayout/RightSide/EditorSetting/ReviewEditor';
import { quickStart } from '../lib/Translation';
import EditorLayout from '../Components/EditorLayout';

const DynamicLoadedEditor = dynamic(
	import('../Components/TextEditor/TextEditor'),
	{
		loading: () => (
			<div className="p-10 w-full h-[300px] shadow-lg flex gap-8 border-2 rounded-md bg-white"></div>
		),
		ssr: false,
	}
);
const DynamicLoadedOutput = dynamic(
	import('../Components/TextEditor/TextOutput'),
	{
		loading: () => (
			<div className="p-10 w-full h-[300px] shadow-lg flex gap-8 border-2 rounded-md bg-white"></div>
		),
		ssr: false,
	}
);

const Grammar = () => {
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
					<div className=" relative md:w-3/12 md:border-l-2 border-gray-600 bg-white shadow-lg  md:px-8 md:py-6">
						<div className="sticky top-20 mb-4">
							<ReviewEditor currData={newData} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Grammar;
