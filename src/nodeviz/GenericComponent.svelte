{#await widgetPromise then widget}
    {#if widget === undefined} 
        <p>Could not retrieve the widget for the type '{node.widgetName}'</p>
    {:else}
        <svelte:component 
            this={widget.desktop.renderer} 
            {node}
            {context}
            on:nodeUpdated
        />
    {/if}
{/await}

<script type="typescript">
	import type {Node} from 'nodeviz/Node';
    import {getWidget} from './widgets/WidgetRegistry';
    import type {Context} from './Context';

    export let node:Node<object>;
    export let context:Context;
    let widgetPromise = getWidget(node.widgetName);
</script>