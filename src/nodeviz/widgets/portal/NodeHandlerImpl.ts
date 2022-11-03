import type { ManagementAction, Node, NodeHandler } from 'nodeviz/Node';

export class NodeHandlerImpl implements NodeHandler<object> {
    private _handleAction:(action:string, node:Node<object>)=>void;
    constructor(handleAction:(action:string, node:Node<object>)=>void) {
        this._handleAction = handleAction;
    }
    isVisible(node: Node<object>): boolean {
        return true;
    }
    getManagementActions(node: Node<object>): ManagementAction<object>[] {
        const result:ManagementAction<object>[] = [
            {
                iconName: 'settings',
                tooltip: 'Settings blah blah blah',
                callback: () => { this._handleAction('openSettingsDialogue', node) }
            }
        ];
        return result;
    }
}