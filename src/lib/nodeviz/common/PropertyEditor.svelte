<Accordion multiple>
	{#each sections as section}
		<Panel open>
			<Header>{section.name}</Header>
			<Content>
				<DataTable style="max-width: 100%;">
					<Head>
						<Row>
							<Cell style="text-align:left">Property</Cell>
							<Cell style="text-align:left">Value</Cell>
                            <Cell style="text-align:left">Description</Cell>
						</Row>
					</Head>
					<Body>
						{#each Object.keys(section.properties) as property}
							<Row>
								<Cell>{section.properties[property].displayName}</Cell>
								<Cell>
									<Textfield 
                                        bind:value={section.properties[property].value} 
                                        type="number" />
								</Cell>
                                <Cell>{section.properties[property].description}</Cell>
							</Row>
						{/each}
					</Body>
				</DataTable>
			</Content>
		</Panel>
	{/each}
</Accordion>

<script>
	export let obj;
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import Textfield from '@smui/textfield';
	/*
        example object
        {
            sections: [
                {
                    name: "First",
                    properties: {
                        someProperty: {
                            displayName: 'Human Readable name',
                            value: 0, 
                            description: 
                            'An example numeric prop'
                        }
                    }
                },
                {
                    name: "Second",
                    properties: {

                    }
                }
            ]
        }
    */
	const { sections } = obj;
	const editors = {};
	sections.forEach(section => {
		Object.keys(section.properties).forEach(property => {
			const type = property.constructor.name;
			// Continue from here: emit editors based on type

			// TODO one idea might be:
			// https://www.webtips.dev/webtips/svelte/how-to-dynamically-render-components-in-svelte
		});
	});
</script>