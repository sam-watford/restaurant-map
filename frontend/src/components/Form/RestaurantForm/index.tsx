import React from 'react';

import { IRestaurant } from 'types/Restaurant.type';

import './style.css';

interface AddRestaurantFormProps {
    newRestaurant: IRestaurant;
    setNewRestaurant: React.Dispatch<React.SetStateAction<IRestaurant | null>>;
    onCancel: () => void;
    onSubmit: () => void;
}

const AddRestaurantForm: React.FC<AddRestaurantFormProps> = ({
    newRestaurant,
    setNewRestaurant,
    onCancel,
    onSubmit,
}) => (
    <div className="form-popup">
        <div className="form-content">
            <h3>Add New Restaurant</h3>
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
                />
            </label>
            <label>
                Location: ({newRestaurant.latitude.toFixed(7)},{' '}
                {newRestaurant.longitude.toFixed(7)})
            </label>
            <label>
                Rating:
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                        style={{ marginRight: '10px', flex: 1 }}
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
                        style={{ width: '60px' }}
                    />
                </div>
            </label>
            <div>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onSubmit}>Add Restaurant</button>
            </div>
        </div>
    </div>
);

export default AddRestaurantForm;
