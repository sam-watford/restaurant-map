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

const MapClickHandler: React.FC<{ adding: boolean; setNewRestaurantPosition: React.Dispatch<React.SetStateAction<L.LatLng | null>>; setAdding: React.Dispatch<React.SetStateAction<boolean>> }> = ({ adding, setNewRestaurantPosition, setAdding }) => {
  useMapEvents({
    click: (event: L.LeafletMouseEvent) => {
      if (adding) {
        setNewRestaurantPosition(event.latlng);
      }
    },
  });

  return null;
};

const MapComponent: React.FC = () => {
  const [adding, setAdding] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [newRestaurantPosition, setNewRestaurantPosition] = useState<L.LatLng | null>(null);
  const [newRestaurant, setNewRestaurant] = useState<Partial<Restaurant>>({
    name: '',
    rating: 0,
    latitude: 0,
    longitude: 0
  });

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

  const handleAddRestaurant = async () => {
    if (newRestaurantPosition) {
      const restaurantData = {
        ...newRestaurant,
        latitude: newRestaurantPosition.lat,
        longitude: newRestaurantPosition.lng
      } as Restaurant;

      if (!newRestaurant.name) {
        return;
      }

      try {
        const response = await axios.post(SERVER_URL, restaurantData);
        if (response.status === 201) {
          setRestaurants(prevRestaurants => [
            ...prevRestaurants,
            { ...restaurantData, id: response.data.id }
          ]);
        } else {
          console.error('Failed to add restaurant:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding restaurant:', error);
      } finally {
        setAdding(false);
        setNewRestaurantPosition(null);
        setNewRestaurant({ name: '', rating: 0 });
      }
    }
  };

  const handleCancel = () => {
    setNewRestaurantPosition(null);
    setNewRestaurant({ name: '', rating: 0 });
    setAdding(false);
  };

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

  const restaurantsOnMap = [...restaurants, newRestaurantPosition ? {
    ...newRestaurant, 
    latitude: newRestaurantPosition.lat,
    longitude: newRestaurantPosition.lng
  } : null];

  return (
    <div className="map-container">
      <MapContainer center={[32.7512509, -97.341287]} zoom={16} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
          id='mapbox/streets-v12'
          accessToken={mapboxgl.accessToken}
        />
        {restaurantsOnMap.map(restaurant => {
            if(!restaurant){
              return null;
            }
            return (
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
            );
          }
        )}
        <UpdateMapUrl />
        <MapClickHandler adding={adding} setNewRestaurantPosition={setNewRestaurantPosition} setAdding={setAdding} />
      </MapContainer>

      {!adding &&
        <div className="form-container">
          <button onClick={() => setAdding(true)} className="plus-button">+</button>
        </div>
      }

      {adding && newRestaurantPosition && (
        <>
          <div className="overlay" />
          <div className="form-popup">
            <div className="form-content">
              <h3>Add New Restaurant</h3>
              <label>
                Name:
                <input 
                  type="text" 
                  value={newRestaurant.name} 
                  onChange={(e) => setNewRestaurant(prev => ({ ...prev, name: e.target.value }))} 
                />
              </label>
              <label>
                Rating:
                <input 
                  type="number" 
                  value={newRestaurant.rating} 
                  onChange={(e) => setNewRestaurant(prev => ({ ...prev, rating: parseFloat(e.target.value) }))} 
                  min="0"
                  max="5"
                />
              </label>
              <button onClick={handleAddRestaurant}>Add Restaurant</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MapComponent;
