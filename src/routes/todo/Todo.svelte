<GenericComponentContainer {node}/>

<script lang="ts">
    import GenericComponentContainer from '../../nodeviz/GenericComponentContainer.svelte';
    import { TodoHome } from '../../nodeviz/widgets/todo/TodoHome';
    import { Node } from '../../nodeviz/Node';
    const node = new Node('Todo', new TodoHome());
</script>

