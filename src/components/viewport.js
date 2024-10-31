import Viewport from 'pixi-viewport';

const createViewport = (app, worldWidth, worldHeight) => {
    const viewport = new Viewport({
        screenWidth: app.view.width,
        screenHeight: app.view.height,
        worldWidth,
        worldHeight,
        interaction: app.renderer.plugins.interaction,
    });

    viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate();

    return viewport;
};

export default createViewport;