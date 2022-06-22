import {widgets} from './index';
import type {WidgetInfo} from './Widget';

const registry = new Map<string, WidgetInfo>();
let initDone = false;

const initRegistry = () => {
    return new Promise((resolve, reject) => {
        let count = 0;
        const promises = [], childPromises = [];
        widgets.forEach(w => {
            promises.push(import('./' + w + '/index.ts').then(module => {
                const info = module.getWidgetInfo();
                registry.set(w + '/' + (info.type || w), info);
                const childWidgets = info.widgets;
                // TODO this could be extracted etc to make it more DRY
                childWidgets && childWidgets.forEach(childWidget => {
                    childPromises.push(import('./' + w + '/' + childWidget + '/index.ts').then(childModule => {
                        const childInfo = {parent: info.name, ... childModule.getWidgetInfo()};
                        registry.set(w + '/' + (childInfo.type || childWidget), childInfo);  
                    }));      
                });
            }));
        });
        // FIXME think of possible ways of making this simpler / nicer
        // This works fine, but it's a bit ugly, not sure right now how else this could be done
        Promise.all(promises).then(() => {
            Promise.all(childPromises).then(() => {
                initDone = true;
                resolve(registry);
            })
        });
    })
}

export const getWidget:(string)=>Promise<WidgetInfo> = async (type:string) => {
    let widget = registry.get(type);
    if (!widget) {
        let start = new Date().getMilliseconds();
        console.log('Loading widget', type);
        const widgetHome = type.substring(0, type.indexOf('/'));
        const childPromises = [];
        await import('./' + widgetHome + '/index.ts').then(module => {
            const info = module.getWidgetInfo();
            registry.set(widgetHome + '/' + (info.type || widgetHome), info);
            const childWidgets = info.widgets;
            // TODO this could be extracted etc to make it more DRY
            childWidgets && childWidgets.forEach(childWidget => {
                childPromises.push(import('./' + widgetHome + '/' + childWidget + '/index.ts').then(childModule => {
                    const childInfo = {parent: info.name, ... childModule.getWidgetInfo()};
                    registry.set(widgetHome + '/' + (childInfo.type || childWidget), childInfo);  
                }));      
            });
        });
        await Promise.all(childPromises);
        console.log('Loading widget', type, 'done in', (new Date().getMilliseconds() - start), 'ms');
        return registry.get(type);
    }
    return widget;
}

export const getWidgets:() => Promise<WidgetInfo[]> = async () => {
    if (!initDone) {
        console.log('waiting for registry init');
        await initRegistry();
        console.log('init complete');
    }
    const widgets = await registry.values();
    return Array.from(widgets).filter(w => !w.parent);
}