// ViewportProvider.js
import { useEffect, useRef } from 'react';
import { Viewport } from 'pixi-viewport';
import { useApp } from '@pixi/react';
import PropTypes from "prop-types";
import { ViewportContext } from '../hooks/useViewport.js';
import CONFIG from "../config.js";
import viewport from "../config.js";

export const ViewportProvider = ({ children, width, height  }) => {
    const app = useApp();
    const viewportRef = useRef(null);

    useEffect(() => {
        console.log("Viewport initialized");
        if (!app) return;

        viewportRef.current = new Viewport({
            screenWidth: width,
            screenHeight: height,
            worldWidth: CONFIG.worldWidth,
            worldHeight: CONFIG.worldHeight,
            events: app.renderer.events
        });

        viewportRef.current.setZoom(1);
        viewportRef.current.moveCenter(viewport.worldWidth / 2, viewport.worldHeight / 2);

        app.stage.addChild(viewportRef.current);

        viewportRef.current
            .drag()
            .pinch()
            .wheel();
        //.decelerate();

        // Cleanup on unmount
        return () => {
            console.log("Cleaning up viewport");
            if (viewportRef.current) {
                app.stage.removeChild(viewportRef.current);
                viewportRef.current.destroy();
                viewportRef.current = null;
            }
        };
    }, [app]);

    return (
        <ViewportContext.Provider value={viewportRef.current}>
            {children}
        </ViewportContext.Provider>
    );
};

// Define propTypes for children
ViewportProvider.propTypes = {
    children: PropTypes.node.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};