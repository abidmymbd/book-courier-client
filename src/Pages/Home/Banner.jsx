import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

import bannerImg1 from '../../assets/banner1.jpg';
import bannerImg2 from '../../assets/banner2.jpg';
import bannerImg4 from '../../assets/banner4.jpg';

const slides = [bannerImg1, bannerImg2, bannerImg4];

const Banner = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    return (
        <div className="relative w-full h-[70vh] min-h-[400px] max-h-[700px] overflow-hidden">
            {/* SLIDE IMAGE */}
            <AnimatePresence mode="wait">
                <motion.img
                    key={current}
                    src={slides[current]}
                    alt="Books banner"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                />
            </AnimatePresence>

            {/* CTA BUTTON */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40">
                <Link
                    to="/books"
                    className="my-10 py-2 px-10 border border-secondary rounded-lg text-white font-bold bg-secondary hover:text-secondary hover:bg-transparent hover:border-secondary transform transition duration-300"
                >
                    Explore All Books
                </Link>
            </div>

            {/* LEFT / RIGHT NAVIGATION */}
            <div className="absolute inset-y-0 left-5 right-5 flex items-center justify-between z-30 pointer-events-none">
                <button
                    onClick={prevSlide}
                    className="btn btn-circle pointer-events-auto"
                    aria-label="Previous slide"
                >
                    ❮
                </button>
                <button
                    onClick={nextSlide}
                    className="btn btn-circle pointer-events-auto"
                    aria-label="Next slide"
                >
                    ❯
                </button>
            </div>
        </div>
    );
};

export default Banner;
