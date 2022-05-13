import type {WidgetInfo} from '../../Widget';
import DetailsDesktopComponent from './DetailsDesktopComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    type: 'Todo',
    desktop: {
        renderer: DetailsDesktopComponent
    }
});
