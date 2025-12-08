import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

const reviews = [
    {
        title: "Quick Start with them!",
        name: "Mikel Hassy",
        role: "Developer",
        img: "https://i.pravatar.cc/100?img=1",
        text:
            "I was surprised how fast everything got up and running. Their team guided me from the first step and made sure our goals were perfectly clear. The final result felt polished and exceeded my expectations."
    },
    {
        title: "Content is the king",
        name: "Abraham Hat",
        role: "Designer",
        img: "https://i.pravatar.cc/100?img=2",
        text:
            "Working with this team was genuinely refreshing. They listened carefully to every detail and provided solutions that were creative and practical. I trust them fully for their dedication and honesty throughout the entire journey."
    },
    {
        title: "They made everything easy",
        name: "Sara Andrea",
        role: "Project Manager",
        img: "https://i.pravatar.cc/100?img=3",
        text:
            "Their communication was crystal clear from day one. They delivered ahead of schedule and still helped refine a few final touches. I truly felt like they cared about the outcome just as much as I did."
    },
    {
        title: "Reliable & truly professional",
        name: "John Parker",
        role: "Entrepreneur",
        img: "https://i.pravatar.cc/100?img=4",
        text:
            "Every part of the experience was smooth. They took care of everything and guided me with smart suggestions. I’d love to work with them again without hesitation."
    },
    {
        title: "Quality beyond expectations",
        name: "Lisa Emma",
        role: "Marketing Lead",
        img: "https://i.pravatar.cc/100?img=5",
        text:
            "They transformed our ideas into something more powerful and appealing. Super professional, friendly, and incredibly passionate about what they do."
    },
    {
        title: "Team full of energy",
        name: "Daniel Morris",
        role: "Software Engineer",
        img: "https://i.pravatar.cc/100?img=6",
        text:
            "Amazing people to collaborate with! They brought structure, creativity, and energy into our project. I can confidently say they go beyond expectations and deliver something that genuinely creates impact."
    }
];

const Review = () => {
    return (
        <div className="w-full py-15 bg-gray-50">
            <div className='text-center my-10'>
                <p className='text-secondary text-lg'>Love form clients</p>
                <h2 className='text-primary text-4xl font-bold'>
                    Don't trust our words only.<br />  Take words from readers worldwide
                </h2>
            </div>
            <Swiper
                modules={[EffectCoverflow, Autoplay]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 150,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                autoplay={{ delay: 1500, disableOnInteraction: false }}
                loop={true}
                className="w-[90%] mx-auto"
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm mx-auto h-full flex flex-col justify-between text-center">

                            {/* Title */}
                            <h3 className="text-primary font-semibold mb-3">
                                {review.title}
                            </h3>

                            {/* Review Text */}
                            <p className="text-gray-700 text-[15px] leading-relaxed mb-6">
                                {review.text}
                            </p>

                            {/* User Info */}
                            <div className="flex flex-col items-center">
                                <img
                                    src={review.img}
                                    alt="profile"
                                    className="w-14 h-14 rounded-full mb-3"
                                />
                                <h4 className="font-semibold text-lg">{review.name}</h4>
                                <span className="text-sm text-gray-500">{review.role}</span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Review;
