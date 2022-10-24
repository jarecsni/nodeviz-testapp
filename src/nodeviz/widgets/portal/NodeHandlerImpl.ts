import type { ManagementAction, Node, NodeHandler } from 'nodeviz/Node';

export class NodeHandlerImpl implements NodeHandler<object> {
    isVisible(node: Node<object>): boolean {
        return true;
    }
    getManagementActions(node: Node<object>): ManagementAction<object>[] {
        const result:ManagementAction<object>[] = [
            {
                iconName: 'delete',
                callback: () => { console.log('delete called'); }
            }
        ];
        if (node.config) {
            result.push({
                iconName: 'settings',
                tooltip: 'Settings',
                callback: () => { console.log('settings called'); }
            });
        }
        return result;
    }
}