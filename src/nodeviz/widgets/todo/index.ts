import type {WidgetInfo} from '../Widget';
import TodoDesktopComponent from './TodoDesktopComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    package: 'nodeviz',
    name: 'todo',
    type: 'TodoHome',
    desktop: {
        renderer: TodoDesktopComponent
    },
    widgets: [
        'Details'    
    ]
});
