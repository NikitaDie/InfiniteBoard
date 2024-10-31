import { useRef, useEffect } from 'react';
import usePixiApp from './usePixiApp';
import createDotTexture from './CreateDotTexture.js';
import createViewport from './viewport';
import * as PIXI from 'pixi.js';

const InfiniteDotBoard = () => {
    const pixiContainerRef = useRef(null);
    const appRef = usePixiApp(window.innerWidth, window.innerHeight, 0x000000);

    useEffect(() => {
        const app = appRef.current;
        if (!app || !pixiContainerRef.current) return;

        // Append the Pixi view to the container
        pixiContainerRef.current.appendChild(app.view);

        // Create viewport and add it to the stage
        const viewport = createViewport(app, 10000, 10000);
        app.stage.addChild(viewport);

        // Create dot texture and apply it as a TilingSprite
        const dotTexture = createDotTexture();
        const dotPattern = new PIXI.TilingSprite(dotTexture, viewport.worldWidth, viewport.worldHeight);
        viewport.addChild(dotPattern);

        // Resize handler
        const onResize = () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
            viewport.resize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', onResize);
            app.destroy(true, true);
        };
    }, [appRef]);

    return <div ref={pixiContainerRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default InfiniteDotBoard;
