// ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../../services/AuthService';

// No additional props are required for this component
const ProtectedRoute: React.FC = () => {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" replace={true} />;
  }

  // Return an Outlet to render protected routes as children
  return <Outlet />;
};

export default ProtectedRoute;
