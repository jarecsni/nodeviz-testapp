<Accordion multiple>
    {#each sections as section}
    <Panel open>
        <Header>{section.name}</Header>
        <Content>
            <DataTable style="max-width: 100%;">
                <Head>
                  <Row>
                    <Cell>Property</Cell>
                    <Cell>Description</Cell>
                    <Cell>Value</Cell>
                  </Row>
                </Head>
                <Body>
                  {#each Object.keys(section.properties) as property}
                    <Row>
                      <Cell>{property}</Cell>
                      <Cell>{section.properties[property].description}</Cell>
                      <Cell>{section.properties[property].value}</Cell>
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
    import DataTable, {Head, Body, Row, Cell} from '@smui/data-table';
    /*
        example object
        {
            sections: [
                {
                    name: "First",
                    properties: {
                        someProperty: {value: 0, description: 'An example numeric prop'}
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
   const {sections} = obj;
</script>