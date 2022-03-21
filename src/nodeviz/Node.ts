import type { NodeObj } from "./Nodes";

export class Node {
    private _name:string;
    private _type:string;
    private _children?:Node[];
    private _parent?:Node;    
    constructor(name:string, type:string) {
        this._name = name;
        this._type = type;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get children() {
        return this._children;
    }
    get parent() {
        return this._parent;
    }
    set parent(parent:Node) {
        this._parent = parent;
    }
    addChild(child:Node) {
        if (!this._children) {
            this._children = [];
        }
        child.parent = this;
        this._children.push(child);
    }
}

export function convertJSON(json:NodeObj, parentNode?:Node):Node {
    const currentNode = new Node(json.name, json.type);
    currentNode.parent = parentNode;
    if (json.children && json.children.length > 0) {
        json.children.forEach(child => {
            currentNode.addChild(convertJSON(child, currentNode));
        });
    }
    return currentNode;   
}