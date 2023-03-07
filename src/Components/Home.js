import React, { useState } from 'react';
import AdminSidenav from './AdminSidenav';
import Header from './Header';
import '../CSS/AdminHome.css';

function Home() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('analytics');

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

 

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
