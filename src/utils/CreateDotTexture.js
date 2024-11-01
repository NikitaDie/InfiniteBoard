import * as PIXI from 'pixi.js';

const createDotTexture = (app, dotSize = 2, dotSpacing = 13, chunkApproximateSize = 1000) => {
    const unitSize = dotSize + dotSpacing; //○-dot, □-spacing = a single unit from which texture is formed
    const unitCount = Math.floor(chunkApproximateSize / unitSize);
    const chunkSize = unitSize * unitCount;

    const dotGraphics = new PIXI.Graphics();

    dotGraphics.beginFill(0xC4C4C4); // Color of the dots

    for (let x = 0; x <= chunkSize; x += unitSize) {
        for (let y = 0; y <= chunkSize; y += unitSize) {
            dotGraphics.drawCircle(x, y, dotSize);
        }
    }

    dotGraphics.endFill();

    const texture = app.renderer.generateTexture(dotGraphics, {
        region: new PIXI.Rectangle(0, 0, chunkSize, chunkSize), // Region to render
        resolution: 2,
        multisample: 8
    });
    console.log('Generated Texture:', texture);
    return texture;
};

export default createDotTexture;
