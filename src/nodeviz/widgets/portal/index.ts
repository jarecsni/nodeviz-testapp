import type {WidgetInfo} from '../Widget';
import PortalDesktopComponent from './PortalDesktopComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    uniquePackageName: 'nodeviz',
    name: 'portal',
    type: 'PortalHome',
    desktop: {
        renderer: PortalDesktopComponent
    },
    widgets: [
        'Details'    
    ]
});