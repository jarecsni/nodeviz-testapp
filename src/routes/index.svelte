<script type="typescript">
    import GenericComponent from "../nodeviz/GenericComponent.svelte";
    import type { Node } from "src/nodeviz/Nodes";

    const node:Node = {
        type: 'page',
        value: { content: () => import('./pages/main') }
    }
</script>

<GenericComponent {node}/>