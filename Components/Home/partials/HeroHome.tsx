import React, { useState } from 'react';

import HeroImage from '../images/hero-image.png';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import style from './home.module.css';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { OpenModal } from '../../../lib/slices/userSlice';

function HeroHome() {
	const [videoModalOpen, setVideoModalOpen] = useState(true);
	const dispatch = useDispatch();
	const router = useRouter();

	const ClickHandlerBeforeLogin = () => {
		dispatch(OpenModal());
	};
	const ClickHandlerAfterLogin = () => {
		router.push('/Payment');
	};
	return (
		<section className="relative flex flex-col md:flex-row items-center justify-between border-y-2 border-gray-600 bg-white py-20 px-20  ">
			<div className=" flex flex-col gap-10 pb-10 ">
				<div className="flex flex-col gap-4">
					<h1 className="text-4xl -mt-4">Sorsay AI-Powered </h1>
					<h1 className="text-4xl -mt-4">Writing Tool</h1>
				</div>
				<div className="flex justify-start items-start flex-col md:w-[500px] m-1/2">
					<p className=" text-start">
						Efficiently detects grammar, punctuation, and spelling errors and
						also suggests more effective word choices and sentence structure to
						elevate your writing to new heights.
					</p>
				</div>
				<div className="flex items-center justify-start">
					{videoModalOpen ? (
						<button
							className="  border-2 px-6 py-2 text-xl bg-white flex flex-row justify-center items-center
							text-[#604fcd] border-[#604fcd] rounded-md shadow-md hover:scale-102 active:scale-95 transition-all duration-300 hover:bg-gray-100 hover:font-bold
							disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
							onClick={ClickHandlerBeforeLogin}>
							<span className="font-medium"> Start Free Trial </span>
						</button>
					) : (
						<button
							className="  border-2 px-6 py-2 text-xl bg-white flex flex-row justify-center items-center
							text-[#604fcd] border-[#604fcd] rounded-md shadow-md hover:scale-102 active:scale-95 transition-all duration-300 hover:bg-gray-100 hover:font-bold
							disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
							onClick={ClickHandlerAfterLogin}>
							<span className="font-medium"> Buy more Fuel </span>
						</button>
					)}
				</div>
				<div className="flex gap-10">
					<div className="flex items-center gap-1">
						<CheckCircleIcon className="text-primary" />
						{videoModalOpen ? (
							<span> Free 50 Fuel</span>
						) : (
							<span> Fast Payment</span>
						)}
					</div>

					{videoModalOpen ? (
						<div className="flex items-center gap-1">
							<CheckCircleIcon className="text-primary" />
							<span> Fast Payment</span>
						</div>
					) : (
						<span> </span>
					)}
				</div>
			</div>
			<div className="relative w-[360px] h-[256px]">
				<div className={style.bgGrid}></div>
				<div className={style.card}>
					<div className="h-full flex flex-col">
						<div className="m-4 h-1/2">
							<span>Detects all your spolling and grommer.</span>
						</div>
						<hr className=" border-primary border-[1px]" />
						<div className="m-4 h-1/2">
							<span>Detects all your spelling and grammers.</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HeroHome;

{
	/* <span>
					Say goodbye to tedious writing, and hello to effortless with
				</span> */
}
{
	/* <p>
		tired of spending countless hours proofreading your work? Sumnur is
		here to change that. State-of-the-art AI technology not only detects
		grammar, punctuation, and spelling errors, but also suggests more
		effective word choices and sentence structure to elevate your writing
		to new heights. Imagine a world where you can confidently submit your
		work, knowing that it is polished, professional, and error-free. With
		Sumnur, that world is a reality. Don't just take our word for it, try
		it now and experience the transformative power of Sumnur for yourself.
	</p> */
}
