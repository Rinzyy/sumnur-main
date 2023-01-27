import React from 'react';
import PaymentForm from '../../Payment/PaymentForm';
import Paypal from '../../Payment/Paypal';
import EastIcon from '@mui/icons-material/East';
import Card from './Card';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { PricingData } from './PricingData';

const Pricing = () => {
	return (
		<div className="bg-gray-100 flex flex-col gap-10 pt-10 pb-40">
			<div className="flex items-center justify-center mt-10">
				<span className=" border-primary border rounded-full p-2 text-primary">
					Pricing
				</span>
			</div>
			<div className="text-center">
				<h3 className=" text-4xl font-medium text-gray-900 ">Re-Fueling</h3>
			</div>
			<div className="m-10 py-10 grid grid-cols-2 md:m-auto lg:m-16 lg:grid-cols-5 gap-4 ">
				{PricingData.map(item => (
					<Card
						key={item.price}
						name={item.name}
						amount={item.amount}
						price={item.price}
					/>
				))}
			</div>

			{/* <Paypal /> */}
		</div>
	);
};

export default Pricing;
