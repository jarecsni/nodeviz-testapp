
{#each nodes as node (node.id) }
    {#if node.parentId == parentId }
        {#if node.name == 'portal'}
            <TreeBranch rootContent={node.name}>
                <WidgetNavigatorTreeBranch {nodes} parentId={node.id}/>
            </TreeBranch>
        {:else}
            <TreeLeaf>{node.name}</TreeLeaf>
        {/if}
    {/if}
{/each}


<script lang="ts">
	import WidgetNavigatorTreeBranch from './WidgetNavigatorTreeBranch.svelte';
    import { TreeLeaf, TreeBranch } from "svelte-tree-view-component";
    export let parentId:string, nodes = [];
</script>