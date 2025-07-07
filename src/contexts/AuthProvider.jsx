import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
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
    //Object To share through Globally
    const AuthInfo = {
        theme,
        toggleTheme
    }

    //Return The authContext with value authInfo
    return <AuthContext value={AuthInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;