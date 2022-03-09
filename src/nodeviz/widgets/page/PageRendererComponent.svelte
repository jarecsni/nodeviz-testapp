<script type="ts">
	import type { Node } from './../../Nodes';
    import type { SvelteComponent } from "svelte";

    export let node:Node;
    //FIXME how to solve this typing problem?
    //@ts-ignore
    const pageComponentPromise:Promise<SvelteComponent> = node.value.pageComponent();
</script>

{#await pageComponentPromise then pageComponent}
    {#if pageComponent === undefined} 
        <p>no page component loaded</p>
    {:else}
        <svelte:component this={pageComponent.default}/>
    {/if}
{/await}
