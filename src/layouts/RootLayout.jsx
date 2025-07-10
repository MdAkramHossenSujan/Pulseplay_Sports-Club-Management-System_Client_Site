import React, { Suspense } from 'react';
import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../shared/Footer';
import Loading from '../shared/Loading';

const RootLayout = () => {

    return (
        <div>
            <Navbar/>
           <div className='min-h-screen pt-18'>
           <Suspense fallback={
            <Loading/>
           }>
           <Outlet/>
           </Suspense>
           </div>
           <Footer/>
        </div>
    );
};

export default RootLayout;