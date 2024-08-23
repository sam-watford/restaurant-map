import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import mapboxgl from 'mapbox-gl';
import './MapComponent.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtLXdhdGZvcmQiLCJhIjoiY20wNjA4NDV3MDQ1dDJqb3F4OTl4cjF5MCJ9.uyyZ9VvLPBdlIU-rm20dXQ';

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  latitude: number;
  longitude: number;
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
  useMapEvents({
    click: (event: L.LeafletMouseEvent) => {
      if (adding) {
        const latlng = event.latlng;
        const newRestaurant: Restaurant = {
          id: Date.now(),
          name: 'New Restaurant',
          rating: 0,
          latitude: latlng.lat,
          longitude: latlng.lng,
        };
        setRestaurants(prevRestaurants => [...prevRestaurants, newRestaurant]);
        setAdding(false);
      }
    },
  });

  return null;
};

const MapComponent: React.FC = () => {
  const [adding, setAdding] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: 1,
      name: 'Fort Worth Food Works',
      rating: 4.9,
      latitude: 32.7624286,
      longitude: -97.3603063,
    },
    {
      id: 2,
      name: 'Toro Toro Fort Worth',
      rating: 4.3,
      latitude: 32.7559487,
      longitude: -97.3324561,
    },
    {
      id: 3,
      name: 'Clay Pigeon Food & Drink',
      rating: 4.6,
      latitude: 32.7589,
      longitude: -97.35608,
    },
    {
      id: 4,
      name: 'Little Red Wasp',
      rating: 4.3,
      latitude: 32.75224,
      longitude: -97.329812,
    },
    {
      id: 5,
      name: 'The Capital Grille',
      rating: 4.8,
      latitude: 32.75247,
      longitude: -97.32992,
    },
    {
      id: 6,
      name: 'GRACE',
      rating: 4.6,
      latitude: 32.7529693,
      longitude: -97.3298985,
    },
    {
      id: 7,
      name: 'Razzoo\'s Cajun Cafe',
      rating: 4.3,
      latitude: 32.7551956,
      longitude: -97.3319475,
    },
    {
      id: 8,
      name: 'Istanbul grill & bar',
      rating: 4.7,
      latitude: 32.754294,
      longitude: -97.3329621,
    },
    {
      id: 9,
      name: 'Reata Restaurant',
      rating: 4.5,
      latitude: 32.7534473,
      longitude: -97.3329569,
    },
    {
      id: 10,
      name: 'Taste Community Restaurant',
      rating: 4.8,
      latitude: 32.7316241,
      longitude: -97.3260727,
    },
    {
      id: 11,
      name: 'Lounge Restaurant & Bar',
      rating: 5,
      latitude: 32.7531907,
      longitude: -97.3336749,
    },
    {
      id: 12,
      name: 'branch & bird',
      rating: 4.4,
      latitude: 32.7524439,
      longitude: -97.332991,
    },
    {
      id: 13,
      name: 'The Social House',
      rating: 4.2,
      latitude: 32.7503734,
      longitude: -97.358536,
    },
    {
      id: 14,
      name: 'Tinies',
      rating: 4.2,
      latitude: 32.742859,
      longitude: -97.325681,
    },
    {
      id: 15,
      name: 'Tia\'s On The Bluff',
      rating: 4.1,
      latitude: 32.7630306,
      longitude: -97.3248859,
    },
  ]);

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
