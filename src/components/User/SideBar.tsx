import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SideBar.css';
import AuthService from '../../services/AuthService';

function SideBar() {
  const navigate = useNavigate();
  const isAdmin = AuthService.isAdmin();

  const handleLogout = () => {
    AuthService.logout(navigate);
  };

  return (
    <div className="sidebar">
      <Link className='link-sidebar' to="/user">Обліковий запис</Link>
      {isAdmin ? (
        <>
          <Link className='link-sidebar' to="/admin/users">Користувачі</Link>
          <Link className='link-sidebar' to="/admin/orders">Замовлення</Link>
          <Link className='link-sidebar' to="/admin/products">Товари</Link>
        </>
      ) : (
        <Link className='link-sidebar' to="/order-history">Історія замовлень</Link>
      )}
      <button className='link-sidebar-button' onClick={handleLogout}>Вийти з аккаунта</button>
    </div>
  );
}

export default SideBar;
