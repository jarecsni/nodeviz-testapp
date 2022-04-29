import type { SvelteComponent } from "svelte"

export type Page = {
    active: boolean,
    title: string,
    pageComponent: ()=>SvelteComponent
}