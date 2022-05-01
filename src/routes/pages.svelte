<GenericComponent node={pages}/>

<script type="typescript">
	import { convertJSON, Node } from '../nodeviz/Node';
	import GenericComponent from "../nodeviz/GenericComponent.svelte";
    import { pagesDef } from './pages/index';    
    import type { Page } from 'src/nodeviz/widgets/page/types';
    
    const pages:Node<Page> = convertJSON(pagesDef);
</script>