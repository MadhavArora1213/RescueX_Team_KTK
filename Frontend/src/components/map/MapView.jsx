import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap as useMapContext } from '../../hooks/useMap';
import { useAuth } from '../../hooks/useAuth';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Function to create icon with different colors
const createColorIcon = (color) => {
  return L.divIcon({
    className: '',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

// Custom icons using colors instead of images
const agencyIcon = createColorIcon('#3b82f6'); // blue
const sosIcon = createColorIcon('#ef4444');     // red

// Export both as named and default export to be compatible with all imports
export const MapView = ({ height = "100%", width = "100%" }) => {
  const { agencies = [], sosSignals = [], mapCenter = [20.5937, 78.9629], mapZoom = 5 } = useMapContext() || {};
  const { user } = useAuth() || {};

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-gray-200" style={{ height, width }}>
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapController />
        
        {/* Display Agency Markers */}
        {agencies && agencies.map(agency => (
          <Marker 
            key={agency.id} 
            position={[agency.location.latitude, agency.location.longitude]}
            icon={agencyIcon}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{agency.name}</h3>
                <p>Type: {agency.type}</p>
                <p>Status: {agency.status}</p>
                {user && user.role === 'admin' && (
                  <button className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    Contact
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Display SOS Markers */}
        {sosSignals && sosSignals.map(sos => (
          <Marker 
            key={sos.id} 
            position={[sos.location.latitude, sos.location.longitude]}
            icon={sosIcon}
          >
            <Popup>
              <div>
                <h3 className="font-bold text-red-600">SOS Alert</h3>
                <p>Type: {sos.type}</p>
                <p>Status: {sos.status}</p>
                <p>Reported: {new Date(sos.timestamp).toLocaleString()}</p>
                <button className="mt-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                  Respond
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Component to control map view properties
const MapController = () => {
  const map = useMap();
  const { mapCenter, mapZoom } = useMapContext() || {};
  
  useEffect(() => {
    if (mapCenter && mapZoom) {
      map.setView(mapCenter, mapZoom);
    }
  }, [map, mapCenter, mapZoom]);
  
  return null;
};

// Also export as default for consistency
export default MapView;