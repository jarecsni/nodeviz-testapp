import type { SvelteComponent } from "svelte"

export type Page = {
    title: string,
    pageComponent: ()=>SvelteComponent
}