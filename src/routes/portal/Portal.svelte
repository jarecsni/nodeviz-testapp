<GenericComponentContainer {node} />


<script lang="ts">
	import {Node} from 'nodeviz/Node';
	import GenericComponentContainer from '../../nodeviz/GenericComponentContainer.svelte';
    import { PortalHome } from '../../nodeviz/widgets/portal/PortalHome';
    
    const node = new Node({widgetName: '@nodeviz/portal', value: new PortalHome(0)});
</script>