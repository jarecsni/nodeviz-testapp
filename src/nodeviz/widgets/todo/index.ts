import type {WidgetInfo} from '../Widget';
import TodoDesktopComponent from './TodoDesktopComponent.svelte';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    desktop: {
        renderer: TodoDesktopComponent
    }
});

export const widgets = [
    'Details'
];