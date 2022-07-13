import type { NodeObject } from '../Widget';

export class PortalHome implements NodeObject {
    private _nameSpace:string;
    constructor(nameSpace:string) {
        this._nameSpace = nameSpace;
    }
    get nameSpace() {
        return this._nameSpace;
    }
    set nameSpace(nameSpace: string) {
        this._nameSpace = nameSpace;
    }
    toJson() {
        return ({nameSpace: this.nameSpace});
    } 
    valueOf(o: PortalHome) {
        return (new PortalHome(o.nameSpace));
    } 
}