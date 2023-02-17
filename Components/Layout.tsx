import { useRouter } from 'next/router';
import React from 'react';
import Footer from './MainLayout/Footer/Footer';
import Landing from './MainLayout/Landing/Landing';
import Navbar from './MainLayout/Navbar/Navbar';
import EditorLayout from './EditorLayout';

type prop = {
	children: React.ReactNode;
};

const Layout: React.FC<prop> = ({ children }) => {
	const router = useRouter();
	if (router.pathname === '/Payment')
		return (
			<>
				<Navbar />
				<div className="mt-[60px]">{children}</div>
				<Footer />
			</>
		);

	return (
		<>
			<Navbar />
			<div className="mt-[60px]">{children}</div>
			<Landing />
			<Footer />
		</>
	);
};

export default Layout;
