import type {WidgetInfo} from '../Widget';
import PageRendererComponent from './PageRendererComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    package: 'nodeviz',
    name: 'page',
    desktop: {
        renderer: PageRendererComponent
    }
});
