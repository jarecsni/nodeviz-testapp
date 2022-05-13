
import type {SvelteComponent} from 'svelte';

export interface Widget {
}

export interface WidgetInfo {
    type: string,
    desktop: {
        renderer: typeof SvelteComponent
    }
}