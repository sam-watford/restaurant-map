import React from 'react';

import './style.css';

const FloatingActionButton: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
}> = ({ onClick, children }) => (
    <div className="floating-action-button-container">
        <button onClick={onClick} className="floating-action-button">
            {children}
        </button>
    </div>
);

export default FloatingActionButton;
