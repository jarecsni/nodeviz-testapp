{#if context.isVisible(node)}
    <div bind:this={container}>
        <GenericComponent {node} {context}/>
    </div>
{/if}

<script lang="ts">
	import { MethodNames, type Node } from './Node';
    import type { Context } from './Context';
    import GenericComponent from './GenericComponent.svelte';
    
    export let node:Node<unknown>;
    let container;

    class ContextImpl implements Context {
        navigateTo(_node: Node<unknown>): void {
            _node.parent && (_node.parent.active = false);
            _node.children && _node.children.forEach(child => {
                child.active = false;
            });
            _node.active = true;
            let child = container.lastElementChild; 
            while (child) {
                container.removeChild(child);
                child = container.lastElementChild;
            }
            new GenericComponent({
                target: container,
                props: { 
                    node: _node,
                    context: context
                }
            });
        }
        isVisible(_node: Node<unknown>) {
            return _node.getMethod(MethodNames.isVisible)(_node);
        }
    }
    const context = new ContextImpl();
</script>