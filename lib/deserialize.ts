//turn html to text node
import { jsx } from 'slate-hyperscript';

export const deserialize: any = (el: any) => {
	if (el.nodeType === 3) {
		return el.textContent;
	}
	if (el.nodeType !== 1) {
		return null;
	}

	let children = Array.from(el.childNodes).map(deserialize);

	if (children.length === 0) {
		children = [{ text: '' }];
	}

	switch (el.nodeName) {
		// Elements:
		case 'BODY':
			return jsx('fragment', {}, children);
		case 'P':
			return jsx('element', { type: 'paragraph' }, children);
		case 'A':
			return jsx(
				'element',
				{ type: 'link', url: el.getAttribute('href') },
				children
			);

		// Leafs:
		case 'STRONG':
			return jsx('text', { bold: true }, children);
		case 'EM':
			return { text: el.textContent, italic: true };
		case 'U':
			return jsx('text', { underline: true }, children);
		default:
			return el.textContent;
	}
};
