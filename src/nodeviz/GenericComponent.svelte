{#await widgetPromise then widget}
    {#if widget === undefined} 
        <p>Could not retrieve the widget for the type '{node.widgetName}'</p>
    {:else}
        <div class:selected>
            <svelte:component
                this={widget.desktop.renderer} 
                {node}
                {context}
                on:nodeUpdated
            />
        </div>
    {/if}
{/await}

<script type="typescript">
	import {selectedWidgetId} from './widgets/stores';
	import type {Node} from 'nodeviz/Node';
    import {getWidget} from './widgets/WidgetRegistry';
    import type {Context} from './Context';

    export let node:Node<object>;
    export let context:Context;
    let widgetPromise = getWidget(node.widgetName);

    let selected;
    $: {
        selected = ($selectedWidgetId == node.id);
    }
</script>

<style>
    .selected {
        border: 1px dotted;
    }
</style>