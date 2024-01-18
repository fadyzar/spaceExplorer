// Main.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import './Main.css';

const Main = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isApodVisible, setApodVisible] = useState(false);
  const [showAsteroids, setShowAsteroids] = useState(false);
  const [isDonkiVisible, setDonkiVisible] = useState(false);
  const [donkiData, setDonkiData] = useState(null);
  
  const [asteroidsData, setAsteroidsData] = useState(null);
  const [apodData, setApodData] = useState(null);

  useEffect(() => {
    if (isApodVisible) {
      fetchApod();
    }
      fetchAsteroids();
      
      
      if (isDonkiVisible) {
        
        const apiKey = '1OCCdbzFTuOT37Ji7FJu354z1rtY2CyWXdXfsQPM';
        const donkiEndpoint = 'https://api.nasa.gov/DONKI/notifications';
  
        fetch(`${donkiEndpoint}?api_key=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('DONKI Data:', data); 
          setDonkiData(data);
        })
        .catch((error) => console.error('Error fetching DONKI data:', error));
      }
    
  }, [isApodVisible, isDonkiVisible]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const showDonki = () => {
    setDonkiVisible(!isDonkiVisible);
  };


  const handleShowAsteroidsClick = async () => {
    try {
      if (!showAsteroids) {
        // Make a request to the Asteroids - NeoWs API
        const response = await axios.get(
          "https://api.nasa.gov/neo/rest/v1/feed/today?api_key=1OCCdbzFTuOT37Ji7FJu354z1rtY2CyWXdXfsQPM"
        );

        // Extract relevant data from the response
        const data = response.data;
        setAsteroidsData(data);
      } else {
        // Hide Asteroids data
        setAsteroidsData(null);
      }

      // Toggle the state for showing/hiding Asteroids
      setShowAsteroids(!showAsteroids);
    } catch (error) {
      console.error("Error fetching Asteroids data:", error.message);
    }
  };

  const toggleApod = () => {
    setApodVisible(!isApodVisible);
  };

  const fetchApod = async () => {
    try {
      const response = await axios.get(
        'https://api.nasa.gov/planetary/apod?api_key=1OCCdbzFTuOT37Ji7FJu354z1rtY2CyWXdXfsQPM'
      );
      setApodData(response.data);
    } catch (error) {
      console.error('Error fetching APOD:', error);
    }
  };
  const fetchAsteroids = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?api_key=1OCCdbzFTuOT37Ji7FJu354z1rtY2CyWXdXfsQPM`
      );
      // Extracting asteroid data from the response, adjust as needed
      setAsteroidsData(response.data.near_earth_objects);
    } catch (error) {
      console.error('Error fetching Asteroids - NeoWs:', error);
    }
  };

  return (
    <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar} >
        {isSidebarOpen ? '' : '🌎'}
      </button>
      {isSidebarOpen && <Sidebar onToggleApod={toggleApod} onShowAsteroidsClick={handleShowAsteroidsClick} showDonki={showDonki}/>}
      <div className="main-content">
        <h1>Welcome to Space Explorer</h1>
        <p>Embark on a journey to explore the wonders of the universe!</p>

        {isApodVisible && (
          <div className="apod-container">
            
            {apodData ? (
              <>
                <h2>{apodData.title}</h2>
                <img src={apodData.url} alt={apodData.title} />
                <p className='pOfExp'>{apodData.explanation}</p>
              </>
            ) : (
              <p>Error loading APOD</p>
            )}
          </div>
        )}
      {/* Show Asteroids Data */}
      {showAsteroids && asteroidsData && (
          <div className="asteroids-container">
            <h2>Asteroids Near Earth Today</h2>
            <table className="asteroids-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Is Potentially Hazardous</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(asteroidsData.near_earth_objects).map((date) => (
                  <React.Fragment key={date}>
                    {asteroidsData.near_earth_objects[date].map((asteroid) => (
                      <tr key={asteroid.id}>
                        <td>{asteroid.name}</td>
                        <td>
                          {asteroid.is_potentially_hazardous_asteroid
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
{isDonkiVisible && (
  <div className="donki-container">
    <h2>Space Weather Notifications</h2>
    <table className="donki-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Message Type</th>
          <th>Message ID</th>
          <th>Message URL</th>
          <th>Message Issue Time</th>
          <th>Message Body</th>
        </tr>
      </thead>
      <tbody>
        {donkiData && donkiData.map((notification) => (
          <tr key={notification.messageID}>
            <td>{notification.messageIssueTime}</td>
            <td>{notification.messageType}</td>
            <td>{notification.messageID}</td>
            <td>
              <a href={notification.messageURL} target="_blank" rel="noopener noreferrer">
                View Details
              </a>
            </td>
            <td>{notification.messageIssueTime}</td>
            <td className='messageBodyScroll'>{notification.messageBody}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}



          
      </div>
    </div>
  );
};
     

export default Main;
