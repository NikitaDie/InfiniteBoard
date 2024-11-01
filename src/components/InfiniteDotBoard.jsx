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

        let currentScale = viewport.scale.x;

        // TODO: check if screen size is changed
        const chunkSize = Math.min(viewport.screenHeight, viewport.screenWidth);

        const unitSize = Math.floor(chunkSize / CONFIG.dotsInChunkCount);

        const dotSize = unitSize * CONFIG.dotSizeRatio;

        // Create and add dot texture
        const texture = createDotTexture(app, dotSize, unitSize);
        const tilingSprite = new PIXI.TilingSprite(
            texture,
            viewport.worldWidth,
            viewport.worldHeight
        );
        viewport.addChild(tilingSprite);

        const minRatio = 0.01;

        const zoomInThreshold = 0.2;
        const zoomOutThreshold = 0.08;

        const texturePool = new Map();

        viewport.on('zoomed', () => {
            if (viewport.scale.x > CONFIG.viewportMaxScale) viewport.scale.set(CONFIG.viewportMaxScale);
            else if (viewport.scale.x < CONFIG.viewportMinScale) viewport.scale.set(CONFIG.viewportMinScale);

            const newScale = viewport.scale.x; // Assuming uniform scaling

            const zoomThreshold = newScale >= currentScale ? zoomInThreshold : zoomOutThreshold;

            if (Math.abs(newScale - currentScale) >= zoomThreshold) {

                let key = Math.floor(newScale / minRatio);

                let newTexture;

                if (texturePool.has(key)) {
                    newTexture = texturePool.get(key);
                } else {
                    // Update texture based on new scale
                    const actualUnitSize = Math.floor(unitSize / newScale);

                    // dotSize has maximum one digit after point
                    let dotSize = Math.round(actualUnitSize * CONFIG.dotSizeRatio * 10) / 10;

                    console.log(newScale);

                    newTexture = createDotTexture(app, dotSize, actualUnitSize);

                    texturePool.set(key, newTexture);
                }


                tilingSprite.texture = newTexture;

                // Update the current scale
                currentScale = newScale;
            }
        });

        // Cleanup on unmount
        return () => {
            //viewport.destroy();

            if (viewport)
                viewport.removeChild(tilingSprite);

            if (tilingSprite)
                tilingSprite.destroy();
        };
    }, [app, viewport]);

    return null;
};

export default InfiniteDotBoard;
