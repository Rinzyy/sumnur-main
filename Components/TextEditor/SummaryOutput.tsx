// Import React dependencies.
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// Import the Slate editor factory.
import {
	createEditor,
	Editor,
	Transforms,
	BaseEditor,
	Descendant,
} from 'slate';
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
// TypeScript users only add this code
import { ReactEditor } from 'slate-react';
import { useDispatch, useSelector } from 'react-redux';

import style from './SummaryOutput.module.css';
type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

type prop = {
	ReadOnly: Boolean;
};
declare module 'slate' {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}

const SummaryOutput = ({ ReadOnly }: prop) => {
	const listSummarizedString = useSelector(
		(state: any) => state.textControl.listSummarizedString
	);
	const animation = useSelector((state: any) => state.textControl.btnAnimate);
	const dispatch = useDispatch();
	const editor = useMemo(() => withReact(createEditor()), []);
	const [count, setCount] = useState<number>(0);

	let readBool = ReadOnly;
	const initialValue: Descendant[] = useMemo(
		() =>
			JSON.parse(localStorage.getItem('outputContent') as string) || [
				{
					type: 'paragraph',
					children: [{ text: '' }],
				},
			],
		[]
	);
	const [value, setValue] = useState<Descendant[]>(initialValue);

	function wordcount(str: string) {
		let c = 0;
		let str1 = str.split(' ');

		for (let i = 0; i < str1.length; i++) {
			if (str1.length === 0) {
				setCount(0);
			}
			if (str1[i] !== '') {
				c++;
			}
			setCount(c);
		}
	}

	useEffect(() => {
		const recievedOutPut: Descendant[] = [
			{
				type: 'paragraph',
				children: [{ text: listSummarizedString }],
			},
		];
		setValue(recievedOutPut);
		wordcount(listSummarizedString);
		readBool = false;
		// Transforms.removeNodes(editor, { at: [0] });
		// Transforms.insertNodes(editor, deserialize(document.body));
	}, [listSummarizedString]);
	//render twice cause of strictmode nextjs olny in development

	return (
		<div className="relative">
			<Slate
				editor={editor}
				value={value}
				//change the value since the actual value cannot be changed
				key={JSON.stringify(value)}
				// onChange={value => {
				// 	const isAstChange = editor.operations.some(
				// 		op => 'set_selection' !== op.type
				// 	);
				// 	if (isAstChange) {
				// 		// Save the value to Local Storage.
				// 		const content = JSON.stringify(value);
				// 		localStorage.setItem('content', content);
				// 	}
				// }}
			>
				<span className={`absolute top-2 left-4 z-10 text-sm text-gray-500 `}>
					Key Points
				</span>

				<Editable
					readOnly
					className=" h-auto bg-white rounded-md border-2 border-gray-600 shadow-lg px-10 py-8 focus:border-mainDark"
				/>
			</Slate>
		</div>
	);
};

export default SummaryOutput;
