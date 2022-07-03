<Textfield bind:value={node.value.value} label="Simple text"/>
<Button on:click={saveText}>
    <Label>Save</Label>
</Button>


<script lang="ts">
    import Textfield from '@smui/textfield';
    import Button, { Label } from '@smui/button';
    import type { Node } from 'nodeviz/Node';
    import type { Text } from './Text';
    import { createEventDispatcher } from 'svelte';
    export let node:Node<Text>;

    const dispatch = createEventDispatcher<{nodeUpdated: Node<Text>}>();

    function saveText() {
        dispatch('nodeUpdated', node); 
    }
</script>