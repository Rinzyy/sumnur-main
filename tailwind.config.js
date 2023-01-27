module.exports = {
	important: true,
	content: [
		'./pages/**/*.tsx',
		'./components/**/*.tsx',
		'./app/**/*.tsx',
		'./pages/**/*.ts',
		'./components/**/*.ts',
		'./app/**/*.ts',
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
