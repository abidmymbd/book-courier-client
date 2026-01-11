import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const Header = () => {
    const { user, logOut } = useAuth();
    const [theme, setTheme] = useState('light');
    const [open, setOpen] = useState(false);
    
    const closeTimer = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleToggle = (e) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    };

    const handleSignOut = () => {
        logOut().catch(console.error);
    };


    const handleMouseEnter = () => {
        clearTimeout(closeTimer.current);
        setOpen(true);
    };

    const handleMouseLeave = () => {
        closeTimer.current = setTimeout(() => {
            setOpen(false);
        }, 1000); 
    };

    const links = (
        <>
            <li className="font-semibold text-secondary">
                <NavLink to="/books">Books</NavLink>
            </li>
            <li className="font-semibold text-secondary">
                <NavLink to="/coverage">Coverage</NavLink>
            </li>
            {user && (
                <li className="font-semibold text-secondary">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
            )}
            <li className="font-semibold text-secondary">
                <NavLink to="/about-us">About Us</NavLink>
            </li>
            <li className="font-semibold text-secondary">
                <NavLink to="/privacy-policy">Privacy Policy</NavLink>
            </li>
        </>
    );

    return (
        <div className="sticky top-0 z-50 bg-base-100 shadow-sm">
            <div className="w-11/12 mx-auto navbar text-primary">

                {/* LEFT */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {links}
                        </ul>
                    </div>

                    <Link to="/">
                        <span className="text-lg md:text-3xl font-extrabold">
                            Book Courier
                        </span>
                    </Link>
                </div>

                {/* CENTER */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>

                {/* RIGHT */}
                <div className="navbar-end gap-3">

                    {/* THEME TOGGLE */}
                    <label className="hidden md:flex cursor-pointer gap-2 items-center">
                        <input
                            type="checkbox"
                            className="toggle toggle-success"
                            onChange={handleToggle}
                            checked={theme === 'dark'}
                        />
                        <span className="text-sm">
                            {theme === 'dark' ? 'Dark' : 'Light'}
                        </span>
                    </label>

                    {/* AUTH */}
                    {user ? (
                        <div className="relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Profile Image */}
                            <img
                                src={user.photoURL}
                                alt="Profile"
                                title={user.displayName}
                                className="w-10 h-10 rounded-full border-2 border-secondary cursor-pointer"
                            />

                            {/* Hover Dropdown */}
                            {open && (
                                <ul className="absolute right-0 mt-3 menu p-2 shadow bg-base-100 rounded-box w-48 z-50">
                                    <li className="font-semibold text-secondary">
                                        <NavLink to="/dashboard/my-profile">
                                            My Profile
                                        </NavLink>
                                    </li>

                                    <li className="font-semibold text-secondary">
                                        <button onClick={handleSignOut}>
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="btn text-secondary font-semibold px-4 hover:bg-secondary hover:text-white transition-all duration-200"
                        >
                            Sign In
                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Header;
