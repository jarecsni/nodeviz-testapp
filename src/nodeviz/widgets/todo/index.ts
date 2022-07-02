import { Node } from 'nodeviz/Node';
import type {WidgetInfo} from '../Widget';
import TodoDesktopComponent from './TodoDesktopComponent.svelte';
import { TodoHome } from './TodoHome';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    package: 'nodeviz',
    name: 'todo',
    type: 'TodoHome',
    desktop: {
        renderer: TodoDesktopComponent
    },
    widgets: [
        'Details'    
    ],
    getDefaultNodeObject: () => (new TodoHome())
});
