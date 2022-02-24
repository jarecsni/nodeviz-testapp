<script type="typescript">
    //import {getWidgetInfo} from '../nodeviz/widgets/page';
    //const RenderComp = getWidgetInfo().desktop.renderer
    import GenericComponent from "../nodeviz/GenericComponent.svelte";
    import type { Node } from "src/nodeviz/Nodes";

    const node:Node = {
        type: 'pagex',
        value: { some: 'value' }
    }
</script>

<GenericComponent {node}/>