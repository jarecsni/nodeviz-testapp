import { widgets } from ".";
import type { Widget } from "./Widget";

const registry = new Map<string, Widget>();
let initDone = false;

const initRegistry = () => {
    return new Promise((resolve, reject) => {
        let count = 0;
        widgets.forEach(w => {
            import('./' + w + '/index.ts').then(module => {
                const {getWidgetInfo} = module;
                registry.set(w, getWidgetInfo());
                if (++count == widgets.length) {
                    initDone = true;
                    resolve(registry);
                }
            });
        });
    })
}

export const getWidget = async (type:string) => {
    if (!initDone) {
        await initRegistry();
    }
    const widget = await registry.get(type);
    return widget;
}