import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserData from '../hooks/useUserData';
import { Navigate, useLocation } from 'react-router';
import Loading from '../shared/Loading';

const MemberAndUserRoute = ({children}) => {
    const {user,loading}=useAuth()
    const {role,isLoading}=useUserData()
    const location=useLocation()
    if(loading || isLoading){
        return <Loading/>
    }
        if(!user || (role !== 'member' && role !== 'user')){
        return <Navigate state={{from:location.pathname}} to={'/forbidden'}></Navigate>
    }
    return children
};

export default MemberAndUserRoute;