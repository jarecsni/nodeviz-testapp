{#if !node.value.done || $showCompleted}
    <div class="todoItem">
        {node.value.title}
        <input type="checkbox" 
            bind:checked={node.value.done}
            on:change={onChangeDone}
        />    
    </div>
{/if}

<script type="ts">
    import {createEventDispatcher} from 'svelte';
	import type {Node} from '../../../Node';
    import {showCompleted} from '../store';
    import type {Todo} from '../Todo';
    export let node:Node<Todo>;
    const dispatch = createEventDispatcher<{nodeUpdated: Todo}>();
    
    function onChangeDone(e: Event) {
        dispatch('nodeUpdated', node.value);
    }
    
</script>

<style>
    .todoItem {
        display: flex;
    }
</style>
