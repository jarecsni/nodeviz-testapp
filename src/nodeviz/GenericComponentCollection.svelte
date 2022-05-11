{#each nodes as node (node.id)}
    <div>
        <GenericComponentContainer {node} {triggers}/>
    </div>
{/each}

<script lang="ts">
    import GenericComponentContainer from './GenericComponentContainer.svelte';
    import type { Node } from './Node';
    export let nodes:Node<object>[];
    export let triggers:unknown = {};
</script>
