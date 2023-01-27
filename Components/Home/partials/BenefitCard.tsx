import Link from 'next/link';
import React from 'react';
interface props {
	title: string;
	description: string;
	link: string;
}
const BenefitCard = ({ title, description, link }: props) => {
	return (
		<div className="relative w-full">
			<div className="p-4 md:w-full">
				<div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
					<div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
						<svg
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							className="w-8 h-8"
							viewBox="0 0 24 24">
							<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
						</svg>
					</div>
					<div className="flex-grow">
						<h2 className="text-gray-900 text-lg title-font font-medium mb-3">
							{title}
						</h2>
						<p className="leading-relaxed text-base">{description}</p>
						<Link
							href={link}
							className="mt-3 text-indigo-500 inline-flex items-center">
							Try it
							<svg
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="w-4 h-4 ml-2"
								viewBox="0 0 24 24">
								<path d="M5 12h14M12 5l7 7-7 7"></path>
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BenefitCard;
