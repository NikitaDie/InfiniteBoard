import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const usePixiApp = (width, height, backgroundColor) => {
    const appRef = useRef(null);

    useEffect(() => {
        const app = new PIXI.Application({
            width,
            height,
            backgroundColor,
        });
        appRef.current = app;

        return () => {
            app.destroy(true, true);
        };
    }, [width, height, backgroundColor]);

    return appRef;
};

export default usePixiApp;
