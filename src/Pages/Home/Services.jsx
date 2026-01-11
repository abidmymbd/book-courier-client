import React from 'react';
import {
    FaTruck,
    FaExchangeAlt,
    FaSearch,
    FaUserShield,
    FaClock,
    FaHeart
} from 'react-icons/fa';

const Services = () => {
    const services = [
        {
            icon: <FaTruck className="text-4xl text-primary mb-4" />,
            title: "Doorstep Book Delivery",
            description:
                "Get library books delivered directly to your home without the hassle of traveling.",
        },
        {
            icon: <FaExchangeAlt className="text-4xl text-primary mb-4" />,
            title: "Book Pickup & Return",
            description:
                "Schedule convenient pickups and returns from nearby libraries at your preferred time.",
        },
        {
            icon: <FaSearch className="text-4xl text-primary mb-4" />,
            title: "Easy Book Discovery",
            description:
                "Search and browse available books across multiple libraries in one place.",
        },
        {
            icon: <FaUserShield className="text-4xl text-primary mb-4" />,
            title: "Secure User Accounts",
            description:
                "Your personal data and activity are protected with secure authentication systems.",
        },
        {
            icon: <FaClock className="text-4xl text-primary mb-4" />,
            title: "Time-Saving Service",
            description:
                "Avoid queues and long travel times with our efficient book courier service.",
        },
        {
            icon: <FaHeart className="text-4xl text-primary mb-4" />,
            title: "Reader-Centric Platform",
            description:
                "Built specifically for students, researchers, and passionate readers.",
        },
    ];

    return (
        <section className="py-10 bg-gray-50">
            <div className="text-center my-10 w-11/12 mx-auto">
                <p className="text-secondary text-lg">
                    Our Services
                </p>
                <h2 className="text-primary text-4xl font-bold mb-10">
                    What We Offer
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition"
                        >
                            <div className="flex flex-col items-center">
                                {service.icon}
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-center">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
