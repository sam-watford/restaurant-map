import React from 'react';

interface RestaurantImageProps {
    className: string;
    imageUrl: string;
    altText: string;
}

const RestaurantImage: React.FC<RestaurantImageProps> = ({
    className,
    imageUrl,
    altText,
}) => {
    if (!imageUrl) return null;

    return <img className={className} src={imageUrl} alt={altText} />;
};

export default RestaurantImage;
