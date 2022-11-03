{#await widgetPromise then widget}
    {#if widget === undefined} 
        <p>Could not retrieve the widget for the type '{node.widgetName}'</p>
    {:else}
        <div style="position:relative;" class:selectedStyle={selected}
            on:mouseenter={selected ? ()=>{toolbarActive=true} : null} 
            on:mouseleave={selected ? ()=>{toolbarActive=false} : null}
        >
            {#if selected}
                <div 
                    class:visibleSyle={toolbarActive}
                    class:invisibleStyle={!toolbarActive}
                >
                    <div class="toolbar">
                        <Wrapper>    
                            {#each managementActions as action}
                                <IconButton
                                    class="material-icons"
                                    touch
                                    size="button"
                                    on:click={()=>{action.callback(node)}}>{action.iconName}</IconButton
                                >
                                <Tooltip yPos="above">{action.tooltip}</Tooltip>
                            {/each}
                        </Wrapper>
                    </div>
                </div>
            {/if}
            <svelte:component
                this={widget.desktop.renderer} 
                {node}
                {context}
                on:nodeUpdated
            />
        </div>        
    {/if}
{/await}

<script type="typescript">
	import {selectedWidgetId} from './widgets/stores';
    import {getWidget} from './widgets/WidgetRegistry';
    import type {Context} from './Context';
	import IconButton from '@smui/icon-button';
    import Tooltip, {Wrapper} from '@smui/tooltip';
	import type { Node } from 'nodeviz/Node';
    import { PersistenceService } from '$lib/nodeviz/services/PersistenceService';
	
    const portalAccess = PersistenceService.getInstance().getDataAccessObjectFor('portal');

    export let node:Node<object>;
    export let context:Context;

    const managementActions = [
        ...node.handler.getManagementActions(node),
        {
            iconName: 'delete',
            tooltip: 'Delete',
            callback: () => { 
                portalAccess.delete(node.id);
            }
        },
    ];

    let widgetPromise = getWidget(node.widgetName);
    let toolbarActive;
    let selected;
    $: {
        selected = ($selectedWidgetId == node.id);
    }
</script>

<style>
    .selectedStyle {
        border: 1px dotted;
    }
    .visibleSyle {
        display: inline-block;
        position: absolute;
        z-index: 1000;
        top: 0; bottom: 0; right: 0;
    }
    .invisibleStyle {
        display: none;
    }
    .toolbar {
        height: 40px;
        background: lightgray;
        display: flex;
    }
</style>