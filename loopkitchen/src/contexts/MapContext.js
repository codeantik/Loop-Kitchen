import React, { useState } from 'react';


export const MapContext = React.createContext();

export const MapProvider = ({ children }) => {
    const [maps, setMaps] = useState([]);

    console.log(maps)
    return (
        <MapContext.Provider value={{ maps, setMaps }}>
            {children}
        </MapContext.Provider>
    )
}
