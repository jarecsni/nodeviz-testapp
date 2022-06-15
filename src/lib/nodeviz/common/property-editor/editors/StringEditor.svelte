<Textfield bind:value={value}>
    <IconButton 
        class="material-icons" 
        slot="trailingIcon" 
        size="button"
        on:click={()=>{surface.setOpen(true);}}
    >
        more_horiz
    </IconButton>   
</Textfield>
<div class="surface-wrapper">
  <MenuSurface bind:this={surface} anchorCorner="BOTTOM_LEFT">
    <Paper>
      <Title>Edit</Title>
      <Content>
        <div class="string-editor-content">
          <Textfield textarea bind:value={value} autofocus />
          <Button on:click={()=>surface.setOpen(false)}><Label>Close</Label></Button>
        </div>
      </Content>
    </Paper>
  </MenuSurface>
</div> 


<script lang="ts">
	  import Textfield from '@smui/textfield';
    import IconButton from '@smui/icon-button';
    import type { MenuSurfaceComponentDev } from '@smui/menu-surface';
    import MenuSurface from '@smui/menu-surface';
    import Paper, { Title, Subtitle, Content } from '@smui/paper';
    import './global.scss';
    import Button, {Label} from '@smui/button';
    export let value;
    let surface: MenuSurfaceComponentDev;
</script>

<style>
  .surface-wrapper {
    position: absolute;
    width: 400px;
  }
  .string-editor-content  {
    display: flex;
    flex-direction: column;
  }
</style>

