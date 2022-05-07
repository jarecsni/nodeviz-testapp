<div class="todoItem">
    {#if context.isVisible(node)}
        {node.value.title}<input type="checkbox" bind:checked={node.value.done}/>    
    {/if}
</div>

<script type="ts">
    import type { Context } from 'src/nodeviz/Context';
	import type { Node } from '../../Node';
    import type { Todo } from './Todo';
    export let node:Node<Todo>;
    export let context:Context;
</script>

<style>
    .todoItem {
        display: flex;
    }
</style>
