import {Stage} from "@pixi/react";
import InfiniteDotBoard from "./InfiniteDotBoard.jsx";
import {ViewportProvider} from "./ViewportProvider.jsx";
import PropTypes from "prop-types";

const PixiCanvas = ({ width, height, options}) => {
    return (
        <Stage width={width} height={height} options={options}>
            <ViewportProvider width={width} height={height}>
                <InfiniteDotBoard />
            </ViewportProvider>
        </Stage>
    );
};

PixiCanvas.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    options: PropTypes.shape({
        autoStart: PropTypes.bool, // default: true
        width: PropTypes.number, // default: 800
        height: PropTypes.number, // default: 600
        view: PropTypes.instanceOf(HTMLCanvasElement), // optional
        transparent: PropTypes.bool, // default: false
        autoDensity: PropTypes.bool, // default: false
        antialias: PropTypes.bool, // default: false
        preserveDrawingBuffer: PropTypes.bool, // default: false
        resolution: PropTypes.number, // default: 1
        forceCanvas: PropTypes.bool, // default: false
        backgroundColor: PropTypes.number, // default: 0x000000
        clearBeforeRender: PropTypes.bool, // default: true
        powerPreference: PropTypes.string, // optional
        sharedTicker: PropTypes.bool, // default: false
        sharedLoader: PropTypes.bool, // default: false
        resizeTo: PropTypes.oneOfType([
            PropTypes.instanceOf(Window),
            PropTypes.instanceOf(HTMLElement)
        ]), // optional
    })
};


export default PixiCanvas;
