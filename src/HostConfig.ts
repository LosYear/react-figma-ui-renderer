import * as React from 'react';
import * as Reconciler from 'react-reconciler';
import BridgeManager from './BridgeManager';

class BridgeComponentRef {
    readonly tag: number;

    constructor(tag: number) {
        this.tag = tag;
    }
}

function shallowDiff(oldObj, newObj) {
    // Return a diff between the new and the old object
    const uniqueProps = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);
    const changedProps = Array.from(uniqueProps).filter(propName => oldObj[propName] !== newObj[propName]);

    return changedProps;
}

const getNextChildren = instance => {
    if (!instance || !instance.parent) {
        return;
    }
    const parent = instance.parent;
    const instanceIndex = parent.children.indexOf(instance);
    return parent.children.slice(instanceIndex + 1).find(child => true);
};

export const render = async (element, rootNode) => {
    const bridgeManager = new BridgeManager();
    await bridgeManager.getTree();
    let currentTag = 0;

    function allocateTag() {
        return ++currentTag;
    }

    const instanceCache = {};

    function precacheFiberNode(hostInst, tag) {
        instanceCache[tag] = hostInst;
    }

    const HostConfig = {
        now: Date.now,
        supportsMutation: true,
        supportsHydration: true,
        getRootHostContext: () => {},
        prepareForCommit: () => {},
        resetAfterCommit: () => {},
        getChildHostContext: () => {},
        shouldSetTextContent: () => false,
        createInstance: (type, props, rootContainerInstance, hostContext, internalInstanceHandle) => {
            const tag = allocateTag();
            const { children, ...pureProps } = props;
            bridgeManager.createInstance(tag, type, pureProps);

            precacheFiberNode(internalInstanceHandle, tag);

            return new BridgeComponentRef(tag);
        },
        finalizeInitialChildren: () => {},
        appendChildToContainer: () => {},
        appendInitialChild: (parent, child) => {
            bridgeManager.appendChild(parent.tag, child.tag);
        },
        appendChild: (parent, child) => {
            bridgeManager.appendChild(parent.tag, child.tag);
        },
        removeChild: (parent, child) => {
            bridgeManager.removeChild(parent.tag, child.tag);
        },
        prepareUpdate: (element, type, oldProps, newProps) => {
            return shallowDiff(oldProps, newProps);
        },
        commitUpdate: (element, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
            let diff = {};
            let dirty = false;

            updatePayload.forEach(propName => {
                if (propName === 'children') {
                    return;
                }
                dirty = true;
                diff[propName] = newProps[propName];
            });

            if (dirty) {
                bridgeManager.commitUpdate(type, element.tag, diff);
            }
        },

        // Hydration
        getFirstHydratableChild: parent => {
            const list = parent ? parent.children : bridgeManager.shadowTree.children;
            if (!list || list.length === 0) {
                return null;
            }
            return list[0];
        },
        didNotHydrateContainerInstance: () => {},
        didNotFindHydratableInstance: () => {},
        didNotFindHydratableContainerInstance: () => {},
        canHydrateInstance: (instance, type, props) => {
            return instance.type.toLowerCase() === type ? instance : null;
        },
        hydrateInstance: (instance, type, props) => {
            return shallowDiff({}, props);
        },
        removeChildFromContainer: () => {},
        commitHydratedContainer: container => {},
        getNextHydratableSibling: instance => {
            return getNextChildren(instance);
        },
        commitMount: () => {}
    };

    const reconciler = Reconciler(HostConfig);

    reconciler.injectIntoDevTools({
        bundleType: 1, // 0 for PROD, 1 for DEV
        version: '0.1.0', // version for your renderer
        rendererPackageName: 'figma-ui-renderer' // package name
    });

    const container = reconciler.createContainer(rootNode, true, true);
    reconciler.updateContainer(element, container);
};
