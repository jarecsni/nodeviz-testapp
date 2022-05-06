<div class="todoItem">
    {node.value.title}<input type="checkbox" bind:checked={node.value.done}/>
</div>

<script type="ts">
	import type { Node } from '../../Node';
    import type { Todo } from './Todo';
    export let node:Node<Todo>;
</script>

<style>
    .todoItem {
        display: flex;
    }
</style>
