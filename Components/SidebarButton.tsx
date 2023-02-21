import Link from 'next/link';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';

interface Props {
	path: string;
	name: string;
	icon: any;
}
const SidebarButton = ({ path, name, icon }: Props) => {
	const router = useRouter();
	return (
		<div className=" w-full transition-all duration-200 ">
			<Link
				href={path}
				className={`p-2 rounded-md  cursor-pointer flex flex-row items-center justify-start  gap-2 ${
					router.pathname === path
						? 'text-black font-bold bg-gray-100 '
						: 'text-gray-500'
				}`}>
				<div>{icon}</div>
				<span className="hidden group-hover:block transition-all duration-500">
					{name}
				</span>
			</Link>
		</div>
	);
};

export default SidebarButton;
