import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { MapView } from '../components/map/MapView';
import { AgencyDashboard } from '../components/agency/AgencyDashboard';
import { ChatBot } from '../components/sos/ChatBot';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-red-600 text-white p-4">
                <h1 className="text-xl">Welcome, {user.name}</h1>
            </header>
            <div className="flex flex-1">
                <aside className="w-1/4 bg-gray-200 p-4">
                    <AgencyDashboard />
                </aside>
                <main className="flex-1 p-4">
                    <MapView />
                </main>
            </div>
            <footer className="bg-gray-800 text-white p-4">
                <ChatBot />
            </footer>
        </div>
    );
};

export default Dashboard;