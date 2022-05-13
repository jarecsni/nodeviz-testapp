import {widgets} from './index';
import type {WidgetInfo} from './Widget';

const registry = new Map<string, WidgetInfo>();
let initDone = false;

const initRegistry = () => {
    return new Promise((resolve, reject) => {
        let count = 0;
        widgets.forEach(w => {
            import('./' + w + '/index.ts').then(module => {
                const info = module.getWidgetInfo();
                registry.set(w + '/' + (info.type || w), info);
                const childWidgets = info.widgets;
                // TODO this could be extracted etc to make it more DRY
                childWidgets && childWidgets.forEach(childWidget => {
                    import('./' + w + '/' + childWidget + '/index.ts').then(childModule => {
                        const childInfo = childModule.getWidgetInfo();
                        registry.set(w + '/' + (childInfo.type || childWidget), childInfo);  
                    })      
                });
                if (++count == widgets.length) {
                    initDone = true;
                    resolve(registry);
                }
            });
        });
    })
}

export const getWidget:(string)=>Promise<WidgetInfo> = async (type:string) => {
    if (!initDone) {
        await initRegistry();
    }
    const widget = await registry.get(type);
    return widget;
}