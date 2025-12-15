import React from 'react';

const Feedback = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-12">
                    <p className='text-secondary text-lg'>Contact</p>
                    <h2 className='text-primary text-4xl font-bold'>Write me anything</h2>
                    <div className="w-24 h-1 bg-secondary mx-auto mt-4 rounded"></div>
                </div>

                {/* Form */}
                <div className="bg-[#fff3f6] p-12 rounded-xl shadow-md">
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 border bg-white border-gray-200 rounded-md focus:outline-none focus:ring-2 "
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-3 border bg-white border-gray-200 rounded-md focus:outline-none focus:ring-2 "
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full px-4 py-3 border bg-white border-gray-200 rounded-md focus:outline-none focus:ring-2 "
                        />
                        <textarea
                            placeholder="Your Message"
                            className="w-full px-4 py-3 border bg-white border-gray-200 rounded-md focus:outline-none focus:ring-2  h-32 resize-none"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full border-primary border py-2 px-10 rounded-lg text-primary bg-white font-bold hover:bg-secondary hover:text-white hover:border-secondary transform transition duration-300">
                            Send Now
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Feedback;
