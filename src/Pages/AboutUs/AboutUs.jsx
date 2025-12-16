// import React from 'react';

// const AboutUs = () => {
//     return (
//          <div className="p-6 text-center">
//             <h2 className="text-3xl text-primary font-bold mb-2">About Us</h2>
//         </div>
//     );
// };

// export default AboutUs;

import React from 'react';

const AboutUs = () => {
    return (
        <div>

            <div className="p-6 text-center">
                <h2 className="text-3xl text-primary font-bold mb-2">About Book Courier</h2>
                <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-5">
                    A modern library delivery management system designed to make
                    borrowing and returning books simple, fast, and accessible.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div>
                    <h3 className="text-2xl font-bold text-primary mb-4">
                        Project Overview
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        <span className="font-semibold">BookCourier</span> is a
                        library delivery management system where users can request
                        book pickup or delivery from nearby libraries. The platform
                        is designed to help students, researchers, and regular
                        readers access books without physically visiting a library.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        By combining technology with library services, BookCourier
                        reduces time, travel effort, and improves overall reading
                        accessibility.
                    </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-8 shadow-sm">
                    <h4 className="text-xl font-semibold mb-4 text-primary">
                        Who Is It For?
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                        <li>• Students who need quick access to academic books</li>
                        <li>• Researchers working with limited time</li>
                        <li>• Readers who prefer home delivery</li>
                        <li>• Libraries aiming to modernize services</li>
                    </ul>
                </div>
            </div>

            {/* Features Section */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold text-center text-primary mb-10">
                    Key Features
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 bg-white rounded-xl shadow hover:bg-[#fff3f6] transition">
                        <h4 className="font-semibold text-lg mb-2">
                            Easy Book Ordering
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Users can browse available books and place orders in a
                            few clicks.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow hover:bg-[#fff3f6] transition">
                        <h4 className="font-semibold text-lg mb-2">
                            Secure Authentication
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Firebase authentication ensures safe and reliable user
                            access.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow hover:bg-[#fff3f6] transition">
                        <h4 className="font-semibold text-lg mb-2">
                            Role Based Access
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Admin and librarian roles help manage books and users
                            efficiently.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow hover:bg-[#fff3f6] transition">
                        <h4 className="font-semibold text-lg mb-2">
                            Reviews & Wishlist
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Users can review books and save favorites to wishlist.
                        </p>
                    </div>
                </div>
            </div>

            {/* Vision Section */}
            <div className="bg-primary text-white rounded-2xl p-10 text-center">
                <h3 className="text-2xl font-bold mb-4">
                    Our Vision
                </h3>
                <p className="max-w-3xl mx-auto leading-relaxed">
                    Our vision is to bridge the gap between readers and libraries
                    by leveraging modern web technologies. BookCourier aims to
                    promote knowledge sharing, reduce physical barriers, and make
                    libraries more accessible to everyone.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
