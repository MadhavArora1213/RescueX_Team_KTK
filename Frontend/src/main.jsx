import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { MapProvider } from './contexts/MapContext';
import { EmergencyProvider } from './contexts/EmergencyContext';
import { createTestAccounts } from './utils/testAccounts';

// Create test accounts in development mode
if (import.meta.env.DEV) {
  createTestAccounts();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <MapProvider>
        <EmergencyProvider>
          <App />
        </EmergencyProvider>
      </MapProvider>
    </AuthProvider>
  </BrowserRouter>
);