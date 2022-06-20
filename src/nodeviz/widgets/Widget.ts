
import type {SvelteComponent} from 'svelte';

export interface Widget {
}

export interface WidgetInfo {
    uniquePackageName: string,
    name: string,
    type?: string,
    desktop: {
        renderer: typeof SvelteComponent
    },
    widgets?: string[]
}