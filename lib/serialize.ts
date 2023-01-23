import { Descendant, Node } from 'slate';

export const serialize = (nodes: Descendant[]) => {
	return nodes.map(n => Node.string(n)).join('\n');
};
