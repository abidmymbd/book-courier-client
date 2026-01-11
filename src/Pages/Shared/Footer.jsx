import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaSpotify } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-primary p-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* BRAND / LOGO */}
                <div className="flex flex-col items-center md:items-start space-y-2">
                    <Link to="/">
                        <span className="text-3xl font-extrabold">eBook</span>
                    </Link>
                    <p>&copy; {new Date().getFullYear()} - All rights reserved by bookcourier</p>
                </div>

                {/* QUICK LINKS */}
                <div className="flex flex-col items-center md:items-start space-y-2">
                    <h3 className="font-bold text-lg mb-2">Quick Links</h3>
                    <Link to="/about-us" className="hover:text-secondary transition-colors">About Us</Link>
                    <Link to="/books" className="hover:text-secondary transition-colors">Books</Link>
                    <Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link>
                    <Link to="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
                </div>

                {/* CONTACT + SOCIAL */}
                <div className="flex flex-col items-center md:items-start space-y-3">
                    <h3 className="font-bold text-lg mb-2">Contact</h3>
                    <p>Email: <a href="mailto:info@ebook.com" className="hover:text-secondary transition-colors">info@ebook.com</a></p>
                    <p>Phone: <a href="tel:+1234567890" className="hover:text-secondary transition-colors">+1 234 567 890</a></p>
                    <p>Address: 123 Main Street, City, Country</p>

                    {/* SOCIAL ICONS */}
                    <div className="flex gap-4 mt-2">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                           className="bg-white shadow-md w-12 h-12 flex justify-center items-center rounded-full 
                                      transition-all duration-300 hover:bg-[#1877F2] hover:text-white"
                           aria-label="Facebook">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                           className="bg-white shadow-md w-12 h-12 flex justify-center items-center rounded-full 
                                      transition-all duration-300 hover:bg-black hover:text-white"
                           aria-label="Twitter">
                            <FaXTwitter size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                           className="bg-white shadow-md w-12 h-12 flex justify-center items-center rounded-full 
                                      transition-all duration-300 hover:bg-[#0A66C2] hover:text-white"
                           aria-label="LinkedIn">
                            <FaLinkedinIn size={20} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                           className="bg-white shadow-md w-12 h-12 flex justify-center items-center rounded-full 
                                      transition-all duration-300 hover:bg-[#FF0000] hover:text-white"
                           aria-label="YouTube">
                            <FaYoutube size={22} />
                        </a>
                        <a href="https://spotify.com" target="_blank" rel="noopener noreferrer"
                           className="bg-white shadow-md w-12 h-12 flex justify-center items-center rounded-full 
                                      transition-all duration-300 hover:bg-[#1DB954] hover:text-white"
                           aria-label="Spotify">
                            <FaSpotify size={20} />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
