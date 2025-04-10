import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MapProvider } from './contexts/MapContext';
import LoadingAnimation from './components/common/LoadingAnimation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SOSPortal from './pages/SOSPortal';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

const App = () => {
  const [loading, setLoading] = useState(true);
  
  // Handle any initial data loading if needed
  useEffect(() => {
    // You could load any initial data here
    // For now, we're just using our loading animation
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoadingAnimation onLoadingComplete={handleLoadingComplete} />
      ) : (
        <AuthProvider>
          <MapProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex flex-grow">
                  <Sidebar />
                  <main className="flex-grow p-4">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/sos" element={<SOSPortal />} />
                    </Routes>
                  </main>
                </div>
                <Footer />
              </div>
            </Router>
          </MapProvider>
        </AuthProvider>
      )}
    </>
  );
};

export default App;