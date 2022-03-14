<script type="typescript">
    import type {Node} from './Nodes';
    import {getWidget} from '../nodeviz/widgets/WidgetRegistry';
    import type { Context } from './Context';

    export let node:Node;
    let widgetPromise = getWidget(node.type);
    
    class ContextImpl implements Context {
        navigateTo(_node: Node): void {
            node = _node;
            widgetPromise = getWidget(node.type);
        }
    }
    const context = new ContextImpl();
</script>

{#await widgetPromise then widget}
    {#if widget === undefined} 
        <p>Could not retrieve the widget for the type '{node.type}'</p>
    {:else}
        <svelte:component this={widget.desktop.renderer} {node} {context}/>
    {/if}
{/await}
