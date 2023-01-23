import { configureStore } from '@reduxjs/toolkit';
import textControlReducer from './slices/textSlice';
import userControlReducer from './slices/userSlice';

export default configureStore({
	reducer: {
		textControl: textControlReducer,
		userControl: userControlReducer,
	},
});
