import * as PIXI from 'pixi.js';
import CONFIG from "../config.js";

const createDotTexture = (app, dotSize = 2, unitSize = 30) => {
    const dotGraphics = new PIXI.Graphics();

    // Color of the dots
    dotGraphics.beginFill(CONFIG.backgroundDotsColor);
    dotGraphics.drawRect(0, 0, dotSize, dotSize);
    dotGraphics.endFill();

    return app.renderer.generateTexture(dotGraphics, {
        region: new PIXI.Rectangle(0, 0, unitSize, unitSize),
        resolution: 8,
        multisample: 16,
        scaleMode: PIXI.SCALE_MODES.NEAREST,
    });
};

export default createDotTexture;
