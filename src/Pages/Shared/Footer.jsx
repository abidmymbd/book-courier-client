import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaSpotify } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-gray-200 text-primary p-10">
            <aside>
                <Link to='/'>
                    <span className="text-3xl font-extrabold">eBook</span>
                </Link>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    {/* Facebook */}
                    <a
                        href="#"
                        className="bg-white shadow-md w-12 h-12 flex justify-center items-center rounded-full 
        transition-all duration-300 hover:bg-[#1877F2] hover:text-white"
                    >
                        <FaFacebookF size={20} />
                    </a>

                    {/* Twitter (X) */}
                    <a
                        href="#"
                        className="bg-white shadow-md w-12 h-12 flex justify-center items-center rounded-full 
        transition-all duration-300 hover:bg-black hover:text-white"
                    >
                        <FaXTwitter size={20} />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="#"
                        className="bg-white shadow-md w-12 h-12 flex justify-center items-center rounded-full 
        transition-all duration-300 hover:bg-[#0A66C2] hover:text-white"
                    >
                        <FaLinkedinIn size={20} />
                    </a>

                    {/* YouTube */}
                    <a
                        href="#"
                        className="bg-white shadow-md w-12 h-12 flex justify-center items-center rounded-full 
        transition-all duration-300 hover:bg-[#FF0000] hover:text-white"
                    >
                        <FaYoutube size={22} />
                    </a>

                    {/* Spotify */}
                    <a
                        href="#"
                        className="bg-white shadow-md w-12 h-12 flex justify-center items-center rounded-full 
        transition-all duration-300 hover:bg-[#1DB954] hover:text-white"
                    >
                        <FaSpotify size={20} />
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;