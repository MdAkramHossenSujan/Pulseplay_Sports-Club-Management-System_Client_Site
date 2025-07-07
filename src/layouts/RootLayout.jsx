import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../shared/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar/>
           <div className='min-h-screen py-18'>
           <Outlet/>
           </div>
           <Footer/>
        </div>
    );
};

export default RootLayout;