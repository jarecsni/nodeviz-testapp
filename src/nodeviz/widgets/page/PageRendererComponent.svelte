<script type="ts">
	import type { Node } from './../../Node';
    import type { SvelteComponent } from "svelte";
    import type { Context } from 'src/nodeviz/Context';

    export let node:Node;
    export let context:Context;
    //FIXME how to solve this typing problem?
    //@ts-ignore
    const pageComponentPromise:Promise<SvelteComponent> = node.value.pageComponent();
    const childPages = node.children || [];

    function navigateToPage(page) {
        context.navigateTo(page);
    }
</script>

{#await pageComponentPromise then pageComponent}
    {#if pageComponent === undefined} 
        <p>no page component loaded</p>
    {:else}
        {#if !!node.parent}
            <div>
                <a href={'#'} on:click={()=>navigateToPage(node.parent)}>
                    {node.parent.value.title} 
                </a>
            </div>
        {/if}
        {#if !!node.children}
            <div>
                <ul class="pageLinks">
                    {#each childPages as childPage}
                        <li class="pageLink"><a href={'#'}  
                            on:click={()=>navigateToPage(childPage)}>{childPage.value.title}</a></li>
                    {/each}
                </ul>
            </div>
        {/if}
        <svelte:component this={pageComponent.default}/>
    {/if}
{/await}

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