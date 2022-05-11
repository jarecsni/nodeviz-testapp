{#if isVisible}
    <div bind:this={container}>
        <GenericComponent {node} {context}/>
    </div>
{/if}

<script lang="ts">
	import type {Node} from './Node';
    import type {Context} from './Context';
    import GenericComponent from './GenericComponent.svelte';
    
    export let node:Node<object>;
    export let triggers:unknown = {};
    let container;
    const changeObserver = {
        set(obj: object, prop: string, value: unknown) {
            obj[prop] = value;
            updateDerivedState();
            return true;
        }
    };
    const valueProxy = new Proxy(node.value, changeObserver);
    node.value = valueProxy;

    class ContextImpl implements Context {
        navigateTo(_node: Node<object>): void {
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
        isVisible(_node: Node<object>) {
            return _node.getHandler().isVisible(_node);
        }
    }
    const context = new ContextImpl();
    let isVisible;
    $: {
        triggers;
        updateDerivedState()
    }

    function updateDerivedState() {
        isVisible = context.isVisible(node);
    }
</script>