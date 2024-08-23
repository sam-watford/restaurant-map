import React from 'react';

import './style.css';

const AddRestaurantButton: React.FC<{ onClick: () => void }> = ({
    onClick,
}) => (
    <div className="plus-button-container">
        <button onClick={onClick} className="plus-button">
            +
        </button>
    </div>
);

export default AddRestaurantButton;
