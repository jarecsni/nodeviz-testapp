import type {WidgetInfo} from '../Widget';
import TodoDesktopComponent from './TodoDesktopComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    type: 'TodoHome',
    desktop: {
        renderer: TodoDesktopComponent
    }
});

export const widgets = [
    'Details'
];