import React from 'react';
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>

            <div>
                <Link to='/'>
                    <span className="btn btn-ghost text-primary text-3xl font-extrabold">Book Courier</span>
                </Link>
            </div>
            <div className='w-4/12 mx-auto'>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default AuthLayout;