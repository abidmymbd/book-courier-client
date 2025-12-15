import React from 'react';
import Banner from './Banner';
import Reviews from './Reviews';
import Coverage from '../Coverage/Coverage';
import LatestBooksSection from './LatestBooksSection';
import Discount from './Discount';
import WhyChooseBookCourier from './WhyChooseBookCourier';
import Feedback from './Feedback';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestBooksSection></LatestBooksSection>
            <WhyChooseBookCourier></WhyChooseBookCourier>
            <Reviews></Reviews>
            <Discount></Discount>
            <Feedback></Feedback>
            <Coverage></Coverage>
        </div>
    );
};

export default Home;