<h1>Portal App</h1>

<div class="portalContainer">
    {#each nodes as node (node.id)}
        <div>
            <GenericComponentContainer {node}/>
        </div>
    {/each}
</div>

<script lang="ts">
    import {Node} from 'nodeviz/Node';
    import {
		onSnapshot,
        addDoc,
        updateDoc,
        doc
	} from 'firebase/firestore';
    import {browser} from '$app/env';
	import {dbRef, db} from './firebase';
    import GenericComponentContainer from '../../GenericComponentContainer.svelte';

    let loadingData = true;
    let portalWidgets = [];
	const unsubscribe =
		browser &&
		onSnapshot(dbRef, (querySnapshot) => {
			let portalSnapshot = [];
			querySnapshot.forEach((doc) => {
				let portalWidget = { ...doc.data(), id: doc.id };
				portalSnapshot = [...portalSnapshot, portalWidget];
			});
			portalWidgets = portalSnapshot;
			loadingData = false;
		});    
    
    let nodes = [];    
    $: {
        nodes = portalWidgets.map(t => new Node('PortalWidget', PortalWidget.valueOf(t)));
    }

    async function addTodo() {
        const portalWidget = new PortalWidget();
        todoDescription = null;
        await addDoc(dbRef, {
				...portalWidget.toJson()
			});
    }

    async function onTodoUpdated(portalWidget:CustomEvent<PortalWidget>) {
        await updateDoc(doc(db, 'portal', portalWidget.detail.id), {
			...portalWidget.detail
		});
    }
</script>

<style>
</style>