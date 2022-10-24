<div class="main">
	{#if node.id == 'root'}
		<WidgetNavigator nameSpace={node.value.nameSpace}/>
	{/if}

	<IconButton
		class="material-icons"
		touch
		on:click={() => {
			addDialogueOpen = true;
		}}>add</IconButton
	>

	<Dialog bind:open={addDialogueOpen}>
		<Title>Add Portal Widget</Title>
		<Content>
			<div class="dialogueContent">
				<div class="widgetListHolder">
					<List
						class="widgetList"
						twoLine
						singleSelection
						bind:selectedIndex={widgetSelectionIndex}
					>
						{#each widgets as widget}
							<Item
								on:SMUI:action={() => {selectedWidgetManifest=widget;}}
								selected={selectedWidgetManifest.package + '/' + selectedWidgetManifest.name === widget.qualifiedName}
							>
								<Text>
									<PrimaryText>{widget.name}</PrimaryText>
									<SecondaryText>{widget.package}</SecondaryText>
								</Text>
							</Item>
						{/each}
					</List>
				</div>
				<WidgetDetails widget={selectedWidgetManifest}/>
			</div>
		</Content>
		<Actions>
			<Button on:click={onAddWidget}>
				<Label>Add Widget</Label>
			</Button>
			<Button>
				<Label>Close</Label>
			</Button>
		</Actions>
	</Dialog>

	<div class="portalContainer">
		{#each nodes as node (node.id)}
			<div>
				<GenericComponentContainer {node} on:nodeUpdated={portalNodeUpdated}/>
			</div>
		{/each}
	</div>

</div>

<script lang="ts">
	import WidgetNavigator from './WidgetNavigator.svelte';
	import IconButton from '@smui/icon-button';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import List, { Item, Text, PrimaryText, SecondaryText } from '@smui/list';
	
	import { Node } from 'nodeviz/Node';
	import GenericComponentContainer from '../../GenericComponentContainer.svelte';
	import { getWidget, getWidgetManifests } from '../WidgetRegistry';
	import WidgetDetails from './WidgetDetails.svelte';
	import { getQualifiedName, type NodeObject, type WidgetInfo, type WidgetManifest } from '../Widget';
	import type { PortalHome } from './PortalHome';
	import { PersistenceService } from '$lib/nodeviz/services/PersistenceService';

    const portalAccess = PersistenceService.getInstance().getDataAccessObjectFor('portal');

	export let node:Node<PortalHome>;

	let addDialogueOpen = false;
	let widgets = [], widgetSelectionIndex = 0, selectedWidgetManifest:WidgetManifest;
	getWidgetManifests().then((_widgets) => {
		widgets = _widgets.map(widget => ({
			qualifiedName: '@' + widget.package + '/' + widget.name,
			...widget
		}));
		selectedWidgetManifest = widgets[0];
	});

	let portalWidgets = [];
	
	portalAccess.select((portalObjs) => {portalWidgets = portalObjs}, 
		[
			{field: 'nameSpace', op: '==', value: node.value.nameSpace},
			{field: 'parentId', op: '==', value: node.id}
		],
		'index'
	);

	let nodes, temp;
	$: {
		const widgetInfoPromises = [];
		portalWidgets.forEach(w => {
			widgetInfoPromises.push(getWidget(getQualifiedName(w)));
		});
		temp = [];
		nodes = [];
		Promise.all(widgetInfoPromises).then(() => {
			let index = 0;
			widgetInfoPromises.forEach(widgetInfoPromise => {
				widgetInfoPromise.then(widgetInfo => {
					const portalNode = portalWidgets[index];
					const value = widgetInfo.getDefaultNodeObject().valueOf(
						portalNode.state
					);
					const qualName = getQualifiedName(widgetInfo);
					const nodeHandler = widgetInfo.getNodeHandler && widgetInfo.getNodeHandler();
					const newNode = new Node({widgetName: qualName, value, id: portalNode.id, index:portalWidgets[index].index, handler: nodeHandler});
					newNode.config = widgetInfo.getPropertiesObject();
					temp.push(newNode);
					index++;
				})
			});
		}).then(()=> {
			nodes = temp;
			console.log(temp);
		});
	}

	async function onAddWidget() {
		// FIXME get the manifest and widget info typing right (add to board)
		// @ts-ignore 
		const qualifiedName = getQualifiedName(selectedWidgetManifest);
		const widgetInfo = await getWidget(qualifiedName);
		const nodeObject:NodeObject = widgetInfo.getDefaultNodeObject();
		
		// FIXME think about a different way to achieve this
		if (qualifiedName === '@nodeviz/portal') {
			(nodeObject as PortalHome).nameSpace = node.value.nameSpace;
		}

		const childrenCount = await portalAccess.count([{field:'parentId', op: '==', value:node.id}]);
		console.log('children count', childrenCount);

		portalAccess.insert({
			nameSpace: node.value.nameSpace,
			parentId: node.id,
			package: widgetInfo.package,
			name: widgetInfo.name,
			type: widgetInfo.type,
			state: {...nodeObject.toJson()},
			createdAt: new Date(),
			index: childrenCount
		});
	}

	async function portalNodeUpdated(node:CustomEvent<Node<NodeObject>>) {
		portalAccess.update(node.detail.id, {
			state: {...node.detail.value.toJson()}
		});
	}

</script>


<style>
	.main > :global(.tree > li) {
		height: 300px;
	}
	.main {
		display: flex;
	}
	.dialogueContent {
		display: flex;
		max-height: 250px;
	}
	.widgetListHolder {
		overflow: auto;
	}
	* :global(.widgetList) {
		min-width: 200px;
		padding-right: 10px;
	}
</style>

