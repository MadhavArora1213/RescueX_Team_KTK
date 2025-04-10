import React, { useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapContext } from '../../contexts/MapContext';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
    const { agencies, fetchAgencies } = useContext(MapContext);

    useEffect(() => {
        fetchAgencies();
    }, [fetchAgencies]);

    return (
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {agencies.map((agency) => (
                <Marker key={agency.id} position={[agency.location.lat, agency.location.lng]}>
                    <Popup>
                        <strong>{agency.name}</strong><br />
                        Status: {agency.status}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;