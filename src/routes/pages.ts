import type { NodeObj } from "src/nodeviz/Nodes";

const loadPageComponent = (name:string) => import('./resources/' + name + '.svelte');

export const pagesDef:NodeObj = {
    name: 'home',
    type: 'page',
    value: { 
        title: 'Home',
        pageComponent: () => loadPageComponent('HomePage') 
    },
    children: [
        {
            name: 'news',
            type: 'page',
            value: {
                title: 'News',
                pageComponent: () => loadPageComponent('News')
            }
        },
        {
            name: 'about',
            type: 'page',
            value: {
                title: 'About',
                pageComponent: () => loadPageComponent('AboutUs')
            }
        },
        {
            name: 'jobs',
            type: 'page',
            value: {
                title: 'Jobs',
                pageComponent: () => loadPageComponent('Jobs')
            },
            children: [
                {
                    name: 'contract',
                    type: 'page',
                    value: {
                        title: 'Contract Positions',
                        pageComponent: () => loadPageComponent('ContractJobs')
                    }
                },
                {
                    name: 'perm',
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