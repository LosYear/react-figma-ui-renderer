import * as React from 'react';
import {Rectangle, Frame} from "../../../src";
import {useEffect} from "react";

const range = Array(100).fill(0).map((_, i) => i);

const App = () => {
    // Play with it to simulate multiple commitUpdate
    const [color, setColor] = React.useState(100);
    const count = range.length;

    // useEffect(() => {
    //     setTimeout(() => {
    //         setColor((color + 10) % 255);
    //     }, 20);
    // });

    return (
        <Frame width={50 * (count / 10) * 2} height={50 * (count / 10)}>
            <Frame name="Test frame" height={50 * (count / 10)}
                   width={50 * (count / 10)}>
                {range.map(i =>
                    <Rectangle
                        key={i}
                        width={50}
                        height={50}
                        name={i.toString()}
                        x={i % 10 * 50}
                        y={Math.floor(i / 10) * 50}
                        backgroundColor={{
                            r: ((i * 10 + color) % 255) / 255,
                            g: ((i * 5 + color) % 255) / 255,
                            b: ((i * 20 + color) % 255) / 255
                        }}/>)}
            </Frame>
            <Frame x={500} y={0} name="Test frame" height={50 * (count / 10)}
                   width={50 * (count / 10)}>
                {range.map(i =>
                    <Rectangle
                        key={i}
                        width={50}
                        height={50}
                        name={i.toString()}
                        x={i % 10 * 50}
                        y={Math.floor(i / 10) * 50}
                        backgroundColor={{
                            r: ((i * 10 + color) % 255) / 255,
                            g: ((i * 5 + color) % 255) / 255,
                            b: ((i * 20 + color) % 255) / 255
                        }}/>)}
            </Frame>
        </Frame>
    );

};

export {App};