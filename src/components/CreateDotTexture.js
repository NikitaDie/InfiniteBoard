import * as PIXI from 'pixi.js';

const createDotTexture = (app, dotSize = 2, dotSpacing = 20, chunkApproximateSize = 1000) => {
    const UnitSize = dotSize + dotSpacing; //○-dot, □-spacing = a single unit from which texture is formed
    const UnitsInLine = Math.floor(chunkApproximateSize / UnitSize);
    const chunkSize = UnitSize * UnitsInLine;

    const dotGraphics = new PIXI.Graphics();

    for (let x = 0; x < chunkSize; x += dotSpacing) {
        for (let y = 0; y < chunkSize; y += dotSpacing) {
            dotGraphics.beginFill(0xFFFFFF); // Color of the dots
            dotGraphics.drawCircle(x, y, dotSize);
            dotGraphics.endFill();
        }
    }

    const texture = app.renderer.generateTexture(dotGraphics, {
        region: new PIXI.Rectangle(0, 0, 100, 100), // Region to render
        resolution: 2, // Resolution of the texture
        multisample: 8
    });
    console.log('Generated Texture:', texture);
    return texture;
};

export default createDotTexture;
