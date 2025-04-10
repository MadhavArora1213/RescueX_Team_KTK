import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useMap as useMapContext } from '../../hooks/useMap';

const HeatmapLayer = () => {
  const map = useMap();
  const { sosSignals } = useMapContext();
  
  useEffect(() => {
    if (!map || !sosSignals || sosSignals.length === 0) return;

    // Dynamically import leaflet.heat
    import('leaflet.heat').then(() => {
      // Convert SOS signals to heatmap points
      const points = sosSignals.map(sos => {
        // Intensity based on emergency type (can be customized)
        let intensity = 0.5;
        switch(sos.type) {
          case 'fire':
            intensity = 0.9;
            break;
          case 'flood':
            intensity = 0.8;
            break;
          case 'medical':
            intensity = 0.6;
            break;
          default:
            intensity = 0.5;
        }
        
        return [
          sos.location.latitude,
          sos.location.longitude,
          intensity // weight/intensity
        ];
      });

      // Create and add heat layer
      const heatLayer = L.heatLayer(points, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        gradient: {
          0.4: 'blue',
          0.6: 'yellow',
          0.8: 'orange',
          1.0: 'red'
        }
      }).addTo(map);
      
      // Store reference to heatLayer for cleanup
      return () => {
        if (map.hasLayer(heatLayer)) {
          map.removeLayer(heatLayer);
        }
      };
    });
  }, [map, sosSignals]);
  
  return null;
};

const Heatmap = () => {
  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatmapLayer />
    </MapContainer>
  );
};

export default Heatmap;