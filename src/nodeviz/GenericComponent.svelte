<script type="typescript">
    import type {Node} from './Nodes';
    import {getWidget} from '../nodeviz/widgets/WidgetRegistry';

    export let node:Node;
    const widgetPromise = getWidget(node.type);
</script>

{#await widgetPromise then widget}
    {#if widget === undefined} 
        <p>Could not retrieve the widget for the type '{node.type}'</p>
    {:else}
        <svelte:component this={widget.desktop.renderer} {node}/>
    {/if}
{/await}
