// NasaLibraryPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NasaLibraryPage.css'; 
import homeIcon from '../explore/exploreImage/home.png';

const NasaLibraryPage = () => {
  const [mediaData, setMediaData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataFromNasaLibrary();
  }, []);

  const fetchDataFromNasaLibrary = async () => {
    try {
      const response = await axios.get('https://images-api.nasa.gov/search?q=earth');
      setMediaData(response.data.collection.items || []); // Ensure mediaData is an array
    } catch (error) {
      console.error('Error fetching NASA Library data:', error);
    }
  };

  const handleGoHome = () => {
    
    navigate('/mainPage'); 
  };


  return (
    <div className="nasa-library-page">
          <div className="home-icon" onClick={handleGoHome}>
        <img src={homeIcon} alt="Home" />
      </div>
      <h1>NASA Image Library</h1>
      <div className="media-list">
        {mediaData.length > 0 ? (
          mediaData.map((item) => (
            // Only render if it's an image
            item?.data?.[0]?.media_type === 'image' && (
              <div key={item?.data?.[0]?.nasa_id} className="media-item">
                <img src={item?.links?.[0]?.href} alt={item?.data?.[0]?.title} />
                <p>{item?.data?.[0]?.title}</p>
              </div>
            )
          ))
        ) : (
          <p>No image data available</p>
        )}
      </div>
    </div>
  );
};

export default NasaLibraryPage;
