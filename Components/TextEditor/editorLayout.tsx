import React from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';

const editorLayout = ({ children }: any) => {
	const router = useRouter();
	return (
		<div>
			<div className="hidden fixed top-[66px] h-screen bg-white border-r-2 min-w-14 md:block p-2 z-40 overflow-hidden hover:w-60 hover:shadow-2xl transition-all duration-200 group">
				<div className=" flex flex-col gap-4 justify-center items-start ml-1 ">
					<a
						href="/editor/proofreading"
						className={` cursor-pointer flex flex-row gap-2 ${
							router.pathname === '/editor/proofreading'
								? 'text-primary'
								: 'text-black'
						}`}>
						<MenuOutlinedIcon />
						<span className="hidden group-hover:block transition-all duration-500">
							Proofreading
						</span>
					</a>
					<a
						href="/editor/toEmail"
						className={` cursor-pointer flex flex-row gap-2 ${
							router.pathname === '/editor/toEmail'
								? 'text-primary'
								: 'text-black'
						}`}>
						<PublishedWithChangesOutlinedIcon />
						<span className="hidden group-hover:block transition-all duration-500">
							Email Conversion
						</span>
					</a>
					<a
						href="/editor/rephraser"
						className={` cursor-pointer flex flex-row gap-2 ${
							router.pathname === '/editor/rephraser'
								? 'text-primary'
								: 'text-black'
						}`}>
						<NoteAltOutlinedIcon />
						<span className="hidden group-hover:block transition-all duration-500">
							Rephraser
						</span>
					</a>
				</div>
			</div>
			{/* Mobileversion */}
			<div className="fixed md:hidden border-b-2 z-50 top-[66px] w-full bg-white px-4 py-2  ">
				<div className=" flex flex-row justify-center items-center gap-4 text-gray-400">
					<a
						href="/editor/proofreading"
						className={` cursor-pointer flex flex-row gap-2 ${
							router.pathname === '/editor/proofreading'
								? 'text-primary'
								: 'text-black'
						}`}>
						<MenuOutlinedIcon />
						<span className="hidden group-hover:block transition-all duration-500">
							Proofreading
						</span>
					</a>
					<a
						href="/editor/toEmail"
						className={` cursor-pointer flex flex-row gap-2 ${
							router.pathname === '/editor/toEmail'
								? 'text-primary'
								: 'text-black'
						}`}>
						<PublishedWithChangesOutlinedIcon />
						<span className="hidden group-hover:block transition-all duration-500">
							Email Conversion
						</span>
					</a>
					<a
						href="/editor/rephraser"
						className={` cursor-pointer flex flex-row gap-2 ${
							router.pathname === '/editor/rephraser'
								? 'text-primary'
								: 'text-black'
						}`}>
						<NoteAltOutlinedIcon />
						<span className="hidden group-hover:block transition-all duration-500">
							Rephraser
						</span>
					</a>
				</div>
			</div>
			{children}
		</div>
	);
};

export default editorLayout;
