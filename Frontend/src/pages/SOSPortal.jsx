import React, { useState } from 'react';
import SOSButton from '../components/sos/SOSButton';
import ChatBot from '../components/sos/ChatBot';

const SOSPortal = () => {
    const [issueType, setIssueType] = useState('');
    const [location, setLocation] = useState('');

    const handleSOSSubmit = () => {
        // Logic to handle SOS submission
        console.log('SOS submitted:', { issueType, location });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Emergency SOS Portal</h1>
            <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="issueType">Select Issue Type:</label>
                <select
                    id="issueType"
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="border rounded p-2"
                >
                    <option value="">--Select an Issue--</option>
                    <option value="Fire">Fire</option>
                    <option value="Medical">Medical Emergency</option>
                    <option value="Flood">Flood</option>
                    <option value="Accident">Accident</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="location">Your Location:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location"
                    className="border rounded p-2 w-64"
                />
            </div>
            <SOSButton onClick={handleSOSSubmit} />
            <ChatBot />
        </div>
    );
};

export default SOSPortal;