import React from 'react';

const Footer = () => {
	return (
		<div className="relative bg-light border-t-2 border-gray-600 px-14 z-[40] pt-20">
			<div className="flex flex-row justify-around items-center m-10">
				<div className="logo">
					<h3>Sumnur</h3>
				</div>
				<div className="">
					<div className="flex flex-col gap-1">
						<a href="">Term of service</a>
						<a href="">About Us</a>
						<a href="">Prvacy Policiy</a>
					</div>
				</div>
				<div className="contact">
					<h3>Connect with us</h3>
					<div className=" flex flex-row gap-2">
						<a href="">Twitter</a>
						<a href="">Facebook</a>
						<a href="">Instagram</a>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-center border-t-2"></div>
			<div className="px-4 py-2">
				<span> Sumnur - Copyright @ 2023 - All Right Reserved</span>
			</div>
		</div>
	);
};

export default Footer;
