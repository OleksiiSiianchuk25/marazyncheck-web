import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const AdminRoute: React.FC = () => {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" replace={true} />;
  } else if (!AuthService.isAdmin()) {
      return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};

export default AdminRoute;
