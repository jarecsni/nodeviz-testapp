
import type { PropertiesObject } from '$lib/nodeviz/common/property-editor/PropertyEditorTypes';
import type { Node, NodeHandler } from 'nodeviz/Node';
import type {SvelteComponent} from 'svelte';

export interface Widget {
}

export interface NodeObject {
    toJson: () => object
    valueOf: (o:object) => object
}

export class DefaultNodeObject implements NodeObject {
    toJson() {return {}}
    valueOf(o: object) {return o};
}

export const getQualifiedName = (widgetInfo: WidgetInfo):string => ('@' + widgetInfo.package + '/' + widgetInfo.name);

export interface WidgetInfo {
    package: string
    name: string
    type: string
    parent?: string
    desktop: {
        renderer: typeof SvelteComponent
    }
    widgets?: string[]
    getDefaultNodeObject: () => NodeObject
    getPropertiesObject: () => PropertiesObject
    getNodeHandler?: (actionHandler: (action:string, node:Node<object>) => void) => NodeHandler<object>
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