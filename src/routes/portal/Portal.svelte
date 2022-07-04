<GenericComponentContainer {node} />


<script lang="ts">
	import GenericComponentContainer from '../../nodeviz/GenericComponentContainer.svelte';
	import { Node } from 'nodeviz/Node';
    import { PortalHome } from '../../nodeviz/widgets/portal/PortalHome';
    
    const node = new Node({widgetName: '@nodeviz/portal', value: new PortalHome()});
</script>