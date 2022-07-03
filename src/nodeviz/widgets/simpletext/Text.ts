import type { NodeObject } from '../Widget';

interface TextJson {
    value: string
}

export class Text implements NodeObject<Text, TextJson> {
    private _value:string;
    constructor(value:string) {
        this._value = value;
    }
    valueOf (t: TextJson) {
        return new Text(t.value);
    }
    toJson() {
        return {
            value: this._value
        };
    }
    get value() {
        return this._value;
    }
    set value(text:string) {
        this._value = text;
    }
}