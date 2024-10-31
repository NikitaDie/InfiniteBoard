import * as PIXI from 'pixi.js';

const createDotTexture = (app, dotSize = 1, dotSpacing = 20, chunkSize = 1000) => {
    const dotGraphics = new PIXI.Graphics();

    for (let x = 0; x < chunkSize; x += dotSpacing) {
        for (let y = 0; y < chunkSize; y += dotSpacing) {
            dotGraphics.beginFill(0xFFFFFF); // Color of the dots
            dotGraphics.drawCircle(x, y, dotSize);
            dotGraphics.endFill();
        }
    }

    return app.renderer.generateTexture(dotGraphics, PIXI.SCALE_MODES.NEAREST, 1);
};

export default createDotTexture;
