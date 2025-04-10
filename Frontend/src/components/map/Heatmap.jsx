import React from 'react';
import { MapContainer, TileLayer, HeatmapLayer } from 'react-leaflet';

const Heatmap = ({ sosData }) => {
    const heatmapData = sosData.map(signal => [signal.location.lat, signal.location.lng]);

    return (
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <HeatmapLayer
                points={heatmapData}
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                intensityExtractor={m => 1}
            />
        </MapContainer>
    );
};

export default Heatmap;