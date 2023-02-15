export const newData = {
	id: 1,
	title: 'Revise',
	subheading:
		'Improve your writing coherence, grammar, and structure of the text.',
	Type: [
		{
			id: 1,
			name: 'Revise Text',
			api: '/api/AI/Rephrase',
		},
	],
	Option: {
		Intent: [
			{
				id: 1,
				choice: 'Original',
				prompt: '',
			},
			{
				id: 2,
				choice: 'Persuade',
				prompt: 'persuade',
			},
			{
				id: 3,
				choice: 'Clarify',
				prompt: 'clarifying',
			},
			{
				id: 4,
				choice: 'Advise',
				prompt: 'advise',
			},
			{
				id: 5,
				choice: 'Funny',
				prompt: 'funny',
			},
		],

		Tone: [
			{
				id: 11,
				choice: 'Original',
				prompt: '',
			},
			{
				id: 2,
				choice: 'Formal',
				prompt: 'formal',
			},
			{
				id: 22,
				choice: 'Confident',
				prompt: 'confident',
			},
			{
				id: 33,
				choice: 'Empathetic',
				prompt: 'empathetic',
			},
			{
				id: 44,
				choice: 'Question',
				prompt: 'questioning',
			},
		],
	},
};
export const newEmailData = {
	id: 1,
	title: 'Email Converter',
	subheading: 'Convert to email.',
	Type: [
		{
			id: 1,
			name: 'Email convert',
			api: '/api/AI/Email',
		},
	],
	Option: {},
};

export const pageData = {
	id: 1,
	title: 'Paraphase',
	subheading: 'Fix broken English to more readible English',
	Type: [
		{
			id: 1,
			name: 'General Rephrase',
			api: '/api/AI/Rephrase',
		},
	],
	Option: {
		Intent: [
			{
				id: 1,
				choice: 'Inform',
				prompt: 'inform',
			},
			{
				id: 2,
				choice: 'Persuade',
				prompt: 'persuade',
			},
			{
				id: 3,
				choice: 'Clarify',
				prompt: 'clarifying',
			},
			{
				id: 4,
				choice: 'Advise',
				prompt: 'advise',
			},
			{
				id: 5,
				choice: 'Funny',
				prompt: 'funny',
			},
		],

		Tone: [
			{
				id: 11,
				choice: 'normal',
				prompt: 'normal',
			},
			{
				id: 2,
				choice: 'Formal',
				prompt: 'formal',
			},
			{
				id: 22,
				choice: 'Confident',
				prompt: 'confident',
			},
			{
				id: 33,
				choice: 'Empathetic',
				prompt: 'empathetic',
			},
			{
				id: 44,
				choice: 'Question',
				prompt: 'questioning',
			},
		],
		Power: [{ level: 'Reword' }, { level: 'Rephrase' }],
	},
	AdvancedOption: {
		Style: [
			{
				id: 1,
				choice: 'Conversational',
				prompt: 'conversational',
			},
			{
				id: 2,
				choice: 'Documentation',
				prompt: 'documentation',
			},
			{
				id: 3,
				choice: 'Academic',
				prompt: 'academic',
			},
		],
		Audience: [
			{
				id: 1,
				choice: 'General',
				prompt: 'general',
			},
			{
				id: 2,
				choice: 'Children',
				prompt: 'children',
			},
			{
				id: 3,
				choice: 'Academic Student',
				prompt: 'academic student',
			},
		],
		Vocabulary: [
			{ level: 'Simple' },
			{ level: 'Moderate' },
			{ level: 'Advanced' },
		],
	},
};

export const emailData = {
	id: 2,
	title: 'Convert to Email',
	subheading: 'Convert normal English to professinoal Email',
	Option: {
		Type: [
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
		Intent: [
			{
				id: 1,
				choice: 'Describe',
				prompt: 'with an intent to describe',
			},
			{
				id: 2,
				choice: 'Creative',
				prompt: 'with an intent to be creative',
			},
			{
				id: 3,
				choice: 'Convince',
				prompt: 'with an intent to be Convince ',
			},
		],
		Tone: [
			{
				id: 1,
				choice: 'Normal',
				prompt: 'with a normal tone',
			},
			{
				id: 4,
				choice: 'Formal',
				prompt: 'with a formal tone',
			},
			{
				id: 4,
				choice: 'Funny',
				prompt: 'with a funny tone',
			},
		],
	},
};

export const ProofreadingData = {
	id: 1,
	title: 'Proofreading',
	subheading: 'Fix broken English to more readible English',
	Type: [
		{
			id: 1,
			name: 'Proofreading',
			api: '/api/AI/Rephrase',
		},
	],
	Option: {
		Intent: [
			{
				id: 1,
				choice: 'Inform',
				prompt: 'inform',
			},
			{
				id: 2,
				choice: 'Persuade',
				prompt: 'persuade',
			},
			{
				id: 3,
				choice: 'Clarify',
				prompt: 'clarifying',
			},
			{
				id: 4,
				choice: 'Advise',
				prompt: 'advise',
			},
			{
				id: 5,
				choice: 'Funny',
				prompt: 'funny',
			},
		],

		Tone: [
			{
				id: 1,
				choice: 'Normal',
				prompt: 'informal',
			},
			{
				id: 5,
				choice: 'Formal',
				prompt: 'formal',
			},
			{
				id: 22,
				choice: 'Confident',
				prompt: 'confident',
			},
			{
				id: 33,
				choice: 'Empathetic',
				prompt: 'empathetic',
			},
			{
				id: 44,
				choice: 'Question',
				prompt: 'questioning',
			},
		],
		Power: [{ level: 'Minimal' }, { level: 'Moderate' }, { level: 'Maximum' }],
	},
	AdvancedOption: {
		Style: [
			{
				id: 1,
				choice: 'Conversational',
				prompt: 'conversational',
			},
			{
				id: 2,
				choice: 'Documentation',
				prompt: 'documentation',
			},
			{
				id: 3,
				choice: 'Academic',
				prompt: 'academic',
			},
		],
		Audience: [
			{
				id: 1,
				choice: 'General',
				prompt: 'general',
			},
			{
				id: 2,
				choice: 'Children',
				prompt: 'children',
			},
			{
				id: 3,
				choice: 'Academic Student',
				prompt: 'academic student',
			},
		],
		Vocabulary: [
			{ level: 'Simple' },
			{ level: 'Moderate' },
			{ level: 'Advanced' },
		],
	},
};
