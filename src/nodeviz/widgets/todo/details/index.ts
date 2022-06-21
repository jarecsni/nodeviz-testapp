import type {WidgetInfo} from '../../Widget';
import DetailsDesktopComponent from './DetailsDesktopComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    package: 'nodeviz',
    name: 'todoDetails',
    type: 'Todo',
    desktop: {
        renderer: DetailsDesktopComponent
    }
});
