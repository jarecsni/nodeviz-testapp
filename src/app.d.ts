/// <reference types="@sveltejs/kit" />

import type { SvelteComponent } from "svelte";

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
	interface Locals {}

	interface Platform {}

	interface Session {}

	interface Stuff {}
}

declare module '*.svelte' {
    export { SvelteComponent as default } from 'svelte';
}