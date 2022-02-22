<script type="typescript">
    import type { Node } from './Nodes';
    import {getWidget} from '../nodeviz/widgets/WidgetRegistry';

    export let node:Node;
    const widgetPromise = getWidget(node.type);
</script>
{#if (widgetPromise !== undefined)}
    {#await widgetPromise}
        <p></p>
    {:then widget} 
        <!-- <svelte:component this={widget}/> -->
        <p>{JSON.stringify(widget)}</p>
    {/await}
{:else}
    <p>Could not retrieve the widget for the type '{node.type}'</p>
{/if}
