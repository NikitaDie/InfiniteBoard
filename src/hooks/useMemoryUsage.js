// useMemoryUsage.js
import { useEffect, useState } from 'react';

const useMemoryUsage = () => {
    const [memoryUsage, setMemoryUsage] = useState(null);

    useEffect(() => {
        const updateMemoryUsage = () => {
            if (performance.memory) {
                setMemoryUsage(performance.memory.usedJSHeapSize); // Get memory usage in bytes
            }
        };

        const intervalId = setInterval(updateMemoryUsage, 1000); // Update memory usage every second

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return memoryUsage;
};

export default useMemoryUsage;
