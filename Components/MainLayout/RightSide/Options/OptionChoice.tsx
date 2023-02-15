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
					className=" appearance-none bg-gray-100 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ">
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
