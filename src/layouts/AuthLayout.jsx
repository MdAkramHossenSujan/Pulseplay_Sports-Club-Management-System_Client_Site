import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar';

const AuthLayout = () => {
    return (
        <div>
            <Navbar/>
            <div className='py-18'>
            <Outlet/>
            </div>
        </div>
    );
};

export default AuthLayout;