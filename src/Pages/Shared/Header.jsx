import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const Header = () => {

    const { user, logOut } = useAuth();
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    const handleToggle = (e) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    };

    const handleSignOut = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error)
            })
    }

    const links = <>
        <li className='font-semibold text-secondary'><NavLink to='/books'>Books</NavLink></li>
        <li className='font-semibold text-secondary'><NavLink to='/coverage'>Coverage</NavLink></li>
        {
            user && <>
                <li className='font-semibold text-secondary'><NavLink to='/dashboard'>Dashboard</NavLink></li>
            </>
        }
        <li className='font-semibold text-secondary'><NavLink to='/about-us'>About Us</NavLink></li>
    </>

    return (
        <div className="navbar text-primary bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to='/'>
                    <span className="text-3xl font-extrabold">Book Courier</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user && (
                        <div className="flex items-center gap-3">
                            <img
                                src={user.photoURL}
                                alt="Profile"
                                title={user.displayName}
                                className="w-10 h-10 rounded-full" />
                            <button
                                onClick={handleSignOut}
                                className="btn text-secondary font-semibold px-6 hover:bg-secondary hover:text-white transition-all duration-200 delay-100">
                                Sign Out
                            </button>
                        </div>
                    )
                }
                {
                    !user && (
                        <Link
                            className='btn text-secondary font-semibold px-6 hover:bg-secondary hover:text-white transition-all duration-200 delay-100'
                            to="/login">
                            Sign in
                        </Link>
                    )
                }
                <div className='ml-3'>
                    <label className="flex cursor-pointer gap-2 items-center">
                        <input
                            type="checkbox"
                            onChange={handleToggle}
                            checked={theme === 'dark'}
                            className="toggle toggle-success"
                        />
                        <span className="text-sm">{theme === 'dark' ? 'Dark' : 'Light'}</span>
                    </label>
                </div>

            </div>
        </div>
    );
};

export default Header;