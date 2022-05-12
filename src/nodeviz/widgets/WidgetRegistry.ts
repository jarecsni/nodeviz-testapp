import {widgets} from './index';
import type {WidgetInfo} from './Widget';

const registry = new Map<string, WidgetInfo>();
let initDone = false;

const initRegistry = () => {
    return new Promise((resolve, reject) => {
        let count = 0;
        widgets.forEach(w => {
            import('./' + w + '/index.ts').then(module => {
                const {getWidgetInfo} = module;
                registry.set(w + '/' + w, getWidgetInfo());
                const childWidgets = module.widgets;
                // TODO this could be extracted etc to make it more DRY
                childWidgets && childWidgets.forEach(childWidget => {
                    import('./' + childWidget + '/index.ts').then(childModule => {
                        const {getWidgetInfo} = childModule;
                        registry.set(w + '/' + childWidget, getWidgetInfo());  
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