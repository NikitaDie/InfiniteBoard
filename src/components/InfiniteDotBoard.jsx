import React, { useEffect } from 'react';
import { Viewport } from 'pixi-viewport';
import createDotTexture from './createDotTexture';
import { useApp } from '@pixi/react';
import * as PIXI from 'pixi.js';

const InfiniteDotBoard = () => {
    const app = useApp();

    useEffect(() => {

        const viewport = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: 200000,
            worldHeight: 200000,
            events: app.renderer.events
        });

        app.stage.addChild(viewport);

        viewport
            .drag()
            .pinch()
            .wheel();
            //.decelerate();

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
            app.stage.removeChild(viewport);
            viewport.destroy();
        };
    }, [app]);

    return null;
};

export default InfiniteDotBoard;
