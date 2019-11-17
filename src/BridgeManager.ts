function fixParents(instance, parent) {
    instance.parent = parent;

    if (instance.children) {
        instance.children.forEach(child => {
            fixParents(child, instance);
        });
    }
}

export default class BridgeManager {
    // Used for hydration only
    shadowTree = { children: [] };

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

    getTree() {
        // ! Dirty await code for message response, just to get it work ASAP !
        return new Promise((resolve, reject) => {
            this.sendMessage('getTree', {});

            // @ts-ignore
            global.onmessage = event => {
                if (event.data.pluginMessage.type === 'sendTree') {
                    // @ts-ignore
                    global.onmessage = undefined;

                    resolve(true);
                    this.shadowTree = event.data.pluginMessage.options;
                    fixParents(this.shadowTree, null);
                }
            };
        });
    }
}
