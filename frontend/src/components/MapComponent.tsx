// src/components/MapComponent.tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import mapboxgl from 'mapbox-gl';

// Configure Mapbox token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtLXdhdGZvcmQiLCJhIjoiY20wNjA4NDV3MDQ1dDJqb3F4OTl4cjF5MCJ9.uyyZ9VvLPBdlIU-rm20dXQ';

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  latitude: number;
  longitude: number;
}

const restaurantIcon = L.icon({
  iconUrl: '/restaurant.png', // Path to the PNG image in public folder
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -18],
});

const MapComponent: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: 1,
      name: 'Joe T. Garcia\'s',
      rating: 4.5,
      latitude: 32.754029,
      longitude: -97.346917,
    },
    {
      id: 2,
      name: 'The Capital Grille',
      rating: 4.6,
      latitude: 32.752162,
      longitude: -97.344211,
    },
    {
      id: 3,
      name: 'Lonesome Dove Western Bistro',
      rating: 4.7,
      latitude: 32.752874,
      longitude: -97.343226,
    },
    {
      id: 4,
      name: 'Mercury Chophouse',
      rating: 4.5,
      latitude: 32.751762,
      longitude: -97.347526,
    },
    {
      id: 5,
      name: 'Reata Restaurant',
      rating: 4.4,
      latitude: 32.750104,
      longitude: -97.347863,
    },
  ]);

  return (
    <MapContainer center={[32.7512509, -97.341287]} zoom={16} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
        id='mapbox/streets-v11'
        accessToken={mapboxgl.accessToken}
      />
      {restaurants.map(restaurant => (
        <>
            <Marker
                key={restaurant.id}
                position={[restaurant.latitude, restaurant.longitude]}
                icon={restaurantIcon} // Use custom icon or default based on your condition
            >
                <Popup>
                    <strong>{restaurant.name}</strong><br />
                    Rating: {restaurant.rating}
                </Popup>
            </Marker>
      </>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
