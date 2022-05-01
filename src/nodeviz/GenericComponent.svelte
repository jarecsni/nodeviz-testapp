{#await widgetPromise then widget}
    {#if widget === undefined} 
        <p>Could not retrieve the widget for the type '{node.type}'</p>
    {:else}
        <svelte:component 
            this={widget.desktop.renderer} 
            {node} 
            {context}
            on:navigate={handleNavigateRequest}
        />
    {/if}
{/await}

<script type="typescript">
    import {createEventDispatcher} from 'svelte';
    import type {Node} from './Node';
    import {getWidget} from '../nodeviz/widgets/WidgetRegistry';
    import type {Context} from './Context';

    export let node:Node<unknown>;
    let widgetPromise = getWidget(node.type);
    const dispatch = createEventDispatcher<{navigate: Node<unknown>}>();

    class ContextImpl implements Context {
        /*
            We are setting _node to active and also replacing the parent Component's node
            instance this node so it 'opens' in place of its parent.

            Rather than storing a reference to the parent's compoent a much cleaner approach
            is to send a component event from the child using event dispatcher.

            event will contain the child's node, and it will effectively replace the parent,
            job done :)
        */
        navigateTo(_node: Node<unknown>): void {
            _node.active = true;
            if(!!_node.parent) {
                dispatch('navigate', _node);
            } else {
                // FIXME I dont like this here
                node = _node;
                widgetPromise = getWidget(node.type);
            }
        }
    }
    const context = new ContextImpl();

    function handleNavigateRequest(details: CustomEvent<{node: Node<unknown>}>) {
        console.log('NAVIGATE', node.name);
    }
</script>