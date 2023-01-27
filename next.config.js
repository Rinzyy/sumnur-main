/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	env: {
		PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
	},
};
