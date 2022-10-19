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
	import { PersistenceService } from '$lib/nodeviz/services/PersistenceService';

    const portalAccess = PersistenceService.getInstance().getDataAccessObjectFor('portal');

    export let nameSpace:string;

    let portalSnapshot, nodes;

	portalAccess.select((portalObjs) => {nodes = portalObjs}, 
		[
			{field: 'nameSpace', op: '==', value: nameSpace}
		],
		'index'
	);
</script>

<style>
	.container {
		width: 200px;
		overflow: scroll;
	}
</style>