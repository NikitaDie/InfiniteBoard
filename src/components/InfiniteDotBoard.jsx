import React, { useEffect } from 'react';
import { Viewport } from 'pixi-viewport';
import createDotTexture from './createDotTexture';
import { useApp } from '@pixi/react';
import * as PIXI from 'pixi.js';

const InfiniteDotBoard = () => {
    const app = useApp();

    useEffect(() => {
        // Initialize Viewport
        // const viewport = new Viewport({
        //     screenWidth: app.renderer.width,
        //     screenHeight: app.renderer.height,
        //     worldWidth: 20000,
        //     worldHeight: 20000,
        //
        //     interaction: app.renderer.plugins.interaction,
        // });
        //
        // app.stage.addChild(viewport);

        // viewport
        //     .drag()
        //     .pinch()
        //     .wheel()
        //     .decelerate();

        // Create and add dot texture
        const texture = createDotTexture(app);
        console.log('Generated Texture:', texture);
        // const tilingSprite = new PIXI.TilingSprite(
        //     texture,
        //     viewport.worldWidth,
        //     viewport.worldHeight
        // );
        // viewport.addChild(tilingSprite);
        const tilingSprite = new PIXI.TilingSprite(
            texture,
           20000,
            20000
        );
        app.stage.addChild(tilingSprite);

        // Cleanup on unmount
        // return () => {
        //     app.stage.removeChild(viewport);
        //     viewport.destroy();
        // };
    }, [app]);

    return null;
};

export default InfiniteDotBoard;
