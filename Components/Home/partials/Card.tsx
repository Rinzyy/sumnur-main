import React from 'react';
import EastIcon from '@mui/icons-material/East';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { OpenModal, setPlan } from '../../../lib/slices/userSlice';

interface props {
	name: string;
	amount: number;
	price: number;
}
const Card = ({ name, amount, price }: props) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const buyPlan = useSelector((state: any) => state.userControl.buyPlan);

	const ClickHandler = () => {
		if (localStorage.getItem('user') == null) {
			dispatch(OpenModal());
			return;
		}
		dispatch(setPlan(name));

		router.push('/Payment');
	};
	return (
		<div
			onClick={ClickHandler}
			className={`h-full w-50 md:w-52 px-6 pt-6 pb-5 bg-white shadow-xl rounded-lg border-2 ${
				name == 'PRO' ? 'border-primary' : ''
			}
			${
				name == 'STUDENT' ? 'border-gray-400' : ''
			}  cursor-pointer border-gray-30  flex flex-col justify-start relative overflow-hidden 
            group hover:border-green-400 hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200`}>
			<h2 className="text-sm tracking-widest title-font mb-1  group-hover:text-green-400 font-medium">
				{name}
			</h2>
			{name == 'STUDENT' ? (
				<span className="bg-gray-400 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl  group-hover:bg-green-400 transition-all duration-200">
					RECOMMENED
				</span>
			) : (
				<></>
			)}
			{name == 'PRO' ? (
				<span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl  group-hover:bg-green-400 transition-all duration-200">
					POPULAR
				</span>
			) : (
				<></>
			)}

			<div>
				<h1 className="text-4xl text-gray-900  pb-4 mb-2 border-b border-gray-200 leading-none">
					{amount}
					<WhatshotIcon className="ml-2" />
				</h1>
			</div>

			<h2 className="text-xl tracking-widest title-font mb-4 font-medium">
				{price}$
			</h2>

			<button className="flex items-center mt-auto text-white bg-gray-400 group-hover:bg-green-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
				Buy Now
				<svg
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					className="w-4 h-4 ml-auto"
					viewBox="0 0 24 24">
					<path d="M5 12h14M12 5l7 7-7 7"></path>
				</svg>
			</button>
			<p className="text-xs text-gray-500 mt-3"> </p>
		</div>
	);
};

export default Card;
