import {
	FUNDING,
	PayPalButtons,
	PayPalHostedField,
	PayPalHostedFieldsProvider,
	PayPalScriptProvider,
	usePayPalHostedFields,
} from '@paypal/react-paypal-js';
import { loadScript } from '@paypal/paypal-js';
import { doc, increment, runTransaction } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../firebase';
import Head from 'next/head';

async function FuelTransaction(userUID: string, boughtFuel: number) {
	let result = false;
	if (userUID == null) return;
	try {
		const fuelRef = doc(db, 'UsersFuel', userUID);
		await runTransaction(db, async transaction => {
			const fuelDoc = await transaction.get(fuelRef);
			if (!fuelDoc.exists()) {
				throw 'Document does not exist!';
				//add create user acc merge
			}

			transaction.update(fuelRef, { fuel: increment(boughtFuel) });
			result = true;
		});
		console.log('Transaction successfully committed!');
	} catch (e) {
		console.log('Transaction failed: ', e);
		//error modal
	}
	return result;
}
interface props {
	description: string;
	boughtFuel: number;
	price: number;
}
const Paypal = ({ description, boughtFuel, price }: props) => {
	const [load, setLoad] = useState(false);
	const [error, setError] = useState('');

	const handleApprove = (orderId: any) => {
		const userId = JSON.parse(localStorage.getItem('user') as string).uid;
		FuelTransaction(userId, boughtFuel);
	};

	if (error) {
		alert(error);
	}

	var FUNDING_SOURCES = [FUNDING.PAYPAL];

	const id = process.env.PAYPAL_CLIENT_ID as string;
	console.log(id);

	return (
		<>
			<div className=" min-w-[300px]">
				<PayPalScriptProvider
					options={{
						'client-id':
							'ASYuYkX3pp3BDSMB-DAByze8Y0tTZzrOtVb4FKT-9lgvnSpeFX_zCDWW8-n_WYbEOaq-Ommqfc8oZRgc',
					}}>
					<PayPalButtons
						onClick={() => console.log(description)}
						forceReRender={[description]}
						style={{
							color: 'silver',
							layout: 'horizontal',
						}}
						fundingSource={FUNDING.PAYPAL}
						createOrder={(data, actions) => {
							return actions.order.create({
								purchase_units: [
									{
										description: `${description}`,
										amount: {
											value: `${price}`,
										},
									},
								],
							});
						}}
						onApprove={async (data, action) => {
							const order = await action.order?.capture();
							console.log('order', order);

							// handleApprove(data.orderID);
						}}
						onCancel={() => {}}
						onError={err => {
							console.log('PayPal Checkout onError', err);
						}}
					/>
				</PayPalScriptProvider>
			</div>
		</>
	);
};

export default Paypal;

{
	// const paypal = useRef<any>();
	// useEffect(() => {
	// 	const script = document.createElement('script');
	// 	script.src =
	// 		'https://www.paypal.com/sdk/js?client-id=AQdpsun2L_Ua14FQIw0PNi8UfCO4QdDhiFmd5G9ibTpLtUMZjowikI38mlPTZLdne7O1pGZKWMjWRjbp';
	// 	script.addEventListener('load', () => setLoad(true));
	// 	document.body.appendChild(script);
	// 	if (load) {
	// 		setTimeout(() => {
	// 			console.log('sssss');
	// 			window.paypal?.Buttons!({
	// 				createOrder(data, actions) {
	// 					return actions.order.create({
	// 						intent: 'CAPTURE',
	// 						purchase_units: [
	// 							{
	// 								description: `${description}`,
	// 								amount: {
	// 									value: `${price}`,
	// 								},
	// 							},
	// 						],
	// 					});
	// 				},
	// 				onApprove: async (data, actions) => {
	// 					return await actions.order?.capture().then(function (details) {
	// 						handleApprove(data.orderID);
	// 						// console.log('order', order);
	// 					});
	// 				},
	// 				onError(err) {
	// 					console.log('PayPal Checkout onError', err);
	// 				},
	// 				style: {
	// 					color: 'silver',
	// 					layout: 'horizontal',
	// 				},
	// 			}).render(paypal.current);
	// 		});
	// 	}
	// }, []);
}
