import React from 'react';
import { MapView } from '../components/map/MapView';
import { SOSButton } from '../components/sos/SOSButton';
import { ChatBot } from '../components/sos/ChatBot';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

const Home = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow">
                <MapView />
                <SOSButton />
                <ChatBot />
            </main>
            <Footer />
        </div>
    );
};

export default Home;