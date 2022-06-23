import type {WidgetInfo} from '../Widget';
import PortalDesktopComponent from './PortalDesktopComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    package: 'nodeviz',
    name: 'portal',
    type: 'PortalHome',
    desktop: {
        renderer: PortalDesktopComponent
    },
    widgets: [
        'Details'    
    ]
});
