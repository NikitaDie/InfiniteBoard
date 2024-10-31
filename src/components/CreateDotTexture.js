import * as PIXI from 'pixi.js';

const createDotTexture = (dotSize = 4, dotSpacing = 20, chunkSize = 1000) => {
    const dotGraphics = new PIXI.Graphics();

    for (let x = 0; x < chunkSize; x += dotSpacing) {
        for (let y = 0; y < chunkSize; y += dotSpacing) {
            dotGraphics.beginFill(0xFFFFFF); // Color of the dots
            dotGraphics.drawCircle(x, y, dotSize);
            dotGraphics.endFill();
        }
    }

    const renderTexture = PIXI.RenderTexture.create({ width: chunkSize, height: chunkSize });
    PIXI.Renderer.shared.render(dotGraphics, renderTexture);

    return renderTexture;
};

export default createDotTexture;
