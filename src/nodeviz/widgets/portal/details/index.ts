import type {WidgetInfo} from '../../Widget';
import DetailsDesktopComponent from './DetailsDesktopComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    uniquePackageName: 'nodeviz',
    name: 'portalDetails',
    type: 'PortalWidget',
    desktop: {
        renderer: DetailsDesktopComponent
    }
});
