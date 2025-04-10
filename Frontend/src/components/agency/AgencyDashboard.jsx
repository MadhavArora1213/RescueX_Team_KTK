import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import MapView from '../map/MapView';
import Heatmap from '../map/Heatmap';
import Chat from '../common/Chat'; // Assuming a Chat component exists for agency communication
import { getAgencyData } from '../../services/api'; // Function to fetch agency data

const AgencyDashboard = () => {
    const { user } = useAuth();
    const [agencyData, setAgencyData] = React.useState(null);

    React.useEffect(() => {
        const fetchAgencyData = async () => {
            const data = await getAgencyData(user.id);
            setAgencyData(data);
        };

        fetchAgencyData();
    }, [user.id]);

    if (!agencyData) {
        return <div>Loading...</div>; // Placeholder for loading state
    }

    return (
        <div className="agency-dashboard">
            <h1 className="text-2xl font-bold">Welcome, {agencyData.name}</h1>
            <div className="map-container">
                <MapView agencyData={agencyData} />
                <Heatmap />
            </div>
            <Chat agencyId={agencyData.id} />
        </div>
    );
};

export default AgencyDashboard;