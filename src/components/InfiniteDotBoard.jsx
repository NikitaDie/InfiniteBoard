import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import createDotTexture from '../utils/CreateDotTexture.js';
import { useApp } from '@pixi/react';
import { useViewport } from '../hooks/useViewport.js';
import CONFIG from "../config.js";

const InfiniteDotBoard = () => {
    const app = useApp();
    const viewport = useViewport();

    useEffect(() => {
        if (!viewport) return;

        // TODO: check if screen size is changed
        const chunkSize = Math.min(viewport.screenHeight, viewport.screenWidth);

        // Calculating unitSize so that CONFIG.dotsInChunkCount dots can be printed
        const unitSize = Math.floor(chunkSize / CONFIG.dotsInChunkCount);

        // Create and add dot texture
        const texture = createDotTexture(app, unitSize * CONFIG.dotSizeRatio, unitSize);
        const tilingSprite = new PIXI.TilingSprite(
            texture,
            viewport.worldWidth,
            viewport.worldHeight
        );
        viewport.addChild(tilingSprite);

        const texturePool = new Map();

        let actualUnitSize = unitSize;

        viewport.on('zoomed', () => {
            if (viewport.scale.x > CONFIG.viewportMaxScale) viewport.scale.set(CONFIG.viewportMaxScale);
            else if (viewport.scale.x < CONFIG.viewportMinScale) viewport.scale.set(CONFIG.viewportMinScale);

            // Assuming uniform scaling
            const scale = viewport.scale.x;

            // Calculating count of dots that can be currently printed on screen
            const dotsCount = chunkSize / scale / actualUnitSize;

            // Checking if there are too many or too little dots on the screen, as a reason for rerender
            if ((dotsCount >= CONFIG.maximalDotsCount && scale !== CONFIG.viewportMinScale)
                || (dotsCount <= CONFIG.minimalDotsCount && scale !== CONFIG.viewportMaxScale)) {

                const key = Math.floor(scale / CONFIG.texturePoolRatio);

                actualUnitSize = Math.floor(unitSize / scale);

                let newTexture;

                if (texturePool.has(key)) {
                    // Getting already created Texture from Pool
                    newTexture = texturePool.get(key);
                }
                else {
                    // dotSize has maximum one digit after point
                    const dotSize = Math.round(actualUnitSize * CONFIG.dotSizeRatio * 10) / 10;

                    newTexture = createDotTexture(app, dotSize, actualUnitSize);

                    // Adding texture to Pool
                    texturePool.set(key, newTexture);
                }

                tilingSprite.texture = newTexture;
            }
        });

        // Cleanup on unmount
        return () => {
            if (viewport)
                viewport.removeChild(tilingSprite);

            if (tilingSprite)
                tilingSprite.destroy();
        };
    }, [app, viewport]);

    return null;
};

export default InfiniteDotBoard;
