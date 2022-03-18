import {convertJSON, Node} from './Node';
import type { NodeObj } from './Nodes';
describe('Node', () => {
    it('transforms a single node', () => {
        const node:NodeObj = {
            name: 'node',
            type: 'someType',
            value: {}
        }
        const converted = convertJSON(node);
        expect(converted.name).toBe('node');
    });
});