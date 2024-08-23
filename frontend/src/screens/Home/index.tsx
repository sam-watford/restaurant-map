import { useEffect } from 'react';
import RestaurantMap from '../../components/RestaurantMap';

const Home = () => {
    useEffect(() => {
        document.title = 'Energy Domain';
    }, []);

    return (
        <RestaurantMap />
    );
};

export default Home;
