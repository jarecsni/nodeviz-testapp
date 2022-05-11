import type {WidgetInfo} from '../Widget';
import PageRendererComponent from './PageRendererComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    desktop: {
        renderer: PageRendererComponent
    }
});
