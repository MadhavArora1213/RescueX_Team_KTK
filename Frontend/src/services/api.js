import axios from 'axios';

const API_BASE_URL = 'https://your-backend-api-url.com/api'; // Replace with your backend API URL

// Function to register a new agency
export const registerAgency = async (agencyData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agencies/register`, agencyData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to log in an agency
export const loginAgency = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/agencies/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to send an SOS signal
export const sendSOS = async (sosData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/sos`, sosData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to fetch real-time agency data
export const fetchAgencies = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/agencies`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to fetch SOS signals
export const fetchSOSSignals = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sos`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to update agency status
export const updateAgencyStatus = async (agencyId, statusData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/agencies/${agencyId}/status`, statusData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};