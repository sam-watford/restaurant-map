import React from 'react';
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
}) => (
    <div className="form-popup">
        <div className="form-content">
            <h3 className="form-title">Add New Restaurant</h3>
            <label>
                Name:
                <input
                    type="text"
                    value={newRestaurant.name}
                    onChange={(e) =>
                        setNewRestaurant(
                            (prev) =>
                                ({
                                    ...prev,
                                    name: e.target.value,
                                }) as IRestaurant
                        )
                    }
                    className="form-input"
                    placeholder="Enter restaurant name"
                />
            </label>
            <label>
                Location:{' '}
                <span className="location-coordinates">
                    ({newRestaurant.latitude.toFixed(7)},{' '}
                    {newRestaurant.longitude.toFixed(7)})
                </span>
            </label>
            <label>
                Rating:
                <div className="rating-container">
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={newRestaurant.rating}
                        onChange={(e) =>
                            setNewRestaurant(
                                (prev) =>
                                    ({
                                        ...prev,
                                        rating: parseFloat(
                                            parseFloat(e.target.value).toFixed(
                                                1
                                            )
                                        ),
                                    }) as IRestaurant
                            )
                        }
                        className="rating-range"
                    />
                    <input
                        type="number"
                        value={newRestaurant.rating}
                        onChange={(e) =>
                            setNewRestaurant(
                                (prev) =>
                                    ({
                                        ...prev,
                                        rating: parseFloat(
                                            parseFloat(e.target.value).toFixed(
                                                1
                                            )
                                        ),
                                    }) as IRestaurant
                            )
                        }
                        step="0.1"
                        min="0"
                        max="5"
                        className="rating-input"
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
                    onClick={onSubmit}
                    label="Add Restaurant"
                    className="submit-button"
                />
            </div>
        </div>
    </div>
);

export default RestaurantForm;
