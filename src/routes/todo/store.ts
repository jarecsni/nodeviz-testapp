import type { Node } from '../../nodeviz/Node';
import type { Todo } from '../../nodeviz/widgets/todo/Todo';
import {writable} from 'svelte/store';

export const todos = writable<Array<Node<Todo>>>([]);