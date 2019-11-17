import * as React from 'react';
import {Rectangle, Frame} from "../../../src";

const App = () => {
    const [color, setColor] = React.useState(0);

    return (
        <Frame name="Test frame" width={200}
               height={260}>
            <Rectangle
                width={200}
                height={130}
                y={0}
                backgroundColor={{r: color / 255, g: color / 255, b: color / 255}}/>
            <Rectangle
                width={200}
                height={130}
                y={130}
                backgroundColor={{r: 0.3, g: 0, b: 0.2}}/>
        </Frame>
    );

};

export {App};