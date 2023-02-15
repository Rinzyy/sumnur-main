import React from 'react';
import Benefit from '../../Home/partials/Benefit';
import CallToAction from '../../Home/partials/CallToAction';
import Features from '../../Home/partials/Features';
import HeroHome from '../../Home/partials/HeroHome';
import Pricing from '../../Home/partials/Pricing';

const Landing = () => {
	return (
		<div className="relative z-[50]">
			<HeroHome />
			<Features />
			<Benefit />
			<Pricing />
			<CallToAction />
		</div>
	);
};

export default Landing;
