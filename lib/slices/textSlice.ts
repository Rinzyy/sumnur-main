import { createSlice } from '@reduxjs/toolkit';

export const textSlice = createSlice({
	name: 'textControl',
	initialState: {
		inputString: '',
		finalInput: '',
		inputWrong: `<p> </p>`,
		outputString: 'Hello, Type your text above',
		apiPath: '',
		totalToken: '',
		btnAnime: false,
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
	setNewInputWrong,
	setNewAPI,
	tokenCal,
	setButtonAnime,
} = textSlice.actions;
export default textSlice.reducer;
