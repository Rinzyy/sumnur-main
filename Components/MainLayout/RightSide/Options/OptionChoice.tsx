import React from 'react';

interface Intent {
	id: number;
	choice: string;
	prompt: string;
}

interface Props {
	name: string;
	option: Intent[];
	handleInputChange: (event: any) => void;
}

interface handleChange {
	handleInputChange: (event: any) => void;
}
const OptionChoice = ({ name, option, handleInputChange }: Props) => {
	return (
		<form>
			<label
				htmlFor={name}
				className="block mb-2 text-sm font-medium text-gray-700">
				{name}
			</label>
			<div className="relative flex flex-row">
				<select
					id={name}
					onChange={handleInputChange}
					defaultValue={option[0].prompt}
					className=" appearance-none cursor-pointer bg-gray-50 border p-[10px] border-gray-600 text-gray-900 text-sm rounded-lg hover:ring-primary focus:ring-primary focus:border-primary block w-full ">
					{option.map((item: any) => (
						<option
							key={item.id}
							value={item.prompt}>
							{item.choice}
						</option>
					))}
				</select>
			</div>
		</form>
	);
};

export default OptionChoice;
