import {createContext, useContext} from 'react';

export const ViewportContext = createContext(null);
export const useViewport = () => useContext(ViewportContext);
