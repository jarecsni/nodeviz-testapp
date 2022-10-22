import { PropertiesObjectImpl } from '$lib/nodeviz/common/property-editor/PropertiesObjectImpl';
import { Node } from 'nodeviz/Node';
import type {WidgetInfo} from '../Widget';
import PortalDesktopComponent from './PortalDesktopComponent.svelte';
import { PortalHome } from './PortalHome';

export const getWidgetInfo:()=>WidgetInfo = () => ({
    package: 'nodeviz',
    name: 'portal',
    type: 'PortalHome',
    desktop: {
        renderer: PortalDesktopComponent
    },
    getDefaultNodeObject: () => (new PortalHome('')),
    getPropertiesObject: () => (getNewPropertiesObject())
});

const getNewPropertiesObject = () => {
    const props = new PropertiesObjectImpl();
    props.addSection({name: 'Firebase', properties: [
        {displayName: 'apiKey', value: 'AIzaSyBArDmsWV3HJYfaQnES_Ri4TOOvOqBr7hc', description: 'apiKey'},
        {displayName: 'authDomain', value: 'nodeviz-testapp0.firebaseapp.com', description: 'authDomain'},
        {displayName: 'projectId', value: 'nodeviz-testapp0', description: 'projectId'},
        {displayName: 'storageBucket', value: 'nodeviz-testapp0.appspot.com', description: 'storageBucket'},
        {displayName: 'messagingSenderId', value: '450845456306', description: 'messagingSenderId'},
        {displayName: 'appId', value: '1:450845456306:web:90e48386a028d8ca7cd6ab', description: 'appId'},
        {displayName: 'measurementId', value: 'G-WT4LJVJBJY', description: 'measurementId'}
    ]});
    return props;
}
