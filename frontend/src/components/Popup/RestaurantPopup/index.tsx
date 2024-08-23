import React from 'react';
import { Popup } from 'react-leaflet';
import Image from '../../../components/Image';
import { IRestaurant } from 'types/Restaurant.type';

import './style.css';

interface RestaurantPopupProps {
    restaurant: IRestaurant;
}

const RestaurantPopup: React.FC<RestaurantPopupProps> = ({ restaurant }) => {
    return (
        <Popup>
            <div className="popup-container">
                <div className="popup-header">{restaurant.name}</div>
                <div className="popup-rating">Rating: {restaurant.rating}</div>
                <div className="popup-coordinates">
                    Lat: {restaurant.latitude.toFixed(7)}, Lng:{' '}
                    {restaurant.longitude.toFixed(7)}
                </div>
                {restaurant.address && (
                    <div className="popup-address">
                        Address: {restaurant.address}
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {restaurant.image_url && (
                        <Image
                            className="popup-image"
                            imageUrl={restaurant.image_url}
                            altText={restaurant.name}
                        />
                    )}
                </div>
            </div>
        </Popup>
    );
};

export default RestaurantPopup;
