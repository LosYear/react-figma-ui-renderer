import { frameRenderer, rectangleRenderer } from './Renderers';

export default class BridgeHandler {
    private instances: Map<number, any>;

    constructor() {
        this.instances = new Map<number, any>();
    }

    onMessage(message) {
        // console.log('-> Main', message);

        switch (message.type) {
            case 'createInstance':
                this.createInstance(message.options);
                break;
            case 'appendChild':
                this.appendChild(message.options);
                break;
            case 'commitUpdate':
                this.updateNode(message.options);
                break;
            case 'removeChild':
                this.removeChild(message.options);
                break;
            case 'getTree':
                this.sendTree();
                break;
        }
    }

    createInstance({ tag, type, props }) {
        let instance = null;
        switch (type) {
            case 'rectangle': {
                instance = rectangleRenderer(null, props, tag);
                break;
            }
            case 'frame': {
                instance = frameRenderer(null, props, tag);
                break;
            }
        }

        if (instance) {
            this.instances.set(tag, instance);
        }
    }

    appendChild({ parent, child }) {
        const parentNode = this.instances.get(parent);
        const childNode = this.instances.get(child);

        parentNode.appendChild(childNode);
    }

    removeChild({ child }) {
        const instance = this.instances.get(child);

        if (!instance || instance.removed) {
            return;
        }

        instance.remove();
        this.instances.delete(child);
    }

    updateNode({ type, node, update }) {
        const instance = this.instances.get(node);

        switch (type) {
            case 'rectangle': {
                rectangleRenderer(instance, update, node);
                break;
            }
            case 'frame': {
                frameRenderer(instance, update, node);
                break;
            }
        }
    }

    sendTree() {
        const forest = {
            parent: null,
            children: figma.currentPage.children.map(child => this.buildTree(child))
        };
        figma.ui.postMessage({ type: 'sendTree', options: forest });
    }

    private buildTree(parent) {
        if (!parent || parent.getPluginData('isReactFigmaNode') !== 'true') {
            return;
        }
        const tag = parent.getPluginData('reactFigmaTag');

        this.instances.set(tag, parent);

        return {
            tag: parent.getPluginData('reactFigmaTag'),
            type: parent.type,
            children: parent.children && parent.children.map(child => this.buildTree(child))
        };
    }
}
