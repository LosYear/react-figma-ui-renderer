export default class BridgeManager {
    constructor() {}

    sendMessage(type, options) {
        // console.log('UI -> main:', type, options);
        parent.postMessage({ pluginMessage: { type, options } }, '*');
    }

    createInstance(tag, type, props) {
        this.sendMessage('createInstance', { tag, type, props });
    }

    appendChild(parent, child) {
        this.sendMessage('appendChild', { parent, child });
    }

    removeChild(parent, child) {
        this.sendMessage('removeChild', { parent, child });
    }

    commitUpdate(type, node, update) {
        this.sendMessage('commitUpdate', { type, node, update });
    }
}
