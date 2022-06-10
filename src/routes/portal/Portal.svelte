{#if adminMode}
    <Button>Add Widget</Button>
    <PropertyEditor {obj}></PropertyEditor>
{/if}


<script lang="ts">
	import Button from '@smui/button';
    import PropertyEditor from '../../nodeviz/common/PropertyEditor.svelte';
    export let adminMode:boolean = false;
    const obj = {
        sections: [
            {name: 'first'},
            {name: 'second'}
        ]
    }
</script>