import {convertJSON} from './Node';
import type {NodeObj} from './Nodes';
describe('Node', () => {
    it('transforms a single node', () => {
        const node:NodeObj = {
            name: 'node',
            type: 'someType',
            value: {}
        }
        const converted = convertJSON(node);
        expect(converted.name).toBe('node');
        expect(converted.children).toBeUndefined();
        expect(converted.parent).toBeUndefined();
        expect(converted.type).toBe('someType');
    });
    it('sets the parent correctly', () => {
        const node:NodeObj = {
            name: 'node',
            type: 'someType',
            value: {},
            children: [{
                name: 'childNode',
                type: 'someOtherType',
                value: {}
            }]
        }
        const converted = convertJSON(node);
        expect(converted.children.length).toBe(1);
        expect(converted.children[0].parent).toBe(converted);
    });
});