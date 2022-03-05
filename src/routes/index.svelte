<script type="typescript">
    import GenericComponent from "../nodeviz/GenericComponent.svelte";
    import type { Node } from "src/nodeviz/Nodes";

    const loadPageComponent = (name:string) => import('./resources/' + name + '.svelte');
 
    // 
    const node:Node = {
        type: 'page',
        value: { 
            pageComponent: () => loadPageComponent('HomePage') 
        },
        children: [
            {
                type: 'page',
                value: {
                    pageComponent: () => loadPageComponent('News')
                }
            },
            {
                type: 'page',
                value: {
                    pageComponent: () => loadPageComponent('AboutUs')
                }
            },
            {
                type: 'page',
                value: {
                    pageComponent: () => loadPageComponent('Jobs')
                },
                children: [
                    {
                        type: 'page',
                        value: {
                            pageComponent: () => loadPageComponent('ContractJobs')
                        }
                    },
                    {
                        type: 'page',
                        value: {
                            pageComponent: () => loadPageComponent('Employment')
                        }
                    },      
                ]
            }
        ]
    }
</script>

<GenericComponent {node}/>