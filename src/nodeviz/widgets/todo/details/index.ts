import type {WidgetInfo} from '../../Widget';
import DetailsDesktopComponent from './DetailsDesktopComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    desktop: {
        renderer: DetailsDesktopComponent
    }
});
