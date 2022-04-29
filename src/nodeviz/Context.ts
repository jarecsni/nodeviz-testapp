import type { Node } from "./Node";
import type { Page } from "./widgets/page/types";

export interface Context {
    navigateTo(node:Node<Page>): void;
}