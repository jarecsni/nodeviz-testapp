{#if !node.active}
    <a href={"#"} on:click={()=>navigateToPage(node)}>{node.value.title}</a>
{:else}    
    {#await pageComponentPromise then pageComponent}
        {#if pageComponent === undefined} 
            <p>no page component loaded</p>
        {:else}
            {#if !!node.parent}
                <GenericComponent node={node.parent} {context}/>
            {/if}
            {#if !!node.children}
                <div>
                    <ul class="pageLinks">
                        {#each childPages as childPage}
                            <li class="pageLink">
                                <GenericComponent node={childPage} {context}/>
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
	import GenericComponent from '../../GenericComponent.svelte';
	import type {Node} from './../../Node';
    import type {SvelteComponent} from 'svelte';

    import type {Page} from './Page';
    import type { Context } from '../../Context';

    export let node:Node<Page>;
    export let context:Context;
    
    // @ts-ignore
    const pageComponentPromise:Promise<SvelteComponent> = node.value.pageComponent();
    const childPages = node.children || [];

    function navigateToPage(node:Node<Page>) {
        context.navigateTo(node);
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