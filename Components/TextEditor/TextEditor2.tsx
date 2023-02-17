// Import React dependencies.
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// Import the Slate editor factory.
import { createEditor, Editor, Transforms } from 'slate';
// Import the Slate components and React plugin.

import { Slate, Editable, withReact } from 'slate-react';
// TypeScript users only add this code
import { BaseEditor, Descendant, Node } from 'slate';
import { ReactEditor } from 'slate-react';

import { useDispatch, useSelector } from 'react-redux';
import { OnChangeInput, submitGrammar } from '../../lib/slices/textSlice';
import { deserialize } from '../../lib/deserialize';
import { withHistory } from 'slate-history';
import { serialize } from '../../lib/serialize';
import { fuelCal } from '../../lib/slices/userSlice';

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
// console.log(useMemo);

function incrementFuel(wordNum: number) {
	var fuel = 1;
	//every 50 word cost 1 fuel and 50 word is 300 char
	fuel = Math.round(wordNum) / 300;
	return Math.ceil(fuel);
}

//get only the string

const TextEditor2 = (bool: any) => {
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);
	const inputWrong = useSelector((state: any) => state.textControl.inputWrong);
	const OutPut = useSelector((state: any) => state.textControl.outputString);
	const lang = useSelector((state: any) => state.textControl.langDetection);
	const dispatch = useDispatch();

	let textLength;
	const [count, setCount] = useState<number>(0);
	const [char, setChar] = useState<number>(0);

	//convert html to slate node
	const html = inputWrong;
	const document = new DOMParser().parseFromString(html, 'text/html');
	deserialize(document.body);

	const initialValue: Descendant[] = useMemo(
		() => [
			{
				type: 'paragraph',
				children: [{ text: '' }],
			},
		],
		[]
	);

	//render element/ might be useful for code in the future but now it useless
	const renderElement = useCallback(
		({ attributes, children, element }: any) => {
			switch (element.type) {
				case 'quote':
					return <blockquote {...attributes}>{children}</blockquote>;
				case 'link':
					return (
						<a
							{...attributes}
							href={element.url}>
							{children}
						</a>
					);
				default:
					return <p {...attributes}>{children}</p>;
			}
		},
		[]
	);

	//render the bold in strong
	const renderLeaf = useCallback(({ attributes, children, leaf }: any) => {
		return (
			<span
				{...attributes}
				// style={{
				// 	textDecoration: leaf.bold ? 'underline' : 'none',
				// 	textDecorationColor: leaf.bold ? 'red' : 'black',
				// 	fontStyle: leaf.italic ? 'italic' : 'normal',
				// }}
			>
				{children}
			</span>
		);
	}, []);

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
		// const recievedOutPut: Descendant[] = [
		// 	{
		// 		type: 'paragraph',
		// 		children: [{ text: OutPut }],
		// 	},
		// ];
		// console.log(OutPut + 'work');
		// console.log(deserialize(document.body));

		editor.children.map(item => {
			Transforms.delete(editor, { at: [0] });
		});

		// reset init
		editor.children = deserialize(document.body);

		// setValue(deserialize(document.body));
	}, [inputWrong]);
	console.log(bool);

	return (
		<div className="relative">
			<Slate
				editor={editor}
				value={initialValue}
				onChange={value => {
					// save data to local
					// const isAstChange = editor.operations.some(
					// 	op => 'set_selection' !== op.type
					// );
					// if (isAstChange) {
					// 	// Save the value to Local Storage.
					// 	const content = JSON.stringify(value);
					// 	localStorage.setItem('content', content);
					// }
					//cal the fuel cos
					textLength = serialize(value).length;
					setChar(textLength);
					dispatch(fuelCal(incrementFuel(textLength)));

					wordcount(serialize(value));

					// console.log(textLength + ' ' + incrementFuel(textLength));
					dispatch(OnChangeInput(serialize(value)));
				}}>
				<div
					className={`absolute top-4 right-6 z-10 text-sm  ${
						count != 0 ? 'text-gray-500' : 'text-gray-400'
					} `}>
					{lang == '' ? (
						<span>{count + ((count as number) > 1 ? ' words' : ' word')}</span>
					) : (
						<div className="flex gap-3 ">
							<span> {lang} - Detected </span>
							<span>
								{char + ((char as number) > 1 ? ' characters' : ' character')}
							</span>
						</div>
					)}
				</div>
				<Editable
					renderElement={renderElement}
					spellCheck
					autoFocus
					renderLeaf={renderLeaf}
					className=" min-h-[300px] bg-white rounded-xl border-2 border-gray-600 shadow-lg px-10 py-8 focus:border-primary "
					onKeyDown={event => {
						//fix backspace line error omg
						if (event.key == 'Backspace') {
							if (serialize(editor.children) == '') {
								editor.children = initialValue;
							}
						}
					}}
					//maybe can find a fix for spacebar break out of leaf
				/>
			</Slate>
		</div>
	);
};

export default TextEditor2;
