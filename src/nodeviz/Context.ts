import type { Node } from "./Nodes";

export interface Context {
    navigateTo(node:Node): void;
}