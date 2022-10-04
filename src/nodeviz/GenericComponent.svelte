{#await widgetPromise then widget}
    {#if widget === undefined} 
        <p>Could not retrieve the widget for the type '{node.widgetName}'</p>
    {:else}
        <div class:selectedStyle={selected}
            on:mouseenter={selected ? ()=>{toolbarActive=true} : null} 
            on:mouseleave={selected ? ()=>{toolbarActive=false} : null}
        >
            {#if selected}
                <div 
                    class:visibleSyle={toolbarActive}
                    class:invisibleStyle={!toolbarActive}
                >
                    <p>alma</p>     
                </div>
            {/if}
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
    let toolbarActive;
    let selected;
    $: {
        selected = ($selectedWidgetId == node.id);
    }
</script>

<style>
    .selectedStyle {
        border: 1px dotted;
    }
    .visibleSyle {
        display: inline;
    }
    .invisibleStyle {
        display: none;
    }
</style>