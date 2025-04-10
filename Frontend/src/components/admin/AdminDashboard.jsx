import React, { useEffect, useState } from 'react';
import { getAgencies, getSOSHeatmap } from '../../services/api';
import MapView from '../map/MapView';
import AdminControls from './AdminControls';

const AdminDashboard = () => {
    const [agencies, setAgencies] = useState([]);
    const [heatmapData, setHeatmapData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const agencyData = await getAgencies();
            const sosData = await getSOSHeatmap();
            setAgencies(agencyData);
            setHeatmapData(sosData);
        };

        fetchData();
    }, []);

    return (
        <div className="admin-dashboard">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <AdminControls agencies={agencies} />
            <MapView agencies={agencies} heatmapData={heatmapData} />
        </div>
    );
};

export default AdminDashboard;