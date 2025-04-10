import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { MapProvider } from './contexts/MapContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MapProvider>
          <App />
        </MapProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);