import React from 'react';
import Banner from './Banner';
import Reviews from './Reviews';
import Brands from './Brands';
import Coverage from '../Coverage/Coverage';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Brands></Brands>
            <Reviews></Reviews>

            <Coverage></Coverage>
        </div>
    );
};

export default Home;