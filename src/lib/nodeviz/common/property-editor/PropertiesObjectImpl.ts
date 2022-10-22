import type { PropertiesObject, PropertySection } from './PropertyEditorTypes';

export class PropertiesObjectImpl implements PropertiesObject {
    private _sections = [];
    get sections(): PropertySection[] {
        return this._sections;
    }
    addSection(section: PropertySection) {
        this._sections.push(section);
    }
}