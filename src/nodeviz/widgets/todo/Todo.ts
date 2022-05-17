export type TodoJson = {
    title:string,
    done:boolean
}

export class Todo {
    _title:string;
    _done:boolean;
    constructor(title: string, done: boolean = false) {
        this._title = title;
        this._done = done;
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
            done: this._done
        }
    }
    static valueOf(v: {title: string, done:boolean}): Todo {
        return new Todo(v.title, v.done);
    }
}