
import type {SvelteComponent} from 'svelte';

export interface Widget {
}

export interface WidgetInfo {
    desktop: {
        renderer: typeof SvelteComponent
    }
}