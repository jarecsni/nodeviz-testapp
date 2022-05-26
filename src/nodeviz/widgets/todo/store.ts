import {Node} from 'nodeviz/Node';
import type {TodoJson} from './Todo';
import {writable} from 'svelte/store';

export const todos = writable<Array<TodoJson>>([]);
export const showCompleted = writable<boolean>(true);
