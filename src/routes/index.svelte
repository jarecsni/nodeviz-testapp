<script type="typescript">
    import GenericComponent from "../nodeviz/GenericComponent.svelte";
    import type { Node } from "src/nodeviz/Nodes";

    const loadPageComponent = (name:string) => import('./resources/' + name + '.svelte');
 
    // 
    const node:Node = {
        type: 'page',
        value: { 
            title: 'Home',
            pageComponent: () => loadPageComponent('HomePage') 
        },
        children: [
            {
                type: 'page',
                value: {
                    title: 'News',
                    pageComponent: () => loadPageComponent('News')
                }
            },
            {
                type: 'page',
                value: {
                    title: 'About',
                    pageComponent: () => loadPageComponent('AboutUs')
                }
            },
            {
                type: 'page',
                value: {
                    title: 'Jobs',
                    pageComponent: () => loadPageComponent('Jobs')
                },
                children: [
                    {
                        type: 'page',
                        value: {
                            title: 'Contract Positions',
                            pageComponent: () => loadPageComponent('ContractJobs')
                        }
                    },
                    {
                        type: 'page',
                        value: {
                            title: 'Permanent Jobs',
                            pageComponent: () => loadPageComponent('Employment')
                        }
                    },      
                ]
            }
        ]
    }
</script>

<GenericComponent {node}/>