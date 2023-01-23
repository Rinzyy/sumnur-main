export const pageData = {
	id: 1,
	title: 'Proofreading',
	subheading: 'Check spelling and grammar',
	Option: [
		{
			id: 1,
			name: 'General Writing',
			api: '/api/AI/Proofread/General',
		},
		{
			id: 2,
			name: 'Academic Writing',
			api: '/api/AI/Proofread/Academic',
		},
	],
};

export const emailData = {
	id: 2,
	title: 'Convert to Email',
	subheading: 'Convert normal English to professinoal Email',
	Option: [
		{
			id: 1,
			name: 'Formal Email',
			api: '/api/AI/Email/Formal',
		},
		{
			id: 2,
			name: 'Business Email',
			api: '/api/AI/Email/Business',
		},
	],
};

export const rephraserData = {
	id: 3,
	title: 'Rephrase',
	subheading: 'Fix broken English to more readible English',
	Option: [
		{
			id: 1,
			name: 'General Rephrase',
			api: '/api/AI/Rephrase/General',
		},
	],
};
