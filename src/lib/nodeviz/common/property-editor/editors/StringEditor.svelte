<Textfield 
    bind:value={value} 
>
    <IconButton class="material-icons" slot="trailingIcon" size="button">more_horiz</IconButton>
</Textfield>

<script lang="ts">
	import Textfield from '@smui/textfield';
    import IconButton from '@smui/icon-button';
    export let value;
</script>