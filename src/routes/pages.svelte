<GenericComponent node={pages}/>

<script type="typescript">
	import { convertJSON } from '../nodeviz/Node';
	import GenericComponent from "../nodeviz/GenericComponent.svelte";
    import { pagesDef } from './pages/index';    
    const pages = convertJSON(pagesDef);
</script>