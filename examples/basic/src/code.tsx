import BridgeHandler from "../../../src/BridgeHandler";

(async () => {
    const bridgeHandler = new BridgeHandler();
    figma.ui.onmessage = (msg) =>  bridgeHandler.onMessage(msg);
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
    figma.showUI(__html__);
})();
