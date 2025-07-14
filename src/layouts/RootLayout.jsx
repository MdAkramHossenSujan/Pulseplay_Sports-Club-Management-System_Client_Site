import React, { Suspense } from 'react';
import Navbar from '../shared/Navbar';
import { Outlet, useLocation } from 'react-router';
import Footer from '../shared/Footer';
import Loading from '../shared/Loading';
import NavbarHome from '../shared/NavbarHome';

const RootLayout = () => {
const location = useLocation();
    return (
        <div>
            {
                location.pathname === '/' ? <NavbarHome/> : <Navbar/>
            }
            <div className={`min-h-screen ${location.pathname === '/' ? '' : 'pt-18'}`}>
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