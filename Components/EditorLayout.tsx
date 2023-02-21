import React from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SidebarButton from './SidebarButton';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import EvStationOutlinedIcon from '@mui/icons-material/EvStationOutlined';

const EditorLayout = ({ children }: any) => {
	const router = useRouter();
	return (
		<div>
			<div className="hidden h-full pt-4 bg-white border-r-2 border-gray-500 min-w-14 md:block px-2 pb-20 z-40 hover:w-60 absolute hover:shadow-2xl transition-all duration-200 group">
				<div className="flex flex-col gap-2 justify-center items-start  ">
					<SidebarButton
						path="/"
						name="Rephrase"
						icon={<SpellcheckOutlinedIcon />}
					/>
					{/* <SidebarButton
						path="/Grammar"
						name="Grammar & Spelling"
						icon={<SpellcheckOutlinedIcon />}
					/>
					<div className="flex items-center justify-center w-full">
						<div className="border-t-2 mx-1  w-full"></div>
					</div> */}

					<SidebarButton
						path="/toEmail"
						name="Email Conversion"
						icon={<MarkEmailReadOutlinedIcon />}
					/>
					{/* <SidebarButton
						path="/translate"
						name="Advanced Translation"
						icon={<TranslateOutlinedIcon />}
					/>

					<div className="flex items-center justify-center w-full">
						<div className="border-t-2 mx-1  w-full"></div>
					</div> */}
					<SidebarButton
						path="/summarize"
						name="Summarization"
						icon={<SummarizeOutlinedIcon />}
					/>
					{/* <div></div>
					<SidebarButton
						path="/Payment"
						name="Buy More Fuel"
						icon={<EvStationOutlinedIcon />}
					/> */}
				</div>
			</div>
			{/* Mobileversion */}
			<div className="fixed md:hidden border-b-2 border-gray-600 z-50 top-[66px] w-full bg-white px-4 py-1  ">
				<div className=" flex flex-row justify-center items-center gap-4 text-gray-400">
					<div>
						<SidebarButton
							path="/"
							name="Rephrase"
							icon={<SpellcheckOutlinedIcon />}
						/>
					</div>
					<div>
						<SidebarButton
							path="/toEmail"
							name="Email Conversion"
							icon={<MarkEmailReadOutlinedIcon />}
						/>
					</div>
					<div>
						<SidebarButton
							path="/summarize"
							name="Summarization"
							icon={<SummarizeOutlinedIcon />}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditorLayout;
