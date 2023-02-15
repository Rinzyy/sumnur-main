module.exports = {
	important: true,
	content: [
		'./node_modules/flowbite-react/**/*.js',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./Components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#604fcd',
				mainDark: '#130b43',
				light: '#f7f6fa',
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
