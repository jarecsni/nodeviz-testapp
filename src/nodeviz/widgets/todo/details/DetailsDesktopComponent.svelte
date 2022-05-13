{#if !node.value.done || $showCompleted}
    <div class="todoItem">
        {node.value.title}<input type="checkbox" bind:checked={node.value.done}/>    
    </div>
{/if}

<script type="ts">
	import type { Node } from '../../../Node';
    import { showCompleted } from '../store';
    import type { Todo } from '../Todo';
    export let node:Node<Todo>;
</script>

<style>
    .todoItem {
        display: flex;
    }
</style>
