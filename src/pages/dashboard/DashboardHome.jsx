import React from 'react';
import useUserData from '../../hooks/useUserData';
import Loading from '../../shared/Loading';
import UserDashboardHome from './dashboardhomeperrole/UserDashboardHome';
import MemberDashboard from './dashboardhomeperrole/MemberDashboard';
import AdminDashboard from './dashboardhomeperrole/AdminDashboard';

const DashboardHome = () => {
    const {role, isLoading}=useUserData()
    if(isLoading){
        return <Loading/>
    }
 if(role==="user"){
    return <UserDashboardHome/>
 }else if(role==="member"){
    return <MemberDashboard/>
 }else if(role==="admin"){
    return <AdminDashboard/>
 }
};

export default DashboardHome;