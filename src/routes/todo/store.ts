import { writable } from "svelte/store";

export type Todo = {
    description:string;
}

export const todos = writable<Array<Todo>>([]);