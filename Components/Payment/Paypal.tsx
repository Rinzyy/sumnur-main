import {
	FUNDING,
	PayPalButtons,
	PayPalHostedField,
	PayPalHostedFieldsProvider,
	PayPalScriptProvider,
	usePayPalHostedFields,
} from '@paypal/react-paypal-js';
import React, { useState } from 'react';

const Paypal = () => {
	const [paidFor, setPaidFor] = useState(false);
	const [error, setError] = useState('');

	const handleApprove = (orderId: any) => {
		setPaidFor(true);
	};

	if (paidFor) {
		alert('Thank You for purchasing from Eazy2Code');
	}

	if (error) {
		alert(error);
	}

	var FUNDING_SOURCES = [FUNDING.PAYPAL];

	return (
		<div className=" min-w-[300px]">
			<PayPalScriptProvider options={{ 'client-id': 'test' }}>
				<PayPalButtons
					style={{
						color: 'silver',
						layout: 'horizontal',
					}}
					fundingSource={FUNDING.PAYPAL}
					onClick={(data, actions) => {
						const hasAlreadyBoughtCourse = false;
						if (hasAlreadyBoughtCourse) {
							setError('You Already bough this course');
							return actions.reject();
						} else {
							return actions.resolve();
						}
					}}
					createOrder={(data, actions) => {
						return actions.order.create({
							purchase_units: [
								{
									description: '100fuel',
									amount: {
										value: '1.99',
									},
								},
							],
						});
					}}
					onApprove={async (data, action) => {
						const order = await action.order?.capture();
						console.log('order', order);

						handleApprove(data.orderID);
					}}
					onCancel={() => {}}
					onError={err => {
						console.log('PayPal Checkout onError', err);
					}}
				/>
			</PayPalScriptProvider>
		</div>
	);
};

export default Paypal;
