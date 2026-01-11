import React from 'react';
import Header from '../Pages/Shared/Header';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer';

const RootLayout = () => {
    return (
        <div className='w-11/12 mx-auto dark'>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default RootLayout;