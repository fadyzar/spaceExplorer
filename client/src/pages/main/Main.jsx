
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Explore from '../explore/Explore';
import axios from 'axios';
import { Link } from 'react-router-dom';
import sideBarIcon from './images/menu.png';


import './Main.css';

const Main = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isApodVisible, setApodVisible] = useState(false);
  const [showAsteroids, setShowAsteroids] = useState(false);
  const [isDonkiVisible, setDonkiVisible] = useState(false);
  const [isNasaLibraryVisible, setNasaLibraryVisible] = useState(false); // New state
  const [donkiData, setDonkiData] = useState(null);
  const [asteroidsData, setAsteroidsData] = useState(null);
  const [apodData, setApodData] = useState(null);
  const [nasaLibraryData, setNasaLibraryData] = useState(null);
  

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
      if (isNasaLibraryVisible) {
       
        fetchDataFromNasaLibrary();
      }
    
  }, [isApodVisible, isDonkiVisible,isNasaLibraryVisible]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const showDonki = () => {
    setDonkiVisible(!isDonkiVisible);
  };

 
  const toggleNasaLibrary = () => {
    setNasaLibraryVisible(!isNasaLibraryVisible);
  };

  // const fetchDataFromNasaLibrary = async () => {
  //   try {
  //     // Use the CORS Anywhere proxy to bypass  issues
  //     const nasaLibraryUrl = 'http://localhost:8080/https://images-api.nasa.gov/search?q=moon&media_type=image';

  //     const response = await axios.get(nasaLibraryUrl, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Api-Key': '1OCCdbzFTuOT37Ji7FJu354z1rtY2CyWXdXfsQPM',
  //       },
  //     });

  //     console.log('Request:', response.config);
  //     console.log('Response:', response.data);

  //     // Handle the response data as needed
  //     // ...

  //   } catch (error) {
  //     console.error('Error fetching NASA Library data:', error);

  //     // Handle the error (e.g., show a message to the user)
  //     // ...
  //   }
  // };

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
        {isSidebarOpen ? '' : <img className='sideBarIcon' src={sideBarIcon} alt="sideBarIcon" />}
      </button>
      {isSidebarOpen && <Sidebar onToggleApod={toggleApod} onShowAsteroidsClick={handleShowAsteroidsClick} showDonki={showDonki}  onShowNasaLibraryClick={toggleNasaLibrary}/>}
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


{/* {isNasaLibraryVisible && nasaLibraryData && (
    <div className="nasa-library-container">
      <h2>NASA Image and Video Library</h2>
      <div className="nasa-library-content">
        {nasaLibraryData.map((item) => (
          <div key={item.data[0].nasa_id}>
            <img src={item.links[0].href} alt={item.data[0].title} />
            <p>{item.data[0].title}</p>
          </div>
        ))}
      </div>
    </div>
  )} */}

{isNasaLibraryVisible && nasaLibraryData && (
          <div className="nasa-library-container">
            <h2>NASA Image and Video Library</h2>
            {/* Display NASA Library data as needed */}
          </div>
        )}


          
      </div>
    </div>
  );
};
     

export default Main;
