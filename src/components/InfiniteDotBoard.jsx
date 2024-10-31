import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import createDotTexture from '../utils/CreateDotTexture.js';
import { useApp } from '@pixi/react';
import { useViewport } from '../hooks/useViewport.js';

const InfiniteDotBoard = () => {
    const app = useApp();
    const viewport = useViewport();

    useEffect(() => {
        if (!viewport) return;

        // Create and add dot texture
        const texture = createDotTexture(app);
        const tilingSprite = new PIXI.TilingSprite(
            texture,
            viewport.worldWidth,
            viewport.worldHeight
        );
        viewport.addChild(tilingSprite);

        // Cleanup on unmount
        return () => {
            viewport.removeChild(tilingSprite);
            tilingSprite.destroy();
        };
    }, [app, viewport]);

    return null;
};

export default InfiniteDotBoard;
