import React from 'react';

interface Option {
	level: string;
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
			<form className=" transition-all duration-200">
				<h3 className="mb-2 text-sm font-medium text-gray-700 ">{name}</h3>
				<ul className="items-center w-full text-sm font-medium text-gray-900 bg-gray-100 p-1 overflow-hidden rounded-lg sm:flex">
					{Choice.map(item => (
						<li
							key={item.level}
							className="w-full   ">
							<div className="flex items-center">
								<input
									id={item.level}
									type="radio"
									value={item.level}
									name="list-radio"
									onChange={handleInputChange}
									defaultChecked={item.level == defaultVal ? true : false}
									className="peer hidden"
								/>
								<label
									htmlFor={item.level}
									className="w-full text-center rounded-md p-1 text-sm font-medium text-gray-900 cursor-pointer peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-lg transition-all duration-200 ">
									{item.level}
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
