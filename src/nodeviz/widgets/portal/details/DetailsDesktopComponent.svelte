Placeholder

<script type="ts">
	import {createEventDispatcher} from 'svelte';
	import type {Node} from 'nodeviz/Node';
    import type {PortalWidget} from './../PortalWidget';
    export let node:Node<PortalWidget>;
    const dispatch = createEventDispatcher<{nodeUpdated: PortalWidget}>();
    
    function onChangeDone(e: Event) {
        dispatch('nodeUpdated', node.value);
    }
</script>

<style>
</style>
