import React from 'react';
import useAuth from '../hooks/useAuth';
import loadingAnimation from '../assets/Animation/Animation - 1751968204375_Loading.json'
import Lottie from 'lottie-react';
import { Navigate, useLocation } from 'react-router';
const PrivateRoute = ({children}) => {
    const {user,loading}=useAuth()
    const location=useLocation()
    if(loading){
        return  <div className='flex justify-center items-center min-h-screen w-full'>
        <Lottie className='md:w-48 md:h-48 w-32 h-32' animationData={loadingAnimation} loop={true} />
      </div>
      
    }
    if(!user){
        return <Navigate to='/login' state={{from:location.pathname}}></Navigate>
    }
    return children;
};

export default PrivateRoute;