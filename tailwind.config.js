module.exports = {
	important: true,
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
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
	plugins: [],
};
