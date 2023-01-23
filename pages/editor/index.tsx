import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const index = () => {
	const router = useRouter();
	useEffect(() => {
		router.push('/editor/proofreading');
	}, []);
};

export default index;
