<h1>Todo App</h1>
<div>
    Show completed? 
    <input type="checkbox" 
        bind:checked={$showCompleted} 
    />
</div>

<input type="text" bind:value={todoDescription}>
<button on:click={addTodo} disabled={!todoDescription}>Add</button>

<div class="todoContainer">
    {#each $todos as node (node.id)}
        {#if visible[node.id].isVisible}
        <!-- {#if node.getHandler().isVisible(node) } -->
            <div>
                <GenericComponentContainer {node} />
            </div>
        {/if}
    {/each}
</div>

<script lang="ts">
	import {Node} from '../../Node';
    import {Todo} from './Todo';
    import {todos, showCompleted} from './store';
    import GenericComponentContainer from '../../GenericComponentContainer.svelte';

    let todoDescription;
    let visible = [];

    function addTodo() {
        const todo = new Node('Todo', new Todo(todoDescription), {
            isVisible: (node:Node<Todo>) => (!node.value.done || $showCompleted)
        });
        todos.set([...$todos, todo]);
        visible[todo.id] = {todo: todo, isVisible: true};
        todoDescription = null;
    }

    $: {
        $showCompleted;
        Object.keys(visible).forEach(k => {
            const v = visible[k];
            const result = v.todo.getHandler().isVisible(v.todo);
            v.isVisible = result;
            console.log('visible:', result);
        });
        visible = visible;
    }
</script>

<style>
    .todoContainer {
        height: 200px;
        overflow: scroll;
    }
</style>