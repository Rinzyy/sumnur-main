import React from 'react';
import BenefitCard from './BenefitCard';

const Benefit = () => {
	return (
		<section>
			<div className="bg-white  flex flex-col gap-10 py-10">
				<div className="flex items-center justify-center mt-10">
					<span className=" border-primary border rounded-full p-2 text-primary">
						Services
					</span>
				</div>
				<div className="container px-5 py-14 mx-auto flex flex-wrap">
					<div className="flex flex-col lg:flex-row -m-4">
						<BenefitCard />
						<BenefitCard />
						<BenefitCard />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Benefit;
