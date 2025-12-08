import React from 'react';
import bannerImg1 from '../../assets/banner1.jpg'
import bannerImg2 from '../../assets/banner2.jpg'
import bannerImg4 from '../../assets/banner4.jpg'
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className="carousel w-full max-h-130">
            {/* Slide 1 */}
            <div id="slide1" className="carousel-item relative w-full">
                <img src={bannerImg1} className="w-full" alt="Books Banner 1" />

                {/* Bottom Center Button */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <Link to="/allbooks" className="btn btn-secondary btn-lg px-6 py-2 text-white">
                        Explore All Books
                    </Link>
                </div>

                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>

            {/* Slide 2 */}
            <div id="slide2" className="carousel-item relative w-full">
                <img src={bannerImg2} className="w-full" alt="Books Banner 2" />

                {/* Bottom Center Button */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <Link to="/allbooks" className="btn btn-secondary btn-lg px-6 py-2 text-white">
                        Explore All Books
                    </Link>
                </div>

                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>

            {/* Slide 3 */}
            <div id="slide3" className="carousel-item relative w-full">
                <img src={bannerImg4} className="w-full" alt="Books Banner 3" />

                {/* Bottom Center Button */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <Link to="/allbooks" className="btn btn-secondary btn-lg px-6 py-2 text-white">
                        Explore All Books
                    </Link>
                </div>

                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;
