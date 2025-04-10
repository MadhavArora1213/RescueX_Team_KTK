import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Agency data
export const getAgencyData = async (agencyId) => {
  try {
    const response = await api.get(`/agency/${agencyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching agency data:', error);
    throw error;
  }
};

// SOS signals
export const createSOSSignal = async (sosData) => {
  try {
    const response = await api.post('/sos', sosData);
    return response.data;
  } catch (error) {
    console.error('Error creating SOS signal:', error);
    throw error;
  }
};

export const getSOSSignals = async () => {
  try {
    const response = await api.get('/sos');
    return response.data;
  } catch (error) {
    console.error('Error fetching SOS signals:', error);
    throw error;
  }
};

export default api;