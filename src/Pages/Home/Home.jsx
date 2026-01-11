import React from 'react';
import Banner from './Banner';
import Reviews from './Reviews';
import Coverage from '../Coverage/Coverage';
import LatestBooksSection from './LatestBooksSection';
import Discount from './Discount';
import WhyChooseBookCourier from './WhyChooseBookCourier';
import Feedback from './Feedback';
import Services from './Services';
import Statistics from './Statistics';
import Testimonials from './Testimonials';
import FAQ from './FAQ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestBooksSection></LatestBooksSection>
            <Services></Services>
            <WhyChooseBookCourier></WhyChooseBookCourier>
            <Statistics></Statistics>
            <Reviews></Reviews>
            <Discount></Discount>
            <Testimonials></Testimonials>
            <FAQ></FAQ>
            <Feedback></Feedback>
            <Coverage></Coverage>
        </div>
    );
};

export default Home;