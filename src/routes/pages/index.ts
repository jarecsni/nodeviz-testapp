import type { SvelteComponent } from 'svelte';
import type {NodeObj} from 'nodeviz/Node';
import {Page} from '../../nodeviz/widgets/page/Page';

const loadPageComponent = (name:string):Promise<SvelteComponent> => import('./resources/' + name + '.svelte');

export const pagesDef:NodeObj = {
    widgetName: '@nodeviz/page',
    //@ts-ignore
    value: new Page('Home', () => (loadPageComponent('HomePage'))),
    children: [
        {
            widgetName: '@nodeviz/page',
            //@ts-ignore
            value: new Page('News', () => (loadPageComponent('News')))
        },
        {
            widgetName: '@nodeviz/page',
            //@ts-ignore
            value: new Page('About', () => (loadPageComponent('AboutUs')))
        },
        {
            widgetName: '@nodeviz/page',
            //@ts-ignore
            value: new Page('Jobs', () => (loadPageComponent('Jobs'))),
            children: [
                {
                    widgetName: '@nodeviz/page',
                    //@ts-ignore
                    value: new Page('Contract Positions', () => (loadPageComponent('ContractJobs')))
                },
                {
                    widgetName: '@nodeviz/page',
                    //@ts-ignore
                    value: new Page('Permanent Positions', () => (loadPageComponent('Employment')))
                },      
            ]
        }
    ]
}