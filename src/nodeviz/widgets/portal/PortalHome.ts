import type { NodeObject } from '../Widget';

export class PortalHome implements NodeObject {
    toJson() {
        return ({});
    } 
    valueOf(o: object) {
        return (new PortalHome());
    } 
}