<h1>Todo App</h1>
<div>
    Show completed? 
    <input type="checkbox" 
        bind:checked={$showCompleted} 
    />
</div>

<input type="text" bind:value={todoDescription}/>

<button on:click={addTodo} disabled={!todoDescription}>Add</button>

<div class="todoContainer">
    {#each nodes as node (node.id)}
        <div>
            <GenericComponentContainer {node} on:nodeUpdated={onTodoUpdated}/>
        </div>
    {/each}
</div>

<script lang="ts">
    import {Node} from 'nodeviz/Node';
	import {showCompleted} from './store';
    import {
		onSnapshot,
        addDoc,
        updateDoc,
        doc
	} from 'firebase/firestore';
    import {browser} from '$app/env';
	import {dbRef, db} from './firebase';
    import {Todo} from './Todo';
    import GenericComponentContainer from '../../GenericComponentContainer.svelte';

    let loadingData = true;
    let todos = [];
	const unsubscribe =
		browser &&
		onSnapshot(dbRef, (querySnapshot) => {
			let todosSnapshot = [];
			querySnapshot.forEach((doc) => {
				let todo = { ...doc.data(), id: doc.id };
				todosSnapshot.push(todo);
			});
			todos = todosSnapshot;
			loadingData = false;
		});    
    
    let todoDescription;
    let nodes = [];    
    $: {
        nodes = todos.map((t, index) => new Node({widgetName: '@nodeviz/todoDetails', value: Todo.valueOf(t), id: t.id, index}));
    }

    async function addTodo() {
        const todo = new Todo(todoDescription);
        todoDescription = null;
        await addDoc(dbRef, {
				...todo.toJson()
			});
    }

    async function onTodoUpdated(todo:CustomEvent<Todo>) {
        console.log('todo changed:', todo);
        await updateDoc(doc(db, 'todo', todo.detail.id), {
			done: todo.detail.done
		});
    }
</script>

<style>
    .todoContainer {
        height: 200px;
        overflow: scroll;
    }
</style>