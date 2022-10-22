import { Node } from 'nodeviz/Node';
import type {WidgetInfo} from '../Widget';
import { Page } from './Page';
import PageRendererComponent from './PageRendererComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    package: 'nodeviz',
    name: 'page',
    type: 'Page',
    desktop: {
        renderer: PageRendererComponent
    },
    getDefaultNodeObject: () => (new Page('', ()=>null)),
    getPropertiesObject: () => (null)
});