<Textfield bind:value={value}>
    <IconButton 
        class="material-icons" 
        slot="trailingIcon" 
        size="button"
        on:click={()=>{open = true;}}
    >
        more_horiz
    </IconButton>
</Textfield>
<Dialog
  bind:open
>
  <Title id="editor-title">Edit</Title>
  <Content id="editor-content">
    <Textfield textarea bind:value={value}/>
  </Content>
  <Actions>
    <Button on:click={() => {open = false;}}>
      <Label>Close</Label>
    </Button>
  </Actions>
</Dialog>

<script lang="ts">
	import Textfield from '@smui/textfield';
    import IconButton from '@smui/icon-button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import './global.scss';
    export let value;
    let open;
</script>

