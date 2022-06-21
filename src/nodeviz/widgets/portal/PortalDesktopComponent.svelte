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
			<List
				class="demo-list"
				twoLine
				singleSelection
				bind:selectedIndex={widgetSelectionIndex}
			>
				{#each widgets as widget}
					<Item
						on:SMUI:action={() => (selectedWidget = widget.qualifiedName)}
						selected={selectedWidget === widget.qualifiedName}
					>
						<Text>
							<PrimaryText>{widget.name}</PrimaryText>
							<SecondaryText>{widget.package}</SecondaryText>
						</Text>
						<Meta class="material-icons">info</Meta>
					</Item>
				{/each}
			</List>
			<div>Detail panel for selected Widget</div>
		</div>
	</Content>
	<Actions>
		<Button
			on:click={() => {
				addDialogueOpen = false;
			}}
		>
			<Label>Close</Label>
		</Button>
	</Actions>
</Dialog>

<div class="portalContainer">
	{#each nodes as node (node.id)}
		<div>
			<GenericComponentContainer {node} />
		</div>
	{/each}
</div>

<script lang="ts">
	import IconButton from '@smui/icon-button';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import List, { Item, Graphic, Meta, Text, PrimaryText, SecondaryText } from '@smui/list';

	import { Node } from 'nodeviz/Node';
	import { onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';
	import { browser } from '$app/env';
	import { dbRef, db } from './firebase';
	import GenericComponentContainer from '../../GenericComponentContainer.svelte';
	import { PortalWidget } from './PortalWidget';
	import { getWidgets } from '../WidgetRegistry';

	let addDialogueOpen = false;

	let loadingData = true;

	let portalWidgets = [];
	const unsubscribe =
		browser &&
		onSnapshot(dbRef, (querySnapshot) => {
			let portalSnapshot = [];
			querySnapshot.forEach((doc) => {
				let portalWidget = { ...doc.data(), id: doc.id };
				portalSnapshot = [...portalSnapshot, portalWidget];
			});
			portalWidgets = portalSnapshot;
			loadingData = false;
		});

	let nodes = [];
	$: {
		nodes = portalWidgets.map((t) => new Node('PortalWidget', PortalWidget.valueOf(t)));
	}

	async function addPortalWidget() {
		const portalWidget = new PortalWidget();
		await addDoc(dbRef, {
			...portalWidget.toJson()
		});
	}

	async function onPortalWidgetUpdated(portalWidget: CustomEvent<PortalWidget>) {
		await updateDoc(doc(db, 'portal', portalWidget.detail.id), {
			...portalWidget.detail
		});
	}

	let widgets = [], widgetSelectionIndex, selectedWidget;
	getWidgets().then((_widgets) => {
		widgets = _widgets.map(widget => ({
			qualifiedName: '@' + widget.package + '/' + widget.name,
			...widget
		}));
		console.log({widgets});
	});
</script>


<style>
	.dialogueContent {
		display: flex;
	}
</style>
