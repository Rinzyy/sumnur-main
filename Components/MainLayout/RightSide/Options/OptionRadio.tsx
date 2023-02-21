import React from 'react';

interface Option {
	label: string;
}

interface Prop {
	Choice: Option[];
	name: string;
	defaultVal: string;
	handleInputChange: (event: any) => void;
}

const OptionRadio = ({ Choice, name, defaultVal, handleInputChange }: Prop) => {
	return (
		<div>
			<form className=" transition-all duration-200 ">
				<h3 className="mb-2 text-sm font-medium text-gray-700 ">{name}</h3>
				<ul className="items-center  w-full border border-gray-600 text-sm font-medium bg-gray-50 text-gray-900 p-1 overflow-hidden rounded-lg sm:flex">
					{Choice.map(item => (
						<li
							key={item.label}
							className="w-full   ">
							<div className="flex items-center">
								<input
									id={item.label}
									type="radio"
									value={item.label}
									name="list-radio"
									onChange={handleInputChange}
									defaultChecked={item.label == defaultVal ? true : false}
									className="peer hidden"
								/>
								<label
									htmlFor={item.label}
									className="w-full cursor-pointer text-center border-2 border-gray-50 rounded-md p-1 text-sm font-medium text-gray-900 hover:bg-gray-200 hover peer-checked:bg-primary  peer-checked:text-white peer-checked:border-primary peer-checked:shadow-lg transition-all duration-200 ">
									{item.label}
								</label>
							</div>
						</li>
					))}
				</ul>
			</form>
		</div>
	);
};

export default OptionRadio;
