<div class="container">
	<TreeView iconBackgroundColor="grey" iconColor="lightgrey">
		<TreeBranch rootContent="/">
			<WidgetNavigatorTreeBranch parentId="root" {nodes}/>
		</TreeBranch>
	</TreeView>
</div>

<script lang="ts">
	import WidgetNavigatorTreeBranch from './WidgetNavigatorTreeBranch.svelte';
    import { TreeBranch, TreeView } from "nodeviz/components/treeview";
	import { onSnapshot, doc, query, orderBy, where } from 'firebase/firestore';
	import { browser } from '$app/env';
	import { dbRef } from './firebase';

    export let nameSpace:string;

    let portalSnapshot, nodes;
    const unsubscribe = 
		browser &&
		onSnapshot(query(dbRef, 
			where('nameSpace', '==', nameSpace)),
		    (querySnapshot) => {
			    portalSnapshot = [];
			    querySnapshot.forEach((doc) => {
				    portalSnapshot.push({ ...doc.data(), id: doc.id });
                });
                nodes = portalSnapshot;
            });
</script>

<style>
	.container {
		width: 200px;
		overflow: scroll;
	}
</style>