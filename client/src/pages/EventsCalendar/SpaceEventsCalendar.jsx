// SpaceEventsCalendar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SpaceEventsCalendar.css'; 
import { useNavigate } from 'react-router-dom';
import homeIcon from '../explore/exploreImage/home.png';

const SpaceEventsCalendar = () => {
  const [launchesData, setLaunchesData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUpcomingLaunches();
  }, []);

  const fetchUpcomingLaunches = async () => {
    try {
      const response = await axios.get('https://api.spacexdata.com/v4/launches/upcoming');
      setLaunchesData(response.data);
    } catch (error) {
      console.error('Error fetching upcoming launches data:', error);
      setError(error.message); // Set the error state
    }
  };

  const handleGoHome = () => {
    navigate('/mainPage')
  };


  return (
    <div className="space-events-calendar">
      <div className="home-icon" onClick={handleGoHome}>
        <img src={homeIcon} alt="Home" />
      </div>
      <h1>Upcoming SpaceX Launches Calendar</h1>
      {error && <p>Error: {error}</p>}
      <div className="launch-table-container">
        <table className="launch-table">
        <thead>
          <tr className="launch-item">
            <th>Name</th>
            <th>Date</th>
            <th>Rocket</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {launchesData.map((launch, index) => (
            <tr key={index} className="launch-item">
              <td>
                <h2>{launch.name}</h2>
              </td>
              <td>{new Date(launch.date_utc).toLocaleString()}</td>
              <td>{launch.rocket}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default SpaceEventsCalendar;
