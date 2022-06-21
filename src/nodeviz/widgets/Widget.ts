
import type {SvelteComponent} from 'svelte';

export interface Widget {
}

export interface WidgetInfo {
    package: string,
    name: string,
    type?: string,
    desktop: {
        renderer: typeof SvelteComponent
    },
    widgets?: string[]
}