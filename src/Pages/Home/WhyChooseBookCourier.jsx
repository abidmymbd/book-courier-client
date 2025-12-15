import React from 'react';
import { FaBook, FaShippingFast, FaUsers } from 'react-icons/fa';

const WhyChooseBookCourier = () => {
    const benefits = [
        {
            icon: <FaBook className="text-4xl text-primary mb-4" />,
            title: "Wide Library Access",
            description: "Access books from multiple libraries in your area without physically visiting them.",
        },
        {
            icon: <FaShippingFast className="text-4xl text-primary mb-4" />,
            title: "Fast Delivery",
            description: "Request book pickup or delivery quickly and conveniently with our streamlined system.",
        },
        {
            icon: <FaUsers className="text-4xl text-primary mb-4" />,
            title: "User-Friendly",
            description: "Designed for students, researchers, and readers to borrow and return books effortlessly.",
        },
    ];

    return (
        <section className="py-10 bg-gray-50">
            <div className='text-center my-10'>
                <p className='text-secondary text-lg'>Why Choose Us?</p>
                <h2 className='text-primary text-4xl font-bold mb-10'>Why Choose Book Courier</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <div className="flex flex-col items-center">
                                {benefit.icon}
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{benefit.title}</h3>
                                <p className="text-gray-600 text-center">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseBookCourier;
