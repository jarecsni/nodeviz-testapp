
import type {SvelteComponent} from 'svelte';

export interface Widget {
}

export interface WidgetInfo {
    package: string,
    name: string,
    type: string,
    parent?: string,
    desktop: {
        renderer: typeof SvelteComponent
    },
    widgets?: string[],
    getDefaultNodeObject: () => object
}

export interface WidgetManifest {
    package: string,
    name: string,
    type: string,
    description: string,
    author: string,
    version: string,
    date: string
}