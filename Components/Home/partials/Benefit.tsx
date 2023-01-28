import React from 'react';
import BenefitCard from './BenefitCard';

const data = [
	{
		title: 'Spelling & Grammar',
		description: 'Detect Spelling ad Grammar Error',
		link: '/',
	},
	{
		title: 'Rephraser',
		description: 'Paraphrase your text into more standard english',
		link: '/rephraser',
	},
	{
		title: 'Email Convertor',
		description: 'Convert normal english into email',
		link: '/toEmail',
	},
];

const Benefit = () => {
	return (
		<section>
			<div className="bg-white  flex flex-col gap-10 py-10">
				<div className="flex items-center justify-center mt-10">
					<span className=" border-primary border rounded-full p-2 text-primary">
						Services
					</span>
				</div>
				<span className=" text-4xl text-center">Our Current Services</span>
				<div className="container px-5 pb-14 mx-auto flex flex-wrap">
					<div className="flex flex-col lg:flex-row -m-4">
						{data.map(item => (
							<BenefitCard
								key={item.title}
								title={item.title}
								description={item.description}
								link={item.link}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Benefit;
