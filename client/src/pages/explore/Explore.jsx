// Explore.jsx
import './explore.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import homeIcon from './exploreImage/home.png';

const Explore = () => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from NASA API
    fetchPlanetsData();
  }, []);

  const fetchPlanetsData = async () => {
    try {
      const response = await axios.get(
        'https://api.le-systeme-solaire.net/rest/bodies/?filter%5B%5D=isPlanet,neq,false'
      );

      const data = response.data.bodies;
      setPlanets(data);
    } catch (error) {
      console.error('Error fetching planets data:', error);
    }
  };

  const planetImages = {
    mercury: 'path/to/mercury-image.jpg',
    venus: 'path/to/venus-image.jpg',
    earth: 'path/to/earth-image.jpg',
    mars: 'path/to/mars-image.jpg',
    jupiter: 'path/to/jupiter-image.jpg',
    saturn: 'path/to/saturn-image.jpg',
    uranus: 'path/to/uranus-image.jpg',
    neptune: 'path/to/neptune-image.jpg',
  };

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
  };

  const handleGoHome = () => {
    
    navigate('/mainPage'); 
  };


  return (
    <div className="explore-background">
      <div className="explore-container">
      <div className="home-icon" onClick={handleGoHome}>
          <img src={homeIcon} alt="Home" />
        </div>
        <div className="planets-list">
          {planets.map((planet) => (
            <button
              key={planet.id}
              className={`planet-button ${selectedPlanet === planet ? 'active' : ''}`}
              onClick={() => handlePlanetClick(planet)}
            >
              {planet.englishName}
            </button>
          ))}
        </div>

        <div className="planet-details">
          {selectedPlanet && (
            <div className="planet-card">
             
              <img
              src={planetImages[selectedPlanet.englishName.toLowerCase()]}
              alt={`${selectedPlanet.englishName}`}
              className="planet-image"
            />
              <p>Mass: {selectedPlanet.mass.massValue} {selectedPlanet.mass.massExponent} kg</p>
              <p>Radius: {selectedPlanet.meanRadius} km</p>
              <p>Density: {selectedPlanet.density} g/cm³</p>
              {/* Add more information here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
