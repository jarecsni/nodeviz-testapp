import type { Node } from "./Node";

export interface Context {
    navigateTo(node:Node<unknown>): void;
    isVisible(node:Node<unknown>): boolean;
}