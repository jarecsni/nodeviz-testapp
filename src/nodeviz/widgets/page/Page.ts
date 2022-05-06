import type { SvelteComponent } from "svelte"

export class Page {
    private _title: string;
    private _pageComponent: ()=>SvelteComponent
    constructor(title:string, pageComponent:()=>SvelteComponent) {
        this._title = title;
        this._pageComponent = pageComponent;
    }
    get title() {
        return this._title;
    }
    get pageComponent() {
        return this._pageComponent;
    }
}