import React from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';

const EditorLayout = ({ children }: any) => {
	const router = useRouter();
	return (
		<div>
			<div className="hidden absolute h-full bg-white border-r-2 min-w-14 md:block px-2 pb-20 z-40 hover:w-60 hover:shadow-2xl transition-all duration-200 group">
				<div className="sticky top-[4.5rem] h-auto ">
					<div className="flex flex-col gap-4 justify-center items-start ml-1 ">
						<Link
							href="/"
							className={` cursor-pointer flex flex-row gap-2 ${
								router.pathname === '/' ? 'text-primary' : 'text-black'
							}`}>
							<MenuOutlinedIcon />
							<span className="hidden group-hover:block transition-all duration-500">
								Revise
							</span>
						</Link>
						<Link
							href="/toEmail"
							className={` cursor-pointer flex flex-row gap-2 ${
								router.pathname === '/toEmail' ? 'text-primary' : 'text-black'
							}`}>
							<PublishedWithChangesOutlinedIcon />
							<span className="hidden group-hover:block transition-all duration-500">
								Email Conversion
							</span>
						</Link>
					</div>
				</div>
			</div>
			{/* Mobileversion */}
			<div className="fixed md:hidden border-b-2 z-50 top-[66px] w-full bg-white px-4 py-2  ">
				<div className=" flex flex-row justify-center items-center gap-4 text-gray-400">
					<Link
						href="/"
						className={` cursor-pointer flex flex-row gap-2 ${
							router.pathname === '/' ? 'text-primary' : 'text-black'
						}`}>
						<MenuOutlinedIcon />
						<span className="hidden group-hover:block transition-all duration-500">
							Proofreading
						</span>
					</Link>
					<Link
						href="/toEmail"
						className={` cursor-pointer flex flex-row gap-2 ${
							router.pathname === '/toEmail' ? 'text-primary' : 'text-black'
						}`}>
						<PublishedWithChangesOutlinedIcon />
						<span className="hidden group-hover:block transition-all duration-500">
							Email Conversion
						</span>
					</Link>
					<Link
						href="/rephraser"
						className={` cursor-pointer flex flex-row gap-2 ${
							router.pathname === '/rephraser' ? 'text-primary' : 'text-black'
						}`}>
						<NoteAltOutlinedIcon />
						<span className="hidden group-hover:block transition-all duration-500">
							Rephraser
						</span>
					</Link>
				</div>
			</div>
			{children}
		</div>
	);
};

export default EditorLayout;
