import React from 'react';
import { useEffect, useState } from 'react';
import { getAgencies, sendAlert } from '../../services/api';
import Button from '../common/Button';

const AdminControls = () => {
    const [agencies, setAgencies] = useState([]);
    const [selectedAgency, setSelectedAgency] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchAgencies = async () => {
            const data = await getAgencies();
            setAgencies(data);
        };
        fetchAgencies();
    }, []);

    const handleSendAlert = async () => {
        if (selectedAgency && alertMessage) {
            await sendAlert(selectedAgency, alertMessage);
            setAlertMessage('');
            alert('Alert sent successfully!');
        } else {
            alert('Please select an agency and enter a message.');
        }
    };

    return (
        <div className="admin-controls">
            <h2 className="text-xl font-bold">Admin Controls</h2>
            <div className="mt-4">
                <label htmlFor="agency-select" className="block mb-2">Select Agency:</label>
                <select
                    id="agency-select"
                    value={selectedAgency}
                    onChange={(e) => setSelectedAgency(e.target.value)}
                    className="border rounded p-2"
                >
                    <option value="">--Select an Agency--</option>
                    {agencies.map((agency) => (
                        <option key={agency.id} value={agency.id}>{agency.name}</option>
                    ))}
                </select>
            </div>
            <div className="mt-4">
                <label htmlFor="alert-message" className="block mb-2">Alert Message:</label>
                <textarea
                    id="alert-message"
                    value={alertMessage}
                    onChange={(e) => setAlertMessage(e.target.value)}
                    className="border rounded p-2 w-full"
                    rows="4"
                />
            </div>
            <Button onClick={handleSendAlert} className="mt-4">Send Alert</Button>
        </div>
    );
};

export default AdminControls;