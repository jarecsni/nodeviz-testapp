import type {WidgetInfo} from '../../Widget';
import DetailsDesktopComponent from './DetailsDesktopComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    package: 'nodeviz',
    name: 'portalDetails',
    type: 'PortalWidget',
    desktop: {
        renderer: DetailsDesktopComponent
    }
});
