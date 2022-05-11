import type {Node} from './Node';

export interface Context {
    navigateTo(node:Node<object>): void;
    isVisible(node:Node<object>): boolean;
}