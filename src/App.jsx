import './App.css';
import PixiCanvas from "./components/PixiCanvas.jsx";
import useMemoryUsage from "./hooks/useMemoryUsage.js";

const App = () => {
    const memoryUsage = useMemoryUsage();

    const bytesToMB = (bytes) => (bytes / 1024 / 1024).toFixed(2);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <PixiCanvas
                width={window.innerWidth}
                height={window.innerHeight}
                options={{ backgroundColor: 0xFFFFFF }}
            />
            {memoryUsage !== null && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    color: 'black', // Change to black for better visibility on white background
                    padding: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)' // Change to white with some transparency
                }}>
                    Memory Usage: {bytesToMB(memoryUsage)} MB
                </div>
            )}
        </div>
    );
}

export default App;
