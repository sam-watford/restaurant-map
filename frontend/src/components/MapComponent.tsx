import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import mapboxgl from 'mapbox-gl';
import './MapComponent.css';
import axios from 'axios';

// Constants
const SERVER_URL = 'http://localhost:8000/api/restaurants/';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtLXdhdGZvcmQiLCJhIjoiY20wNjA4NDV3MDQ1dDJqb3F4OTl4cjF5MCJ9.uyyZ9VvLPBdlIU-rm20dXQ';

interface Restaurant {
  id?: number;
  name: string;
  rating: number;
  latitude: number;
  longitude: number;
  address?: string;
  image_url?: string;
  image?: string;
}

const restaurantIcon = L.icon({
  iconUrl: '/restaurant.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -18],
});

const UpdateMapUrl: React.FC = () => {
  const map = useMap();
  
  const updateUrl = () => {
    const center = map.getCenter();
    const zoom = map.getZoom();
    const url = `${window.location.origin}/@${center.lat},${center.lng},${zoom}z`;
    window.history.replaceState({}, '', url);
  };

  useEffect(() => {
    updateUrl();
  }, [map]);

  useMapEvents({
    moveend: updateUrl,
  });

  return null;
};

const MapClickHandler: React.FC<{ adding: boolean; setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>; setAdding: React.Dispatch<React.SetStateAction<boolean>> }> = ({ adding, setRestaurants, setAdding }) => {
  const handleMapClick = async (event: L.LeafletMouseEvent) => {
    if (adding) {
      const latlng = event.latlng;
      const newRestaurant: Omit<Restaurant, 'id'> = {
        name: 'New Restaurant',
        rating: 0,
        latitude: latlng.lat,
        longitude: latlng.lng,
      };

      try {
        const response = await axios.post(SERVER_URL, newRestaurant);
        if (response.status === 201) {
          setRestaurants(prevRestaurants => [
            ...prevRestaurants,
            { ...newRestaurant, id: response.data.id }
          ]);
        } else {
          console.error('Failed to add restaurant:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding restaurant:', error);
      } finally {
        setAdding(false);
      }
    }
  };

  useMapEvents({
    click: handleMapClick,
  });

  return null;
};

const MapComponent: React.FC = () => {
  const [adding, setAdding] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    // Fetch restaurants from server
    axios.get(SERVER_URL)
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
      });
  }, []);

  useEffect(() => {
    const mapContainer = document.querySelector('.leaflet-container');
    if (mapContainer) {
      if (adding) {
        mapContainer.classList.add('crosshair-cursor');
      } else {
        mapContainer.classList.remove('crosshair-cursor');
      }
    }
  }, [adding]);

  return (
    <div className="map-container">
      <MapContainer center={[32.7512509, -97.341287]} zoom={16} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
          id='mapbox/streets-v12'
          accessToken={mapboxgl.accessToken}
        />
        {restaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            position={[restaurant.latitude, restaurant.longitude]}
            icon={restaurantIcon}
          >
            <Popup>
              <strong>{restaurant.name}</strong><br />
              Rating: {restaurant.rating}
              <br />
              {restaurant.address && <span>Address: {restaurant.address}</span>}
              {restaurant.image_url && <img src={restaurant.image_url} alt="Restaurant" style={{ width: '100px', height: '100px' }} />}
            </Popup>
          </Marker>
        ))}
        <UpdateMapUrl />
        <MapClickHandler adding={adding} setRestaurants={setRestaurants} setAdding={setAdding} />
      </MapContainer>

      {!adding &&
        <div className="form-container">
          <button onClick={() => setAdding(!adding)} className="plus-button">+</button>
        </div>
      }
    </div>
  );
};

export default MapComponent;
