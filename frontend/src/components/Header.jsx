import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="header">
      <h1 className="header-title">WorkNow</h1>
      <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default Header;
