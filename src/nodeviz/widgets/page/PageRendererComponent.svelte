<script type="ts">
    import type { SvelteComponent } from "svelte";

    export let value:{pageComponent:()=>Promise<SvelteComponent>};
    const pageComponentPromise = value.pageComponent();
</script>

{#await pageComponentPromise then pageComponent}
    {#if pageComponent === undefined} 
        <p>no page component loaded</p>
    {:else}
        <svelte:component this={pageComponent.default}/>
    {/if}
{/await}
