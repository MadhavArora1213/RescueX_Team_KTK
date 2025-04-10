import React, { createContext, useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../services/firebase';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [agencies, setAgencies] = useState([]);
  const [sosSignals, setSOSSignals] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default to center of India
  const [mapZoom, setMapZoom] = useState(5);

  // Load agencies and SOS signals from Firestore
  useEffect(() => {
    const agenciesQuery = query(collection(db, 'agencies'));
    const sosQuery = query(collection(db, 'sos_signals'));

    const unsubscribeAgencies = onSnapshot(agenciesQuery, (snapshot) => {
      const agenciesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAgencies(agenciesData);
    });

    const unsubscribeSOS = onSnapshot(sosQuery, (snapshot) => {
      const sosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSOSSignals(sosData);
      setLoading(false);
    });

    return () => {
      unsubscribeAgencies();
      unsubscribeSOS();
    };
  }, []);

  // Try to get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          setMapZoom(13);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const value = {
    agencies,
    sosSignals,
    selectedLocation,
    setSelectedLocation,
    mapCenter,
    setMapCenter,
    mapZoom,
    setMapZoom,
    loading
  };

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
};