import type {WidgetInfo} from '../Widget';
import SimpleTextComponent from './SimpleTextComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    package: 'nodeviz',
    name: 'simpletext',
    type: 'Text',
    desktop: {
        renderer: SimpleTextComponent
    }
});
