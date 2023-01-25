import { useRouter } from 'next/router';
import React from 'react';
import Footer from './common/Footer/Footer';
import Landing from './common/Landing/Landing';
import Navbar from './common/Navbar/Navbar';
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
			<EditorLayout>
				<div className="mt-[60px]">{children}</div>
			</EditorLayout>
			<Landing />
			<Footer />
		</>
	);
};

export default Layout;
