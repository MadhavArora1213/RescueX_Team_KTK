import React from 'react';
import MapView from '../components/map/MapView';
import SOSButton from '../components/sos/SOSButton';
import ChatBot from '../components/sos/ChatBot';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Home = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome to RescueGrid
                        </h1>
                        <p className="text-lg text-gray-600">
                            AI-Powered Disaster Coordination & Communication Platform
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden h-96">
                                <MapView />
                            </div>
                        </div>
                        
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Emergency Resources
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                                        <div className="bg-red-100 p-2 rounded-full">
                                            <span className="text-red-600 text-xl">🚑</span>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="font-medium">Medical Emergency</h3>
                                            <p className="text-sm text-gray-500">Call: 1-1-2</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                        <div className="bg-blue-100 p-2 rounded-full">
                                            <span className="text-blue-600 text-xl">👮</span>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="font-medium">Police</h3>
                                            <p className="text-sm text-gray-500">Call: 1-0-0</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                                        <div className="bg-yellow-100 p-2 rounded-full">
                                            <span className="text-yellow-600 text-xl">🚒</span>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="font-medium">Fire Department</h3>
                                            <p className="text-sm text-gray-500">Call: 1-0-1</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <SOSButton />
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Emergency Assistant
                        </h2>
                        <ChatBot />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;