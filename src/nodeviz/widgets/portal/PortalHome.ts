import type { NodeObject } from '../Widget';

export class PortalHome implements NodeObject {
    private _level:number;
    constructor(level:number) {
        this._level = level;
    }
    get level() {
        return this._level;
    }
    set level(level: number) {
        this._level = level;
    }
    toJson() {
        return ({level: this.level});
    } 
    valueOf(o: PortalHome) {
        return (new PortalHome(o.level));
    } 
}