import { createSlice } from '@reduxjs/toolkit';

export const textSlice = createSlice({
	name: 'textControl',
	initialState: {
		inputString: '',
		finalInput: '',
		inputWrong: `<p> </p>`,
		outputString: 'Hello, Type your text above',
		listSummarizedString: '',
		summarizedString: '',
		apiPath: '',
		totalToken: '',
		btnAnime: false,
		langDetection: '',
	},

	reducers: {
		OnChangeInput: (state, action) => {
			state.inputString = action.payload;
			// console.log(state.inputString);
		},
		submitGrammar: state => {
			state.finalInput = state.inputString;
			// console.log(state.inputString);
		},
		recieveOutput: (state, action) => {
			state.outputString = action.payload;
			// console.log(state.outputString);
		},
		recievedSummarized: (state, action) => {
			state.summarizedString = action.payload;
			// console.log(state.outputString);
		},
		recievedListSummarized: (state, action) => {
			state.listSummarizedString = action.payload;
			// console.log(state.outputString);
		},
		DetectLanguage: (state, action) => {
			state.langDetection = action.payload;
			// console.log(state.inputString);
		},
		setNewInputWrong: (state, action) => {
			state.inputWrong = action.payload;
		},
		setNewAPI: (state, action) => {
			state.apiPath = action.payload;
		},
		tokenCal: (state, action) => {
			state.totalToken = action.payload;
		},

		setButtonAnime: state => {
			state.btnAnime = !state.btnAnime;
		},
	},
});

export const {
	OnChangeInput,
	submitGrammar,
	recieveOutput,
	recievedSummarized,
	recievedListSummarized,
	setNewInputWrong,
	setNewAPI,
	tokenCal,
	setButtonAnime,
	DetectLanguage,
} = textSlice.actions;
export default textSlice.reducer;
