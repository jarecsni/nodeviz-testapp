export class Todo {
    _title:string;
    _done:boolean;
    constructor(title: string) {
        this._title = title;
        this._done = false;
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
}