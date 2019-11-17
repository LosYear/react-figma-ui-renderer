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
        }
    }

    createInstance({ tag, type, props }) {
        let instance = null;
        switch (type) {
            case 'rectangle': {
                instance = rectangleRenderer(null, props);
                break;
            }
            case 'frame': {
                instance = frameRenderer(null, props);
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
                rectangleRenderer(instance, update);
                break;
            }
            case 'frame': {
                frameRenderer(instance, update);
                break;
            }
        }
    }
}
