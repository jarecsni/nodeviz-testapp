{#if !node.value.active}
    <a href={"#"} on:click={()=>navigateToPage(node)}>{node.value.title}</a>
{:else}    
    {#await pageComponentPromise then pageComponent}
        {#if pageComponent === undefined} 
            <p>no page component loaded</p>
        {:else}
            {#if !!node.parent}
                <GenericComponent node={node.parent}/>
            {/if}
            {#if !!node.children}
                <div>
                    <ul class="pageLinks">
                        {#each childPages as childPage}
                            <li class="pageLink">
                                <GenericComponent node={childPage}/>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/if}
            <svelte:component this={pageComponent.default}/>
        {/if}
    {/await}
{/if}

<script type="ts">
	import GenericComponent from './../../GenericComponent.svelte';
	import type { Node } from './../../Node';
    import type { SvelteComponent } from "svelte";
    import type { Context } from 'src/nodeviz/Context';
    import type { Page } from './types';

    export let node:Node<Page>;
    export let context:Context;
    //@ts-ignore 
    const pageComponentPromise:Promise<SvelteComponent> = node.value.pageComponent();
    const childPages = node.children || [];

    function navigateToPage(page:Node<Page>) {
        context.navigateTo(page);
    }
</script>

<style>
    a {
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;  
    }
    .pageLinks {
        list-style: none;
        padding: 0;
    }
    .pageLink {
        display: inline;
        margin: 5px;
    }
    ul {
        padding-inline-start: 0;
    }
</style>