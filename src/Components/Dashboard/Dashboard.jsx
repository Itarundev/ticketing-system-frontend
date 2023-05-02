import React, { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
// Sidebar component for user profile and other options
const Sidebar = () => {
  const [active, setActive] = useState('profile'); // Active tab
  const navigate = useNavigate();
  // Tab click handler
  const handleClick = (tab) => {
    setActive(tab);
  }

  return (
    <div className="sidebar">
      <ul>
        <li className={active === 'profile' ? 'active' : ''} onClick={() => handleClick('profile')}>
          <i className="fas fa-user"></i>
          Profile
        </li>
        <li className={active === 'notifications' ? 'active' : ''} onClick={() => handleClick('notifications')}>
          <i className="fas fa-bell"></i>
          Notifications
        </li>
        <li className={active === 'company' ? 'active' : ''} onClick={() =>  navigate("/register-company")}>
          <i className="fas fa-cog"></i>
          Add Company
        </li>
        <li className={active === 'settings' ? 'active' : ''} onClick={() => handleClick('settings')}>
          <i className="fas fa-cog"></i>
          Settings
        </li>
      </ul>
    </div>
  );
}

// Main dashboard component
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to the Dashboard!</h1>
        <p>This is where you can view all of your important information and manage your account.</p>
      </div>
    </div>
  );
}

export default Dashboard;
