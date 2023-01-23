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

import style from './textoutput.module.css';
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

const TextEditor = ({ ReadOnly }: prop) => {
	const OutPut = useSelector((state: any) => state.textControl.outputString);
	const animation = useSelector((state: any) => state.textControl.btnAnimate);
	const dispatch = useDispatch();
	const editor = useMemo(() => withReact(createEditor()), []);
	const [count, setCount] = useState<number>(0);

	const initialValue: Descendant[] = useMemo(
		() =>
			JSON.parse(localStorage.getItem('outputContent') as string) || [
				{
					type: 'paragraph',
					children: [{ text: 'Type your text here!' }],
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
				children: [{ text: OutPut }],
			},
		];
		setValue(recievedOutPut);
		wordcount(OutPut);

		// Transforms.removeNodes(editor, { at: [0] });
		// Transforms.insertNodes(editor, deserialize(document.body));
	}, [OutPut]);
	//render twice cause of strictmode nextjs olny in development

	return (
		<div className="relative">
			<Slate
				editor={editor}
				value={value}
				//change the value since the actual value cannot be changed
				key={JSON.stringify(value)}
				onChange={value => {
					const isAstChange = editor.operations.some(
						op => 'set_selection' !== op.type
					);
					if (isAstChange) {
						// Save the value to Local Storage.
						const content = JSON.stringify(value);
						localStorage.setItem('content', content);
					}
				}}>
				<span
					className={`absolute top-2 right-4 z-10 text-sm ${
						count != 0 ? 'text-gray-500' : 'text-gray-400'
					} `}>
					{count + ((count as number) > 1 ? ' words' : ' word')}
				</span>

				<Editable
					readOnly={ReadOnly as boolean}
					className=" min-h-[300px] bg-white rounded-md border-2 border-gray shadow-lg px-10 py-8 focus:border-primary "
				/>
			</Slate>
		</div>
	);
};

export default TextEditor;
