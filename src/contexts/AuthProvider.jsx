import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
const googleProvider=new GoogleAuthProvider
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    //Theme Customization By state and effect to toggle
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme || (systemPrefersDark ? 'dark' : 'light');
    });
    useEffect(() => {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    //Create User for firebaseAuthentication
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signInUser=(email,password)=>{
        setLoading(false)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const updateUser=(profileInfo)=>{
        return updateProfile(auth.currentUser,profileInfo)
    }
    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }
    const signInWithGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const deleteUserData=()=>{
        return deleteUser(auth.currentUser)
    }
    //User stay logged in.
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log(currentUser)
            setLoading(false)
        });
        return ()=>{
            unSubscribe();
        }
    }, [])
    //Object To share through Globally
    const AuthInfo = {
        theme,
        toggleTheme,
        signInUser,
        createUser,
        logOut,
        user,
        loading,
        signInWithGoogle,
        updateUser,
        deleteUserData
    }

    //Return The authContext with value authInfo
    return <AuthContext value={AuthInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;