import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SideBar.css';
import AuthService from '../../services/AuthService';

function SideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout(navigate);
  };

  return (
    <div className="sidebar">
      <Link className='link-sidebar' to="/user">Обліковий запис</Link>
      <Link className='link-sidebar' to="/order-history">Історія замовлень</Link>
      <button className='link-sidebar-button' onClick={handleLogout}>Вийти з аккаунта</button>
    </div>
  );
}

export default SideBar;
