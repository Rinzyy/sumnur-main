import type { NextPage } from 'next';
import Benefit from '../Components/Home/partials/Benefit';
import CallToAction from '../Components/Home/partials/CallToAction';
import Features from '../Components/Home/partials/Features';
import HeroHome from '../Components/Home/partials/HeroHome';

const Home: NextPage = () => {
	return (
		<div>
			<HeroHome />
			<Benefit />
			<Features />
			<CallToAction />
		</div>
	);
};

export default Home;
