import type { NodeObject } from '../Widget';

interface TextJson {
    value: string
}

export class Text implements NodeObject<TextJson> {
    private _value:string;
    constructor(value:string) {
        this._value = value;
    }
    toJson() {
        return {
            value: this._value
        };
    }
    get value() {
        return this._value;
    }
}