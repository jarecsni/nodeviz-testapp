<script type="ts">
	import type { Node } from './../../Nodes';
    import type { SvelteComponent } from "svelte";
import { validate_each_argument } from 'svelte/internal';

    export let node:Node;
    //FIXME how to solve this typing problem?
    //@ts-ignore
    const pageComponentPromise:Promise<SvelteComponent> = node.value.pageComponent();
    const childPages = node.children;

    function navigateToPage(page) {
        console.log('navigating to', page);
    }
</script>

{#await pageComponentPromise then pageComponent}
    {#if pageComponent === undefined} 
        <p>no page component loaded</p>
    {:else}
        <div>
            <ul class="pageLinks">
                {#each childPages as childPage}
                    <li class="pageLink"><a href={'#'}  
                        on:click={()=>navigateToPage(childPage)}>{childPage.value.title}</a></li>
                {/each}
            </ul>
        </div>
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
</style>