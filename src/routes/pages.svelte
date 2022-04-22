<script type="typescript">
	import { convertJSON } from '../nodeviz/Node';
	import GenericComponent from "../nodeviz/GenericComponent.svelte";
    import { pagesDef } from './pages';    
    const pages = convertJSON(pagesDef);
</script>

<GenericComponent node={pages}/>