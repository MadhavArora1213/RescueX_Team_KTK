import React, { createContext, useContext, useState } from 'react';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [mapData, setMapData] = useState({
        agencies: [],
        sosSignals: [],
        userLocation: null,
    });

    const updateAgencies = (newAgencies) => {
        setMapData((prevData) => ({
            ...prevData,
            agencies: newAgencies,
        }));
    };

    const updateSOSSignals = (newSOSSignals) => {
        setMapData((prevData) => ({
            ...prevData,
            sosSignals: newSOSSignals,
        }));
    };

    const setUserLocation = (location) => {
        setMapData((prevData) => ({
            ...prevData,
            userLocation: location,
        }));
    };

    return (
        <MapContext.Provider value={{ mapData, updateAgencies, updateSOSSignals, setUserLocation }}>
            {children}
        </MapContext.Provider>
    );
};

export const useMap = () => {
    return useContext(MapContext);
};