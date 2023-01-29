import React from 'react';
import BenefitCard from './BenefitCard';

const data = [
	{
		title: 'Spelling & Grammar',
		description:
			' Identifies and corrects errors in grammar, punctuation, and spelling to ensure clear, polished writing',
		link: '/',
	},
	{
		title: 'Rephraser',
		description:
			'Paraphrase your text to make it easier to read, unique and free of plagiarism, while also making it better written.',
		link: '/rephraser',
	},
	{
		title: 'Email Convertor',
		description:
			'Automatically adapts text to a formal, professional email format and helps avoid common mistakes.',
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
