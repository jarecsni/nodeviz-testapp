import { Node } from 'nodeviz/Node';
import type {WidgetInfo} from '../Widget';
import PortalDesktopComponent from './PortalDesktopComponent.svelte';
import { PortalHome } from './PortalHome';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    package: 'nodeviz',
    name: 'portal',
    type: 'PortalHome',
    desktop: {
        renderer: PortalDesktopComponent
    },
    getDefaultNodeObject: () => (new PortalHome(0))
});
