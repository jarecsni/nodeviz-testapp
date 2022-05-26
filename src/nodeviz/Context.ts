import type {Node} from 'nodeviz/Node';

export interface Context {
    navigateTo(node:Node<object>): void;
    isVisible(node:Node<object>): boolean;
}