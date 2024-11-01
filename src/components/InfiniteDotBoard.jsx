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

        const unitSize = Math.floor(chunkSize / 100);

        const dotSize = unitSize * CONFIG.dotSizeRatio;
        const dotSpacing = unitSize * CONFIG.dotSpacingRatio;

        // Create and add dot texture
        const texture = createDotTexture(app, dotSize, dotSpacing);
        const tilingSprite = new PIXI.TilingSprite(
            texture,
            viewport.worldWidth,
            viewport.worldHeight
        );
        viewport.addChild(tilingSprite);

        const minRatio = 0.05;

        const zoomInThreshold = 0.2;
        const zoomOutThreshold = 0.25;

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
                    let newChunkSize = chunkSize / newScale;

                    let unitSize = Math.floor(newChunkSize / 100);

                    // dotSize has maximum one digit after point
                    let dotSize = Math.round(unitSize * CONFIG.dotSizeRatio * 10) / 10;

                    console.log(newScale);

                    newTexture = createDotTexture(app, dotSize, unitSize * CONFIG.dotSpacingRatio);

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
