import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingAnimation from './components/common/LoadingAnimation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SOSPortal from './pages/SOSPortal';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/auth/PrivateRoute';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

const App = () => {
  const [loading, setLoading] = useState(true);
  
  // Handle any initial data loading if needed
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingAnimation onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sos" element={<SOSPortal />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;