<h1>Todo App</h1>
<div>
    Show completed? <input type="checkbox" bind:checked={showCompleted}/>
</div>

<input type="text" bind:value={todoDescription}>
<button on:click={addTodo} disabled={!todoDescription}>Add</button>

<div class="todoContainer">
    {#each $todos as todoItem }
        <div><GenericComponentContainer node={todoItem}/></div>
{/each}
</div>

<script lang="ts">
	import GenericComponentContainer from './../../nodeviz/GenericComponentContainer.svelte';
	import { Node } from '../../nodeviz/Node';
    
    /*
    Ideas/questions/design.

    So our first example, pages had a composite structure, with Home being the root. Here,
    the first question to answer is how to handle a list of nodes of the same type. We can 
    have a wrapper around GenericComponent to make sure we can iterate over an array. I think
    that's a good idea.

    We can store this array as a svelte store - we can have a look at what state library to
    use (redux toolkit support).

    Basically when a todo is created (added), we just simply add it to the list of todos, 
    stored in the state store. And when we rerender, it shows up.

    Next thing could be editing of Todo title and marking it done / undone.

    Then we can experiment with introducing different todo titles.

    And maybe turn this app into a mobile one.

    Yes, it's still not the super generic app I used to work on, where basically you 
    could add instances of any nodes, and edit them, but this time I decided to go 
    bottom up, and see how things can be generalised. In this step, I'll explore actions and
    state, how nodes can be stored in the state, and how state can be stored in the nodes
    themselves (essentially introducing properties/state in the nodes). 
    
    Also interesting idea to attach behaviour to nodes themselves (very OO I know), like being able to handle 
    actions. Also, now I want to play with external / internal representations, mobile/desktop
    renderers. So a lot of interesting insight can be gained from this little exercise.

    Conditionality: don't show todo items which are completed etc.

    Next up: 
    [x] mark todo as done
    [x] introduce show completed flag
    [ ] render todo items based on completed + show completed flags
    */

    import { todos } from "./store";
    import { Todo } from '../../nodeviz/widgets/todo/Todo';

    let todoDescription;
    let showCompleted = true;

    function addTodo() {
        todos.set([...$todos, 
            new Node(todoDescription, new Todo(todoDescription), {
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