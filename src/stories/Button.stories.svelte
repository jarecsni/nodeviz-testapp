<!-- Button.stories.svelte -->

<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    
    import Button from './Button.svelte';
  </script>
  
  <Meta
    title="Example/Button"
    component={Button}
    argTypes={{
      backgroundColor: { control: 'color' },
      label: { control: 'text' },
      onClick: { action: 'onClick' },
      primary: { control: 'boolean' },
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
      },
    }}
  />
  
  <!--👇 We create a “template” of how args map to rendering -->
  
  <Template let:args>
    <Button {...args} on:click={args.onClick} />
  </Template>
  
  <!-- 👇 Each story then reuses that template -->
  
  <Story
    name='Primary'
    args={{
      primary: true,
      label: 'Button'
    }}
  />