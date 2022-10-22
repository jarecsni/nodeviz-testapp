import { Node } from 'nodeviz/Node';
import type {WidgetInfo} from '../Widget';
import SimpleTextComponent from './SimpleTextComponent.svelte';
import { Text } from './Text';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    package: 'nodeviz',
    name: 'simpletext',
    type: 'Text',
    desktop: {
        renderer: SimpleTextComponent
    },
    getDefaultNodeObject: () => (new Text('')),
    getPropertiesObject: () => (null)
});