<!-- Button.stories.svelte -->

<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    import PropertyEditor from '../lib/nodeviz/common/property-editor/PropertyEditor.svelte';
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
          {name: 'First', properties: {
            age: {displayName: 'Age of Person', value: 51, description: 'Age of the person'},
            birthDay: {displayName: 'Date of birth', value: '01/11/1970', type: 'Date', description: 'Date of birth'}
          }},
          {name: 'Second', properties: {
            numberOfChildren: {displayName: 'Number of children', value: 2, description: 'Children'}
          }}          
        ]
      }
    }}
  />