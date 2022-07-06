
import type { Node } from 'nodeviz/Node';
import type {SvelteComponent} from 'svelte';

export interface Widget {
}

export interface NodeObject {
    toJson: () => object
    valueOf: (o:object) => object
}

export const getQualifiedName = (widgetInfo: WidgetInfo):string => ('@' + widgetInfo.package + '/' + widgetInfo.name);

export interface WidgetInfo {
    package: string,
    name: string,
    type: string,
    parent?: string,
    desktop: {
        renderer: typeof SvelteComponent
    },
    widgets?: string[],
    getDefaultNodeObject: () => NodeObject
}

export interface WidgetManifest {
    package: string,
    name: string,
    type: string,
    description: string,
    author: string,
    version: string,
    date: string
}