<Portal adminMode/>
<PropertyEditor {obj}/>

<script lang="ts">
    import Portal from './portal/Portal.svelte';
    import PropertyEditor, {propertyTypes} from '$lib/nodeviz/common/property-editor/PropertyEditor.svelte';
    const obj = {
        sections: [
          {name: 'First', properties: {
            age: {displayName: 'Age of Person', value: 51, description: 'Age of the person'},
            salary: {displayName: 'Salary of Person', value: 120100, description: 'Salary of the person'},
            birthDay: {displayName: 'Date of birth', value: '01/11/1970', type: propertyTypes.Date, description: 'Date of birth'},
            vegetarian: {displayName: 'Vegetarian', value: false, description: 'Plants based diet'}
          }},
          {name: 'Second', properties: {
            numberOfChildren: {displayName: 'Number of children', value: 2, description: 'Children'},
            favouriteMeal: {displayName: 'Favourite meal', value: 'Spaghetti Bolognese', description: 'Stuff you like to stuff yourself with'}
          }}          
        ]
    };
</script>