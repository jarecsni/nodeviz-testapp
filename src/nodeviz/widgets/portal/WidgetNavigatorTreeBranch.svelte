
{#each nodes as node (node.id) }
    {#if node.parentId == parentId }
        {#if node.name == 'portal'}
            <TreeBranch rootContent={node.name} onClick={()=>{console.log('click on portal node',node.name + '@' + parentId)}}>
                <WidgetNavigatorTreeBranch {nodes} parentId={node.id}/>
            </TreeBranch>
        {:else}
            <TreeLeaf onClick={()=>{console.log('clicked on leaf',node.name + '@' + parentId)}}>
                <div>
                    {node.name}
                </div>
            </TreeLeaf>
        {/if}
    {/if}
{/each}


<script lang="ts">
	import WidgetNavigatorTreeBranch from './WidgetNavigatorTreeBranch.svelte';
    import { TreeLeaf, TreeBranch } from "nodeviz/components/treeview";
    export let parentId:string, nodes = [];
</script>