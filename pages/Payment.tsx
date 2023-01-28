import Card from '../Components/Home/partials/Card';
import React, { useEffect, useState } from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { NumericFormat } from 'react-number-format';
import { PricingData } from '../Components/Home/partials/PricingData';
import { useSelector } from 'react-redux';
import Paypal from '../Components/Payment/Paypal';

interface plan {
	name: string;
	price: number;
	amount: number;
}
interface props {
	choosenPlan: string;
}
const Payment = (choosenPlan: props) => {
	const [plan, setPlan] = useState<plan>();
	const [radioState, setradioState] = useState('PRO');
	const buyPlan = useSelector((state: any) => state.userControl.buyPlan);

	const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setradioState(e.currentTarget.value);
	};
	useEffect(() => {
		if (buyPlan != '') setradioState(buyPlan);
	}, [buyPlan]);

	useEffect(() => {
		const filteredData = PricingData.find(item => item.name === radioState);
		setPlan(filteredData);
		console.log(plan);
	}, [radioState]);

	return (
		<div className="relative flex flex-col items-center justify-center h-full pb-10">
			<div className="flex flex-col gap-2 mt-10">
				<div className="flex flex-wrap items-center justify-center gap-4">
					{PricingData.map(item => (
						<label
							key={item.price}
							htmlFor={'price' + item.price}>
							<input
								id={'price' + item.price}
								type="radio"
								value={item.name}
								name="fuelPrice"
								checked={item.name === radioState}
								onChange={onRadioChange}
								className="hidden peer"
							/>
							<div
								className={`h-full w-50 p-6 bg-white shadow-xl rounded-lg border-2  ${
									item.name == 'STUDENT' ? 'border-gray-400' : ''
								}
								${
									item.name == 'PRO' ? 'border-primary' : ''
								} cursor-pointer border-gray-30  flex flex-col justify-start relative overflow-hidden 
            peer-checked:border-green-400 hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 `}>
								<h2 className="text-sm tracking-widest title-font mb-1  peer-checked:text-green-400 font-medium">
									{item.name}
								</h2>
								{item.name == 'STUDENT' ? (
									<span className="bg-gray-400 text-white text-center px-3 py-1 tracking-widest text-[10px] absolute right-0 top-0 rounded-t-bl w-full  peer-checked:bg-green-400 transition-all duration-200">
										RECOMMENED
									</span>
								) : (
									<></>
								)}
								{item.name == 'PRO' ? (
									<span className="bg-indigo-500 text-center text-white px-3 py-1 tracking-widest text-[10px] absolute right-0 top-0 rounded-t-bl w-full  group-hover:bg-green-400 transition-all duration-200">
										POPULAR
									</span>
								) : (
									<></>
								)}
								<div>
									<h1 className="text-4xl text-gray-900  pb-4 mb-2 border-b border-gray-200 leading-none">
										{item.amount}
										<WhatshotIcon className="ml-2" />
									</h1>
								</div>
								<h2 className="text-xl tracking-widest title-fontfont-medium">
									{item.price}
									<span className="text-sm">$</span>
								</h2>
							</div>
						</label>
					))}
				</div>
			</div>
			<div className=" h-full rounded-md flex flex-col gap-4 p-6">
				<span> Payment Method:</span>
				<div className="w-full ">
					<Paypal
						description={plan?.name as string}
						price={plan?.price as number}
						boughtFuel={plan?.amount as number}
					/>
				</div>
				<div></div>
				<hr />
				<div className="flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<span>Choosen Plan</span>
						<span>{radioState}</span>
					</div>
					<div className="flex items-center justify-between">
						<span>Subtotal </span>
						<NumericFormat
							className=" text-right bg-white w-auto"
							value={plan?.price}
							fixedDecimalScale={true}
							decimalScale={2}
							suffix=" $"
							readOnly
							disabled
						/>
					</div>
					<div className="flex items-center justify-between">
						<span>Fee</span>
						<NumericFormat
							className=" text-right bg-white w-auto"
							value={0.2}
							fixedDecimalScale={true}
							decimalScale={2}
							suffix=" $"
							readOnly
							disabled
						/>
					</div>
					<div className="flex items-center justify-between">
						<span>Total</span>
						<NumericFormat
							className=" text-right bg-white"
							value={(plan?.price || 0) + 0.2}
							fixedDecimalScale={true}
							decimalScale={2}
							suffix=" $"
							readOnly
							disabled
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
