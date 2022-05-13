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
        <div>
            <GenericComponentContainer {node} />
        </div>
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
        const todo = new Node('Todo', new Todo(todoDescription));
        todos.set([...$todos, todo]);
        todoDescription = null;
    }
</script>

<style>
    .todoContainer {
        height: 200px;
        overflow: scroll;
    }
</style>