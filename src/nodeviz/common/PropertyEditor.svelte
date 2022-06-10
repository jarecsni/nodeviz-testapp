<Accordion multiple>
    {#each sections as section}
    <Panel>
        <Header>{section.name}</Header>
        <Content>
          The content for {section.name}.
        </Content>
    </Panel>
    {/each}
</Accordion>

<script>
    export let obj;
    import Accordion, { Panel, Header, Content } from '@smui-extra/accordion'
    /*
        example object
        {
            sections: [
                {
                    name: "First",
                    properties: {

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