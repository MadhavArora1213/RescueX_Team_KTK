import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to the login page, but save the current location they were
    // trying to go to so we can send them there after logging in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the protected component
  return children;
};

export default PrivateRoute;