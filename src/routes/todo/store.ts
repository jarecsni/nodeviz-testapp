import type { Node } from "src/nodeviz/Node";
import type { Todo } from "src/nodeviz/widgets/todo/types";
import { writable } from "svelte/store";

export const todos = writable<Array<Node<Todo>>>([]);