import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = () => {
  
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (item) => {
    setActiveItem(item); 
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">QuickFix Dashboard</h2>
      <ul className="sidebar-menu">
        <li
          className={`sidebar-item ${activeItem === 'Dashboard' ? 'active' : ''}`}
          onClick={() => handleItemClick('Dashboard')}
        >
          Dashboard
        </li>
        <li
          className={`sidebar-item ${activeItem === 'Tables' ? 'active' : ''}`}
          onClick={() => handleItemClick('Tables')}
        >
          Tables
        </li>
        <li
          className={`sidebar-item ${activeItem === 'Billing' ? 'active' : ''}`}
          onClick={() => handleItemClick('Billing')}
        >
          Billing
        </li>
        <li
          className={`sidebar-item ${activeItem === 'Notifications' ? 'active' : ''}`}
          onClick={() => handleItemClick('Notifications')}
        >
          Notifications
        </li>
        <li
          className={`sidebar-item ${activeItem === 'Profile' ? 'active' : ''}`}
          onClick={() => handleItemClick('Profile')}
        >
          Profile
        </li>
        <li
          className={`sidebar-item ${activeItem === 'Log out' ? 'active' : ''}`}
          onClick={() => handleItemClick('Log out')}
        >
          Log out
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
