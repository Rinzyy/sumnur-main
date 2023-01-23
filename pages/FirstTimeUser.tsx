import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const FirstTimeUser = () => {
	const router = useRouter();
	useEffect(() => {
		console.log('Running function...');
		router.push('/');
	}, []);

	return null;
};
export default FirstTimeUser;
