import type { Node } from "./Node";

export interface Context {
    navigateTo(node:Node<unknown>): void;
}