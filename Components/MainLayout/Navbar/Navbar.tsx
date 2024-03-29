import { Menu, MenuItem, Modal, Popover } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react';
import LoginPage from '../../LoginPage/LoginModal';
import AppsIcon from '@mui/icons-material/Apps';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import {
	CloseModal,
	isUserLogin,
	OpenModal,
	SetUserPhoto,
	SetUserUID,
	ShowUserFuel,
	userLogout,
} from '../../../lib/slices/userSlice';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useRouter } from 'next/router';

const Navbar = () => {
	const router = useRouter();

	const [open, setOpen] = React.useState(false);
	const modalHandler = useSelector(
		(state: any) => state.userControl.userSignInModal
	);
	const handleOpen = () => {
		dispatch(OpenModal());
		console.log(modalHandler);
	};
	const handleClose = () => dispatch(CloseModal());
	const userPhoto = useSelector((state: any) => state.userControl.userPhoto);
	const userFuel = useSelector((state: any) => state.userControl.userFuel);
	const userUID = useSelector((state: any) => state.userControl.userUID);

	const dispatch = useDispatch();

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('user') as string);
		if (userData) {
			dispatch(isUserLogin());
			dispatch(SetUserPhoto(userData.photoURL));
			if (localStorage.getItem('userFuel') != null) {
				dispatch(ShowUserFuel(localStorage.getItem('userFuel')));
				// console.log('yes fuel is added to redux');
			}
			dispatch(SetUserUID(userData.uid));
		}
		console.log(userData);
	}, [userUID]);

	useEffect(() => {
		// console.log(userUID);
		// if (localStorage.getItem(userFuel) != null) {
		// 	dispatch(ShowUserFuel(localStorage.getItem('userFuel')));
		// }
		const userData = JSON.parse(localStorage.getItem('user') as string);

		if (userData != null) {
			onSnapshot(
				doc(db, 'UsersFuel', userData.uid),
				doc => {
					console.log('Current data: ', doc.data());
					dispatch(ShowUserFuel(doc.data()?.fuel));
					localStorage.setItem('userFuel', doc.data()?.fuel);
					// setUserFuel(doc.data()?.fuel);
				},
				error => {
					console.log(error);
				}
			);
		}
	}, [userFuel, userUID]);

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				dispatch(SetUserPhoto(null));
				localStorage.removeItem('user');
				localStorage.removeItem('userFuel');
				setAnchorEl(null);
				dispatch(userLogout());

				// Sign-out successful.
			})
			.catch(error => {
				// An error happened.
			});
	};

	function renderSwitch(param: string) {
		switch (param) {
			case '/':
				return 'Rephrase';
			case '/grammar':
				return 'Grammar Checker';
			case '/toEmail':
				return 'Email Conversion';
			case '/summarize':
				return 'Summarization';

			default:
				return ' ';
		}
	}

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null
	);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const HandlePopoverClose = () => {
		setAnchorEl(null);
	};
	const anchorbool = Boolean(anchorEl);

	return (
		<nav
			id="Top"
			className="fixed top-0 w-full bg-white z-[100] border-b-2 border-gray-600">
			<div className="flex items-center justify-between px-6 py-4">
				<Link
					href={router.pathname}
					className="flex flex-row gap-4 items-center">
					<div className="flex flex-row justify-center items-center gap-2">
						<span className="text-xl font-bold">Sumnur</span>
						<div className="mt-1 text-xs font-extrabold border-2 border-black p-1 rounded-md">
							BETA
						</div>
					</div>
				</Link>
				<div className="flex gap-4 items-center">
					<span className="transition-all duration-100">
						{' '}
						{renderSwitch(router.pathname)}
					</span>
				</div>
				<div className="flex flex-row">
					{userPhoto == null ? (
						<>
							<div
								className="cursor-pointer flex gap-2 items-center justify-center group"
								onClick={() => dispatch(OpenModal())}>
								<img
									className=" rounded-md w-8 h-8 ring-2 ring-offset-2 ring-primary group-hover:scale-110 transition-all duration-200"
									src="/user.jpeg"
									alt=""
								/>
								<span>LOGIN</span>
							</div>
						</>
					) : (
						<>
							<div className="relative cursor-pointer flex gap-2 items-center justify-center group">
								<button
									className="flex flex-row items-center justify-center gap-2"
									onClick={handleClick}>
									<img
										className=" rounded-md w-8 h-8 ring-2 ring-offset-2 ring-primary group-hover:scale-110 transition-all duration-200"
										src={userPhoto}
										referrerPolicy="no-referrer"
										alt=""
									/>
									<div className="flex items-center justify-center">
										<WhatshotIcon className="text-sm pt-[2px]" />
										<span className=" font-extrabold text-lg">{userFuel}</span>
									</div>
								</button>
								<Menu
									className="absolute top-3 rounded-md p-2 w-96  "
									id="id"
									open={anchorbool}
									anchorEl={anchorEl}
									onClose={HandlePopoverClose}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'left',
									}}>
									<MenuItem onClick={handleSignOut}> Sign out</MenuItem>
								</Menu>
								{/* <button onClick={handleSignOut}> Sign out</button> */}
							</div>
						</>
					)}
				</div>
			</div>
			<Modal
				open={modalHandler}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<div>
					<LoginPage closeModal={handleClose} />
				</div>
			</Modal>
		</nav>
	);
};

export default Navbar;
