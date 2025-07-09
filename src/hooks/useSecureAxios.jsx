import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
const secureAxios=axios.create({
    
        baseURL:import.meta.env.VITE_API_URL
    
})
const useSecureAxios = () => {
    const {user}=useAuth()
    useEffect(()=>{
        const requestInterceptor=secureAxios.interceptors.request.use(
           async (config)=>{
                if(user){
                    const token=await user.getIdToken(true)
                    config.headers.Authorization=`Bearer ${token}`
                }
                return config
            },
            (error)=>{
                return Promise.reject(error)
            }
        )
        const responseInterceptor=secureAxios.interceptors.response.use(
            (response)=>{
                return response
            },
            (error)=>{
                return Promise.reject(error)
            }
        )
        return ()=>{
            secureAxios.interceptors.request.eject(requestInterceptor)
            secureAxios.interceptors.response.eject(responseInterceptor)
        }
    },[user])
    return secureAxios
};

export default useSecureAxios;