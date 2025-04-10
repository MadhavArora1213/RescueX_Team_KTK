import React from 'react';

const SOSButton = () => {
    const handleSOS = () => {
        // Logic to send SOS signal
        console.log("SOS signal sent!");
    };

    return (
        <button 
            onClick={handleSOS} 
            className="bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-red-700 transition duration-300"
        >
            Send SOS
        </button>
    );
};

export default SOSButton;