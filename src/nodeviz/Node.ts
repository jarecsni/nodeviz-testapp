import type { SvelteComponent } from "svelte";

export type NodeObj = {
    name: string,
    type: string,
    value: unknown,
    children?: NodeObj[]
}

export class Node<T> {
    private _name:string;
    private _type:string;
    private _active:boolean;
    private _componentRef:SvelteComponent;
    private _value:T;
    private _children?:Node<T>[];
    private _parent?:Node<T>;    
    constructor(name:string, type:string, value:T) {
        this._name = name;
        this._type = type;
        this._value = value;
        this._active = false;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get active() {
        return this._active;
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
    const currentNode = new Node<T>(json.name, json.type, json.value as T);
    currentNode.parent = parentNode;
    if (json.children && json.children.length > 0) {
        json.children.forEach(child => {
            currentNode.addChild(convertJSON(child, currentNode));
        });
    }
    return currentNode;   
}