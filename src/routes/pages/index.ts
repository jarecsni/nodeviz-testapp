import type { SvelteComponent } from 'svelte';
import type {NodeObj} from '../../nodeviz/Node';
import {Page} from '../../nodeviz/widgets/page/Page';

const loadPageComponent = (name:string):Promise<SvelteComponent> => import('./resources/' + name + '.svelte');

export const pagesDef:NodeObj = {
    package: 'Page',
    //@ts-ignore
    value: new Page('Home', () => (loadPageComponent('HomePage'))),
    children: [
        {
            package: 'Page',
            //@ts-ignore
            value: new Page('News', () => (loadPageComponent('News')))
        },
        {
            package: 'Page',
            //@ts-ignore
            value: new Page('About', () => (loadPageComponent('AboutUs')))
        },
        {
            package: 'Page',
            //@ts-ignore
            value: new Page('Jobs', () => (loadPageComponent('Jobs'))),
            children: [
                {
                    package: 'Page',
                    //@ts-ignore
                    value: new Page('Contract Positions', () => (loadPageComponent('ContractJobs')))
                },
                {
                    package: 'Page',
                    //@ts-ignore
                    value: new Page('Permanent Positions', () => (loadPageComponent('Employment')))
                },      
            ]
        }
    ]
}