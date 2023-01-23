import React from 'react';
import Footer from './common/Footer/Footer';
import Navbar from './common/Navbar/Navbar';

type prop = {
	children: React.ReactNode;
};

const Layout: React.FC<prop> = ({ children }) => {
	return (
		<>
			<Navbar />
			<div className="mt-[60px]">{children}</div>
			<Footer />
		</>
	);
};

export default Layout;
