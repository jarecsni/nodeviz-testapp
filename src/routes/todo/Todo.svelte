<h1>Todo App</h1>
<div>
    Show completed? 
    <input type="checkbox" 
        bind:checked={showCompleted} 
    />
</div>

<input type="text" bind:value={todoDescription}>
<button on:click={addTodo} disabled={!todoDescription}>Add</button>

<div class="todoContainer">
    {#each $todos as todoItem (todoItem.id)}
        <div><GenericComponentContainer 
            node={todoItem} 
            triggers={{showCompleted}}/></div>
    {/each}
</div>

<script lang="ts">
	import GenericComponentContainer from './../../nodeviz/GenericComponentContainer.svelte';
	import { Node } from '../../nodeviz/Node';
    import { todos } from "./store";
    import { Todo } from '../../nodeviz/widgets/todo/Todo';

    let todoDescription;
    let showCompleted = true;

    function addTodo() {
        todos.set([...$todos, 
            new Node(new Todo(todoDescription), {
                isVisible: (node:Node<Todo>) => (!node.value.done || showCompleted)
            })
        ]);
        todoDescription = null;
    }
</script>

<style>
    .todoContainer {
        height: 200px;
        overflow: scroll;
    }
</style>