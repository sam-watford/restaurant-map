import React, { useState, useEffect } from 'react';
import RestaurantMap from './RestaurantMap';
import axios from 'axios';
import { IRestaurant } from 'types/Restaurant.type';

// Constants
const SERVER_URL = 'http://localhost:8000/api/restaurants/';

const Home: React.FC = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    const [newRestaurant, setNewRestaurant] = useState<IRestaurant | null>(
        null
    );

    useEffect(() => {
        axios
            .get(SERVER_URL)
            .then((response) => {
                setRestaurants(response.data);
            })
            .catch((error) => {
                console.error('Error fetching restaurants:', error);
            });
    }, []);

    const handleAddRestaurant = async () => {
        if (newRestaurant) {
            if (!newRestaurant.name) {
                return;
            }

            try {
                const response = await axios.post(SERVER_URL, newRestaurant);
                if (response.status === 201) {
                    setRestaurants((prevRestaurants) => [
                        ...prevRestaurants,
                        { ...newRestaurant, id: response.data.id },
                    ]);
                } else {
                    console.error(
                        'Failed to add restaurant:',
                        response.statusText
                    );
                }
            } catch (error) {
                console.error('Error adding restaurant:', error);
            } finally {
                handleAddRestaurantCancel();
            }
        }
    };

    const handleAddRestaurantCancel = () => {
        setIsAdding(false);
        setNewRestaurant(null);
    };

    return (
        <RestaurantMap
            restaurants={restaurants}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            newRestaurant={newRestaurant}
            setNewRestaurant={setNewRestaurant}
            handleAddRestaurant={handleAddRestaurant}
            handleAddRestaurantCancel={handleAddRestaurantCancel}
        />
    );
};

export default Home;
