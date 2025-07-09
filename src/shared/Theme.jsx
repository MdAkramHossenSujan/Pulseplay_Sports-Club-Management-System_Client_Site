import React from 'react';
import useAuth from '../hooks/useAuth';
import { Moon, Sun } from 'lucide-react';


const Theme = () => {
    const { theme, toggleTheme, } = useAuth()
    return (
        <div>
            <label
                onClick={toggleTheme}
                className={`cursor-pointer w-10 h-10 z-300 bg-blue-600 dark:bg-blue-900 md:p-2 p-1 rounded-full swap swap-rotate ${theme === "dark" ? "swap-active" : ""
                    }`}
            >
                <Moon size={20} className="swap-on text-gray-400" />
                <Sun size={20} className="swap-off text-yellow-500" />
            </label>
        </div>
    );
};

export default Theme;