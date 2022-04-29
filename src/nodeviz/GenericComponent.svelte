{#await widgetPromise then widget}
    {#if widget === undefined} 
        <p>Could not retrieve the widget for the type '{node.type}'</p>
    {:else}
        <svelte:component this={widget.desktop.renderer} {node} {context}/>
    {/if}
{/await}

<script type="typescript">
    import type {Node} from './Node';
    import {getWidget} from '../nodeviz/widgets/WidgetRegistry';
    import type { Context } from './Context';

    export let node:Node<unknown>;
    let widgetPromise = getWidget(node.type);
    
    class ContextImpl implements Context {
        navigateTo(_node: Node<unknown>): void {
            node = _node;
            widgetPromise = getWidget(node.type);
        }
    }
    const context = new ContextImpl();
</script>