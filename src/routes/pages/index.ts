import type {NodeObj} from '../../nodeviz/Node';
import {Page} from '../../nodeviz/widgets/page/Page';

const loadPageComponent = (name:string) => import('./resources/' + name + '.svelte');

export const pagesDef:NodeObj = {
    //@ts-ignore
    value: new Page('Home', () => (loadPageComponent('HomePage'))),
    children: [
        {
            //@ts-ignore
            value: new Page('News', () => (loadPageComponent('News')))
        },
        {
            //@ts-ignore
            value: new Page('About', () => (loadPageComponent('AboutUs')))
        },
        {
            //@ts-ignore
            value: new Page('Jobs', () => (loadPageComponent('Jobs'))),
            children: [
                {
                    //@ts-ignore
                    value: new Page('Contract Positions', () => (loadPageComponent('ContractJobs')))
                },
                {
                    //@ts-ignore
                    value: new Page('Permanent Positions', () => (loadPageComponent('Employment')))
                },      
            ]
        }
    ]
}