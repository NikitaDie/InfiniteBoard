import './App.css'
import PixiCanvas from "./components/PixiCanvas.jsx";

const App = () => (
    <div style={{ width: '100vw', height: '100vh' }}>
        <PixiCanvas
            width={window.innerWidth}
            height={window.innerHeight}
            options={{ backgroundColor: 0x000000 }}
        />
    </div>
);

export default App
