import React from 'react';
import {Stage} from "@pixi/react";
import InfiniteDotBoard from "./InfiniteDotBoard.jsx";

const PixiCanvas = ({ width, height, options}) => {
    return (
        <Stage width={width} height={height} options={options}>
            <InfiniteDotBoard />
        </Stage>
    );
};

export default PixiCanvas;
