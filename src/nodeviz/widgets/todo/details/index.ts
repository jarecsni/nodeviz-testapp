import type {WidgetInfo} from '../../Widget';
import { Todo } from '../Todo';
import DetailsDesktopComponent from './DetailsDesktopComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    package: 'nodeviz',
    name: 'todoDetails',
    type: 'Todo',
    desktop: {
        renderer: DetailsDesktopComponent
    },
    getDefaultNodeObject: () => (new Todo('')),
    getPropertiesObject: () => (null)
});
