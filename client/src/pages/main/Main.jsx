// Main.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
//https://wallpapercave.com/wp/wp3182859.jpg
import './Main.css';

const Main = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? '=' : '='}
      </button>
      {isSidebarOpen && <Sidebar />}
      <div className="main-content">
        <h1>Welcome to Space Explorer</h1>
        <p>Embark on a journey to explore the wonders of the universe!</p>
        {/* Add more space-themed content and components */}
      </div>
    </div>

  );
};

export default Main;
