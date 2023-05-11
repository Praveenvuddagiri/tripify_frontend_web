import React, { useEffect, useState } from 'react';
import AdminSidenav from './AdminSidenav';
import Header from './Header';
import '../CSS/AdminHome.css';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import ServiceProviderSidenav from './ServiceProviderSidenav';

function Home() {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState('Place');
  const [role,setRole] = useState('admin');

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const checkTokenExpiry = () => {
    const token = localStorage.getItem('token');

    var decoded = jwt_decode(token);

    if (decoded.exp * 1000 < Date.now()) {
      navigate('/login');
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }

    checkTokenExpiry();

    setRole(JSON.parse(localStorage.getItem('user')).role);

  }, [])



  return (
    <div className="home-container">
      <Header />
      <div className="admin-container">

        {
          role === 'admin' ?
            <AdminSidenav
              selectedMenuItem={selectedMenuItem}
              onMenuItemClick={handleMenuItemClick}
            />
            :
            <ServiceProviderSidenav
              selectedMenuItem={selectedMenuItem}
              onMenuItemClick={handleMenuItemClick}
            />
        }

      </div>
    </div>
  );
}

export default Home;
