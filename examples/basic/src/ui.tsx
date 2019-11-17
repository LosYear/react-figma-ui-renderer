const {connectToDevTools} = require('react-devtools-core');
connectToDevTools({
    isAppActive() {
        // Don't steal the DevTools from currently active app.
        return true;
    },
    host: 'localhost',
    port: 8097,
    resolveRNStyle: null, // TODO maybe: require('flattenStyle')
});


import * as React from 'react';
import { render } from '../../../src/';
import { App } from './App';

(() => {
    render(<App/>, '');
})();
