<h1>Portal App</h1>

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

<script lang="ts">
	import IconButton from '@smui/icon-button';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import List, { Item, Text, PrimaryText, SecondaryText } from '@smui/list';
	import {v4 as uuidv4} from 'uuid';

	import { Node } from 'nodeviz/Node';
	import { onSnapshot, addDoc, updateDoc, doc, query, orderBy, where } from 'firebase/firestore';
	import { browser } from '$app/env';
	import { db, dbRef } from './firebase';
	import GenericComponentContainer from '../../GenericComponentContainer.svelte';
	import { getWidget, getWidgetManifests } from '../WidgetRegistry';
	import WidgetDetails from './WidgetDetails.svelte';
	import { getQualifiedName, type NodeObject, type WidgetInfo, type WidgetManifest } from '../Widget';
	import type { PortalHome } from './PortalHome';

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

	let loadingData = true;

	let portalWidgets = [];
	const unsubscribe =
		browser &&
		onSnapshot(query(dbRef, where('level', '==', node.value.level), orderBy('createdAt')), (querySnapshot) => {
			let portalSnapshot = [];
			querySnapshot.forEach((doc) => {
				let portalNode:{id:string,state:unknown,type:string,name:string} = { ...doc.data(), id: doc.id };
				portalSnapshot.push(portalNode);
			});
			portalWidgets = portalSnapshot;
			loadingData = false;
		});

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
					const portalNode = portalWidgets[index++];
					const value = widgetInfo.getDefaultNodeObject().valueOf(
						portalNode.state
					);
					temp.push(new Node({widgetName: getQualifiedName(widgetInfo), value, id: portalNode.id}));
				})
			});
		}).then(()=> {
			nodes = temp;
		});
	}

	async function onAddWidget() {
		// FIXME get the manifest and widget info typing right (add to board)
		// @ts-ignore 
		const widgetInfo = await getWidget(getQualifiedName(selectedWidgetManifest));
		const nodeObject:NodeObject = widgetInfo.getDefaultNodeObject();
		if (getQualifiedName(widgetInfo) == '@nodeviz/portal') {
			(nodeObject as PortalHome).level ++;
		}
		await addDoc(dbRef, {
			level: node.value.level,
			package: widgetInfo.package,
			name: widgetInfo.name,
			type: widgetInfo.type,
			id: uuidv4(),
			state: {...nodeObject.toJson()},
			createdAt: new Date()
		});
	}

	async function portalNodeUpdated(node:CustomEvent<Node<NodeObject>>) {
		await updateDoc(doc(db, 'portal', node.detail.id), {
			state: {...node.detail.value.toJson()}
		});
	}

</script>


<style>
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

