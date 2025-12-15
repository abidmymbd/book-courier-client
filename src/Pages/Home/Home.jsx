import React from 'react';
import Banner from './Banner';
import Reviews from './Reviews';
import Brands from './Brands';
import Coverage from '../Coverage/Coverage';
import LatestBooksSection from './LatestBooksSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestBooksSection></LatestBooksSection>
            <Reviews></Reviews>

            <Coverage></Coverage>
        </div>
    );
};

export default Home;