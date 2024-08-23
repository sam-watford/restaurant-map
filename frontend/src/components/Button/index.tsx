import React from 'react';
import './style.css';

interface ButtonProps {
    onClick: () => void;
    label: string;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    label,
    type = 'button',
    className = '',
}) => {
    return (
        <button type={type} className={`button ${className}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
