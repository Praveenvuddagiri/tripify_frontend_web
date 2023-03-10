import React, { useEffect, useState } from 'react';
import AdminSidenav from './AdminSidenav';
import Header from './Header';
import '../CSS/AdminHome.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState('analytics');

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  useEffect(()=>{
    if(!localStorage.getItem('user')){
      navigate('/login');
    }
  },[])

 

  return (
    <div className="home-container">
      <Header />
      <div className="admin-container">
        <AdminSidenav
          selectedMenuItem={selectedMenuItem}
          onMenuItemClick={handleMenuItemClick}
        />
      </div>
    </div>
  );
}

export default Home;
