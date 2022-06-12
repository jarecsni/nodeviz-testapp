<Portal adminMode/>
<PropertyEditor {obj}/>

<script lang="ts">
    import Portal from './portal/Portal.svelte';
    import PropertyEditor from '$lib/nodeviz/common/PropertyEditor.svelte';
    const obj = {
        sections: [
          {name: 'First', properties: {
            age: {displayName: 'Age of Person', value: 51, description: 'Age of the person'},
            birthDay: {displayName: 'Date of birth', value: '01/11/1970', description: 'Date of birth'}
          }},
          {name: 'Second', properties: {
            numberOfChildren: {displayName: 'Number of children', value: 2, description: 'Children'}
          }}          
        ]
    };
</script>