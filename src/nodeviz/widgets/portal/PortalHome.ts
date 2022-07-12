import type { NodeObject } from '../Widget';

export class PortalHome implements NodeObject {
    private _nameSpace:string;
    private _id:string;
    constructor(nameSpace:string, id:string) {
        this._nameSpace = nameSpace;
        this._id = id;
    }
    get nameSpace() {
        return this._nameSpace;
    }
    set nameSpace(nameSpace: string) {
        this._nameSpace = nameSpace;
    }
    get id() {
        return this._id;
    }
    set id(id: string) {
        this._id = id;
    }
    toJson() {
        return ({nameSpace: this.nameSpace, id: this.id});
    } 
    valueOf(o: PortalHome) {
        return (new PortalHome(o.nameSpace, o.id));
    } 
}