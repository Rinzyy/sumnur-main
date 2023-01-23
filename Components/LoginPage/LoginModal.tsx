import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
	signInWithPopup,
	GoogleAuthProvider,
	getAdditionalUserInfo,
} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { auth, db } from '../../firebase';
import { useDispatch } from 'react-redux';
import {
	CloseModal,
	isUserLogin,
	SetUserPhoto,
	SetUserUID,
} from '../../lib/slices/userSlice';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

interface Prop {
	closeModal: React.MouseEventHandler<HTMLButtonElement>;
}

function createNewUser(user: any) {
	const userRef = doc(db, 'Users', user.uid);
	setDoc(
		userRef,
		{
			userId: user.uid,
			photoURL: user.photoURL,
			name: user.displayName,
			email: user.email,
			emailVerified: user.emailVerified,
		},
		{ merge: true }
	);

	const fuelRef = doc(db, 'UsersFuel', user.uid);
	setDoc(
		fuelRef,
		{
			fuel: 50,
			avgFuelUsage: 0,
			isPremium: false,
			totalFuelUsage: 0,
			uid: user.uid,
		},
		//if already exist it will overwrite it with data above
		{ merge: true }
	);
}
const LoginPage = ({ closeModal }: Prop) => {
	const dispatch = useDispatch();
	const handleModal = () => {
		dispatch(CloseModal());
	};

	const provider = new GoogleAuthProvider();
	let user: any;
	const handleSignIn = async () => {
		signInWithPopup(auth, provider)
			.then(result => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				// The signed-in user info.
				user = result.user;
				console.log(user);
				localStorage.setItem('user', JSON.stringify(user));
				dispatch(SetUserPhoto(user.photoURL as string));
				dispatch(SetUserUID(user.uid as string));
				dispatch(isUserLogin());

				const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
				if (isNewUser) {
					//if new user it create new acc and add fuel
					createNewUser(user);
				}
				dispatch(CloseModal());

				// firestore.collection('users').doc(user.uid).set({
				// 	name,
				// 	lastName,
				// });
			})
			.catch(error => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.en;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				console.log(error);
				// ...
			});
		// .then(result => {});
	};

	return (
		<div
			className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]
              bg-light rounded-xl pt-8 pb-10 shadow-2xl">
			<button
				className=" absolute right-4 top-4 text-gray-200 bg-gray-300 text-sm p-1 rounded-full hover:text-mainDark"
				onClick={closeModal}>
				{' '}
				<CloseOutlinedIcon />
			</button>
			<span className="text-xl text-mainDark font-bold flex items-center justify-center mb-6">
				Sign In/ Sign Up
			</span>
			<div className="w-full border-t-2"></div>
			<div className="flex flex-col justify-center gap-4 mt-10 px-10">
				<button
					className=" bg-white h-16 rounded-md border-2 shadow-md border-primary text-mainDark
					hover:bg-slate-100  active:scale-95 transition-all duration-200"
					onClick={handleSignIn}>
					{' '}
					Sign in With Google
				</button>

				<button
					className=" bg-white h-16 rounded-md border-2 shadow-md border-primary text-mainDark
					hover:bg-slate-100 active:scale-95 transition-all duration-200"
					onClick={handleSignIn}>
					{' '}
					Sign in with Google
				</button>
				{/*
				<button
					className=" bg-white h-16 rounded-md border-2 shadow-md border-primary text-mainDark
					hover:bg-slate-100 hover:scale-105 active:scale-100 transition-all duration-200"
					onClick={handleGoogleLogin}>
					{' '}
					Sign in With Google
				</button> */}
			</div>
		</div>
	);
};

export default LoginPage;
