import React, { useEffect } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
    'pk.eyJ1Ijoic2FtLXdhdGZvcmQiLCJhIjoiY20wNjA4NDV3MDQ1dDJqb3F4OTl4cjF5MCJ9.uyyZ9VvLPBdlIU-rm20dXQ';

import AddRestaurantButton from '../Button/AddRestaurantButton';
import AddRestaurantForm from '../Form/AddRestaurantForm';
import { IRestaurant } from 'types/Restaurant.type';

import 'leaflet/dist/leaflet.css';
import './style.css';

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

const MapClickHandler: React.FC<{
    isAdding: boolean;
    setNewRestaurant: React.Dispatch<React.SetStateAction<IRestaurant | null>>;
}> = ({ isAdding, setNewRestaurant }) => {
    useMapEvents({
        click: (event: L.LeafletMouseEvent) => {
            if (isAdding) {
                setNewRestaurant({
                    name: '',
                    rating: 0,
                    latitude: event.latlng.lat,
                    longitude: event.latlng.lng,
                });
            }
        },
    });

    return null;
};

interface RestaurantMapProps {
    restaurants: IRestaurant[];
    isAdding: boolean;
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
    newRestaurant: IRestaurant | null;
    setNewRestaurant: React.Dispatch<React.SetStateAction<IRestaurant | null>>;
    handleAddRestaurant: () => void;
    handleAddRestaurantCancel: () => void;
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({
    restaurants,
    isAdding,
    setIsAdding,
    newRestaurant,
    setNewRestaurant,
    handleAddRestaurant,
    handleAddRestaurantCancel,
}) => {
    useEffect(() => {
        const mapContainer = document.querySelector('.leaflet-container');
        if (mapContainer) {
            if (isAdding) {
                mapContainer.classList.add('crosshair-cursor');
            } else {
                mapContainer.classList.remove('crosshair-cursor');
            }
        }
    }, [isAdding]);

    const restaurantsOnMap = [...restaurants, newRestaurant];

    return (
        <div className="map-container">
            <MapContainer
                center={[32.7512509, -97.341287]}
                zoom={16}
                style={{ height: '100vh', width: '100%' }}
            >
                <TileLayer
                    url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
                    id="mapbox/streets-v12"
                    accessToken={mapboxgl.accessToken}
                />
                {restaurantsOnMap.map((restaurant) => {
                    if (!restaurant) {
                        return null;
                    }
                    return (
                        <Marker
                            key={restaurant.id}
                            position={[
                                restaurant.latitude,
                                restaurant.longitude,
                            ]}
                            icon={restaurantIcon}
                        >
                            <Popup>
                                <strong>{restaurant.name}</strong>
                                <br />
                                Rating: {restaurant.rating}
                                <br />
                                {restaurant.address && (
                                    <span>Address: {restaurant.address}</span>
                                )}
                                {restaurant.image_url && (
                                    <img
                                        src={restaurant.image_url}
                                        alt="Restaurant"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                        }}
                                    />
                                )}
                            </Popup>
                        </Marker>
                    );
                })}
                <UpdateMapUrl />
                <MapClickHandler
                    isAdding={isAdding}
                    setNewRestaurant={setNewRestaurant}
                />
            </MapContainer>

            {!isAdding && (
                <AddRestaurantButton onClick={() => setIsAdding(true)} />
            )}

            {isAdding && newRestaurant && (
                <AddRestaurantForm
                    newRestaurant={newRestaurant}
                    setNewRestaurant={setNewRestaurant}
                    onSubmit={handleAddRestaurant}
                    onCancel={handleAddRestaurantCancel}
                />
            )}
        </div>
    );
};

export default RestaurantMap;
