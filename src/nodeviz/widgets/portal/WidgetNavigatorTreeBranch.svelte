
{#each nodes as node (node.id) }
    {#if node.parentId == parentId }
        {#if node.name == 'portal'}
            <TreeBranch rootContent={node.name}>
                <WidgetNavigatorTreeBranch {nodes} parentId={node.id}/>
            </TreeBranch>
        {:else}
            <TreeLeaf><div on:click={()=>{console.log('click on',node.name + '@' + parentId)}}>{node.name}</div></TreeLeaf>
        {/if}
    {/if}
{/each}


<script lang="ts">
	import WidgetNavigatorTreeBranch from './WidgetNavigatorTreeBranch.svelte';
    import { TreeLeaf, TreeBranch } from "nodeviz/components/treeview";
    export let parentId:string, nodes = [];
</script>