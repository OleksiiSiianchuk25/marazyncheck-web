import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css'

function SideBar() {
  return (
    <div className="sidebar">
      <Link className='link-sidebar' to="/user">Обліковий запис</Link>
      <Link className='link-sidebar' to="/order-history">Історія замовлень</Link>
      <Link className='link-sidebar' to="/logout">Вийти з аккаунта</Link>
    </div>
  );
}

export default SideBar;
