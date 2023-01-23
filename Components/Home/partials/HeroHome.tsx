import React, { useState } from 'react';

import HeroImage from '../images/hero-image.png';

function HeroHome() {
	const [videoModalOpen, setVideoModalOpen] = useState(false);

	return (
		<section className="relative">
			<div className="left">
				<span>Say goodbye to your spelling and grammars error with</span>
				<span>Sumnur</span>
				<span>
					Accurate and professional proofreading services for all your texts
					Essay, and emails.
				</span>
				<div>
					<button>Start Free Trial</button>
				</div>
			</div>
		</section>
	);
}

export default HeroHome;
