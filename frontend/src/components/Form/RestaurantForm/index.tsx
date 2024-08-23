import React, { useCallback, useState } from 'react';
import { IRestaurant } from 'types/Restaurant.type';
import Button from '../../../components/Button';
import './style.css';

interface RestaurantFormProps {
    newRestaurant: IRestaurant;
    setNewRestaurant: React.Dispatch<React.SetStateAction<IRestaurant | null>>;
    onCancel: () => void;
    onSubmit: () => void;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({
    newRestaurant,
    setNewRestaurant,
    onCancel,
    onSubmit,
}) => {
    const [error, setError] = useState<string | null>(null);

    const handleNameChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setNewRestaurant(
                (prev) =>
                    ({
                        ...prev,
                        name: e.target.value,
                    }) as IRestaurant
            );
            if (error) {
                setError(null);
            }
        },
        [setNewRestaurant, error]
    );

    const handleRatingChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const rating = parseFloat(parseFloat(e.target.value).toFixed(1));
            setNewRestaurant(
                (prev) =>
                    ({
                        ...prev,
                        rating,
                    }) as IRestaurant
            );
        },
        [setNewRestaurant]
    );

    const handleSubmit = useCallback(() => {
        if (!newRestaurant.name.trim()) {
            setError('Restaurant name cannot be empty.');
        } else {
            onSubmit();
        }
    }, [newRestaurant.name, onSubmit]);

    return (
        <div className="form-popup">
            <div className="form-content">
                <h3 className="form-title">Add New Restaurant</h3>
                <label htmlFor="restaurant-name">
                    Name:
                    {error && <div className="error-message">{error}</div>}
                    <input
                        id="restaurant-name"
                        type="text"
                        value={newRestaurant.name}
                        onChange={handleNameChange}
                        className="form-input"
                        placeholder="Enter restaurant name"
                        aria-required="true"
                    />
                </label>
                <label htmlFor="restaurant-location">
                    Location:{' '}
                    <span
                        id="restaurant-location"
                        className="location-coordinates"
                    >
                        ({newRestaurant.latitude.toFixed(7)},{' '}
                        {newRestaurant.longitude.toFixed(7)})
                    </span>
                </label>
                <label htmlFor="restaurant-rating">
                    Rating:
                    <div className="rating-container">
                        <input
                            id="restaurant-rating-range"
                            type="range"
                            min="0"
                            max="5"
                            step="0.1"
                            value={newRestaurant.rating}
                            onChange={handleRatingChange}
                            className="rating-range"
                        />
                        <input
                            id="restaurant-rating"
                            type="number"
                            value={newRestaurant.rating}
                            onChange={handleRatingChange}
                            step="0.1"
                            min="0"
                            max="5"
                            className="rating-input"
                            aria-required="true"
                        />
                    </div>
                </label>
                <div className="form-buttons">
                    <Button
                        onClick={onCancel}
                        label="Cancel"
                        className="cancel-button"
                    />
                    <Button
                        onClick={handleSubmit}
                        label="Add Restaurant"
                        className="submit-button"
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(RestaurantForm);
