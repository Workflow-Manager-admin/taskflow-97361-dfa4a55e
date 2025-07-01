import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// PUBLIC_INTERFACE
const ProtectedRoute = ({ children }) => {
  /**
   * Protected route wrapper that redirects unauthenticated users to login page
   * @param {React.ReactNode} children - Child components to render if authenticated
   * @returns {React.ReactElement} Protected content or redirect
   */
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
