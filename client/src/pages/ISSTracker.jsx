import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import './iss.css';

const ISSTracker = () => {
  const [issLocation, setISSLocation] = useState(null);
  const [crewDetails, setCrewDetails] = useState(null);

  useEffect(() => {
    const fetchISSLocation = async () => {
      try {
        const response = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');
        setISSLocation(response.data);
      } catch (error) {
        console.error('Error fetching ISS location:', error);
      }
    };

    const fetchCrewDetails = async () => {
      try {
        const response = await axios.get('http://api.open-notify.org/astros.json');
        setCrewDetails(response.data);
      } catch (error) {
        console.error('Error fetching ISS crew details:', error);
      }
    };

    fetchISSLocation();
    fetchCrewDetails();

    // Update ISS location every 10 seconds
    const intervalId = setInterval(() => {
      fetchISSLocation();
      fetchCrewDetails();
    }, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="iss-tracker-container">
      <h2>International Space Station (ISS) Tracker</h2>

      <div className="iss-map-container">
        {issLocation && (
          <MapContainer center={[issLocation.latitude, issLocation.longitude]} zoom={3} className="iss-map">
            
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`}
              attribution='<a href="https://www.mapbox.com/attributions">© Mapbox</a> | <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              id="mapbox/streets-v11" 
              accessToken="sk.eyJ1IjoiZmFkeXphcmthIiwiYSI6ImNscm9wNnFjYTFweW8ya2swMHpmbm5xc2oifQ.RQM9uj7xxsxhGITyWrq1hQ" 
            />
            <Marker position={[issLocation.latitude, issLocation.longitude]}>
              <Popup>
                <strong>ISS Current Location</strong>
                <br />
                Latitude: {issLocation.latitude.toFixed(2)}, Longitude: {issLocation.longitude.toFixed(2)}
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>

      {crewDetails && (
        <div className="crew-details">
          <h3>Crew Details</h3>
          <ul>
            {crewDetails.people.map((crewMember) => (
              <li key={crewMember.name}>{crewMember.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ISSTracker;
