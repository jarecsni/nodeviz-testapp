import type { SvelteComponent } from "svelte";

export type NodeObj = {
    value: unknown,
    children?: NodeObj[]
}

export enum MethodNames {
    isVisible = 'isVisible'
}
type isVisibleMethod = (Node) => boolean;
type Methods = {
    [MethodNames.isVisible]?: isVisibleMethod    
}


export class Node<T> {
    private _active:boolean;
    private _componentRef:SvelteComponent;
    private _value:T;
    private _methods: Methods;
    private _children?:Node<T>[];
    private _parent?:Node<T>;
    constructor(value:T, methods?:Methods) {
        this._value = value;
        this._active = false;
        this._methods = methods;
    }
    get type() {
        return this._value.constructor.name;
    }
    get active() {
        return this._active;
    }
    getMethod(name: MethodNames) {
        return this._methods[name];
    }
    set active(active:boolean) {
        this._active = active;
    }
    get componentRef() {
        return this._componentRef;
    }
    set componentRef(componentRef:SvelteComponent) {
        this._componentRef = componentRef;
    }
    get value() {
        return this._value;
    }
    get children() {
        return this._children;
    }
    get parent() {
        return this._parent;
    }
    set parent(parent:Node<T>) {
        this._parent = parent;
    }
    addChild(child:Node<T>) {
        if (!this._children) {
            this._children = [];
        }
        child.parent = this;
        this._children.push(child);
    }
}

export function convertJSON<T>(json:NodeObj, parentNode?:Node<T>):Node<T> {
    const currentNode = new Node<T>(json.value as T);
    currentNode.parent = parentNode;
    if (json.children && json.children.length > 0) {
        json.children.forEach(child => {
            currentNode.addChild(convertJSON(child, currentNode));
        });
    }
    return currentNode;   
}