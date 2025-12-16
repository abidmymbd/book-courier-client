import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import amazon from '../../assets/brands/amazon.png';
import amazon_vector from '../../assets/brands/amazon_vector.png';
import casio from '../../assets/brands/casio.png';
import moonstar from '../../assets/brands/moonstar.png';
import randstad from '../../assets/brands/randstad.png';
import star from '../../assets/brands/star.png';
import start_people from '../../assets/brands/start_people.png';

const brandLogos = [amazon, amazon_vector, casio, moonstar, randstad, star, start_people];

const Brands = () => {
    return (
        <div className="w-full my-20">
            <div className='text-center my-10'> <p className='text-secondary text-lg'>Featured by companies</p> <h2 className='text-primary text-4xl font-bold'>Explore the most appropriate ultimate reward. <br /> Let’s get started</h2> </div>
            <Swiper
                slidesPerView={6}
                spaceBetween={60}
                loop={true}
                grabCursor={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                modules={[Autoplay]}
            >
                {brandLogos.map((logo, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center">
                        <img src={logo} alt={`brand-${index}`} className="object-contain" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Brands;
