import {v4 as uuidv4} from 'uuid';
import type { NodeObject } from '../Widget';

export type TodoJson = {
    title:string,
    done:boolean,
    id:string
}

export class Todo implements NodeObject<TodoJson> {
    private _title:string;
    private _done:boolean;
    private _id:string;
    constructor(title: string, done: boolean = false, id:string = uuidv4()) {
        this._title = title;
        this._done = done;
        this._id = id;
    }
    get id() {
        return this._id;
    }
    get done() {
        return this._done;
    }
    set done(v:boolean) {
        this._done = v;
    } 
    get title() {
        return this._title;
    }
    set title(v:string) {
        this._title = v;
    }
    toJson():TodoJson {
        return {
            title: this._title,
            done: this._done,
            id: this._id
        }
    }
    static valueOf(v: {title: string, done:boolean, id:string}): Todo {
        return new Todo(v.title, v.done, v.id);
    }
}