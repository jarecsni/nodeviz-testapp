<GenericComponentContainer node={pages}/>

<script type="typescript">
	import GenericComponentContainer from '../../nodeviz/GenericComponentContainer.svelte';
    import {Node, convertJSON} from 'nodeviz/Node';
    import {pagesDef} from './index';    
    import type {Page} from '../../nodeviz/widgets/page/Page';
    const pages:Node<Page> = convertJSON(pagesDef);
</script>