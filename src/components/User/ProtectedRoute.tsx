import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const ProtectedRoute: React.FC = () => {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
