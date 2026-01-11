
import React from 'react';
import { FaStar, FaTrophy } from 'react-icons/fa';

const bestWriter = {
    name: "Rashed Alam",
    role: "Author of the Month",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    bio: "Rashed Alam has contributed 15 books this month with an average rating of 4.9 stars. His works on modern literature have been highly requested and reviewed by our users.",
    rating: 5,
    achievement: "Best Writer of the Month – January 2026"
};

const Testimonials = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="text-center mb-12">
                <p className="text-secondary text-lg">Spotlight</p>
                <h2 className="text-primary text-4xl font-bold">Best Writer of the Month</h2>
            </div>

            <div className="max-w-xl mx-auto bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 text-center">
                <div className="flex justify-center mb-4">
                    <img
                        src={bestWriter.image}
                        alt={bestWriter.name}
                        className="w-24 h-24 rounded-full border-4 border-primary"
                    />
                </div>

                <h3 className="text-2xl font-bold text-gray-800">{bestWriter.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{bestWriter.role}</p>

                <div className="flex justify-center mb-4">
                    {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                            key={i}
                            className={`mr-1 ${i < bestWriter.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                    ))}
                </div>

                <p className="text-gray-600 mb-4">{bestWriter.bio}</p>

                <div className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-full font-semibold">
                    <FaTrophy className="mr-2" />
                    {bestWriter.achievement}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;