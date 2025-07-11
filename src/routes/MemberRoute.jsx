import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserData from '../hooks/useUserData';
import { Navigate, useLocation } from 'react-router';
import Loading from '../shared/Loading';

const MemberRoute = ({children}) => {
    const {user,loading}=useAuth()
    const {role,isLoading}=useUserData()
    const location=useLocation()
    if(loading || isLoading){
        return <Loading/>
    }
    if(!user || role !== 'member'){
        return <Navigate state={{from:location.pathname}} to={'/forbidden'}></Navigate>
    }
    return children
};

export default MemberRoute;