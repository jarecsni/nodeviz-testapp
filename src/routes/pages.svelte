<GenericComponentContainer node={pages}/>

<script type="typescript">
	import GenericComponentContainer from './../nodeviz/GenericComponentContainer.svelte';
	import { convertJSON, Node } from '../nodeviz/Node';
    import { pagesDef } from './pages/index';    
    import type { Page } from 'src/nodeviz/widgets/page/types';
    const pages:Node<Page> = convertJSON(pagesDef);
</script>