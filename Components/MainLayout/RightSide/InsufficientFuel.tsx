import React from 'react';
import { useDispatch } from 'react-redux';
import { CloseModal } from '../../../lib/slices/userSlice';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface Prop {
	closeModal: React.MouseEventHandler<HTMLButtonElement>;
}

const InsufficientFuel = ({ closeModal }: Prop) => {
	const dispatch = useDispatch();
	const handleModal = () => {
		dispatch(CloseModal());
	};

	return (
		<div
			className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]
              bg-light rounded-xl pt-8 pb-10 shadow-2xl">
			<button
				className=" absolute right-4 top-4 text-gray-200 bg-gray-300 text-sm p-1 rounded-full hover:text-mainDark"
				onClick={closeModal}>
				<CloseOutlinedIcon />
			</button>
			<span className="text-xl text-mainDark font-bold flex items-center justify-center mb-6">
				Insufficient Fuel
			</span>
			<div className="w-full border-t-2"></div>
			<div className="flex flex-col justify-center gap-4 mt-10 px-10">
				<button
					className=" bg-white h-16 rounded-md border-2 shadow-md border-primary text-mainDark
					hover:bg-slate-100 hover:scale-105 active:scale-100 transition-all duration-200"
					// onClick={} go to  buy fuel
				>
					Add more fuel..
				</button>
			</div>
		</div>
	);
};

export default InsufficientFuel;
