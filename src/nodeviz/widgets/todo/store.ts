import type {Node} from '../../Node';
import type {Todo} from './Todo';
import {writable} from 'svelte/store';

export const todos = writable<Array<Node<Todo>>>([]);
export const showCompleted = writable<boolean>(true);
