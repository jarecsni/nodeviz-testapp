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
                            <IconButton
                                class="material-icons"
                                touch
                                size="button"
                                on:click={() => {
                                    
                                }}>delete</IconButton
                            >
                            {#if node.config}
                                <IconButton
                                    class="material-icons"
                                    touch
                                    size="button"
                                    on:click={() => {
                                        openSettingsDialogue()
                                    }}>settings</IconButton
                                >    
                            {/if}
                            <Tooltip yPos="above">Settings</Tooltip>
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
        
        {#if node.config}
        <Dialog bind:open={configureNodeDialogueOpen}>
            <Title>Node Properties</Title>
            <Content>
                <div class="dialogueContent">
                    <PropertyEditor obj={configObject}/>
                </div>
            </Content>
            <Actions>
                <Button>
                    <Label>Close</Label>
                </Button>
            </Actions>
        </Dialog>    
        {/if}
        
    {/if}
{/await}

<script type="typescript">
	import {selectedWidgetId} from './widgets/stores';
	import type {Node} from 'nodeviz/Node';
    import {getWidget} from './widgets/WidgetRegistry';
    import type {Context} from './Context';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
    import Tooltip, {Wrapper} from '@smui/tooltip';
    import PropertyEditor from '../lib/nodeviz/common/property-editor/PropertyEditor.svelte';
    import type {PropertiesObject} from '$lib/nodeviz/common/property-editor/PropertyEditorTypes';
	

    export let node:Node<object>;
    export let context:Context;

    const configObject:PropertiesObject = node.config as PropertiesObject;

    let configureNodeDialogueOpen = false;

    let widgetPromise = getWidget(node.widgetName);
    let toolbarActive;
    let selected;
    $: {
        selected = ($selectedWidgetId == node.id);
    }

    function openSettingsDialogue() {
        configureNodeDialogueOpen = true;
    }
</script>

<style>
    .selectedStyle {
        border: 1px dotted;
    }
    .visibleSyle {
        display: inline-block;
        position: absolute;
        z-index: 100;
        top: 0; bottom: 0; right: 0;
    }
    .invisibleStyle {
        display: none;
    }
    .toolbar {
        height: 40px;
        background: lightgray;
    }
</style>