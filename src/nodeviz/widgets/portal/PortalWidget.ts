import {v4 as uuidv4} from 'uuid';

export type PortalWidgetJSON = {
    id:string
}

export class PortalWidget {
    private _id:string;
    constructor(id:string = uuidv4()) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
    toJson():PortalWidgetJSON {
        return {
            id: this._id
        }
    }
    static valueOf(v: {id:string}): PortalWidget {
        return new PortalWidget(v.id);
    }
}