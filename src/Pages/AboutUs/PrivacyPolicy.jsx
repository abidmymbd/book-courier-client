import React, { useEffect, useState } from 'react';

const TypewriterText = ({ text, speed = 60, pause = 1500 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let timeout;

        if (index < text.length) {
            timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, speed);
        } else {
            timeout = setTimeout(() => {
                setDisplayedText('');
                setIndex(0);
            }, pause);
        }

        return () => clearTimeout(timeout);
    }, [index, text, speed, pause]);

    return (
        <span className="inline-block">
            {displayedText}
            <span className="animate-pulse ml-1">|</span>
        </span>
    );
};


const PrivacyPolicy = () => {
    return (
        <div>

            {/* Header Section */}
            <div className="p-6 text-center">
                <h2 className="text-3xl text-primary font-bold mb-2">
                    Privacy Policy
                </h2>

                <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-5 min-h-[64px]">
                    <TypewriterText
                        text="Your privacy is important to us. This Privacy Policy explains how Book Courier BD collects, uses, and protects your personal information."
                    />
                </p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">

                <div>
                    <h3 className="text-2xl font-bold text-primary mb-4">
                        Information We Collect
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Book Courier BD collects personal information such as
                        name, email, phone number, and delivery address when
                        users register or place an order.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        We may also collect non-personal data to improve
                        performance and user experience.
                    </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-8 shadow-sm">
                    <h4 className="text-xl font-semibold mb-4 text-primary">
                        How We Use Your Information
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                        <li>• Book delivery and pickup processing</li>
                        <li>• User authentication and account management</li>
                        <li>• Notifications and order updates</li>
                        <li>• System improvement and analytics</li>
                    </ul>
                </div>
            </div>

            {/* Security Section */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold text-center text-primary mb-10">
                    Data Protection & Security
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="p-6 bg-white rounded-xl shadow hover:bg-[#fff3f6] transition">
                        <h4 className="font-semibold text-lg mb-2">
                            Secure Storage
                        </h4>
                        <p className="text-gray-600 text-sm">
                            All data is stored securely using modern
                            infrastructure.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow hover:bg-[#fff3f6] transition">
                        <h4 className="font-semibold text-lg mb-2">
                            Authentication Safety
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Secure login methods protect user accounts.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow hover:bg-[#fff3f6] transition">
                        <h4 className="font-semibold text-lg mb-2">
                            Limited Access
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Only authorized staff can access user data.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow hover:bg-[#fff3f6] transition">
                        <h4 className="font-semibold text-lg mb-2">
                            No Data Selling
                        </h4>
                        <p className="text-gray-600 text-sm">
                            User data is never sold or shared.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default PrivacyPolicy;
