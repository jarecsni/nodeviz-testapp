<!-- Button.stories.svelte -->

<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    import PropertyEditor from '../nodeviz/common/PropertyEditor.svelte';
  </script>
  
  <Meta
    title="Example/PropertyEditor"
    component={PropertyEditor}
  />
  
  <!--👇 We create a “template” of how args map to rendering -->
  
  <Template let:args>
    <PropertyEditor {...args} />
  </Template>
  
  <!-- 👇 Each story then reuses that template -->
  
  <Story
    name='Simple'
    args={{
      obj: {
        sections: [
          {name: 'First'},
          {name: 'Second'}          
        ]
      }
    }}
  />