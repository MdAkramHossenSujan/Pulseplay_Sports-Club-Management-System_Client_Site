import React, { useState } from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import logo from '../assets/Logo/logo-transparent.png'
import useAuth from "../hooks/useAuth";
//Navbar Links Here
const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courts", path: "/courts" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
];

const Navbar = () => {
    //State For The Small Device Navbar
    const [open, setOpen] = useState(false);
    const { theme, toggleTheme } = useAuth()

    return (
        <header className="fixed top-0 left-0 w-full dark:bg-base-200 bg-base-100 border-b border-gray-400 dark:border-green-900 shadow z-50">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="logo" className="w-12 h-12 border dark:border-green-600 rounded-full p-1" />
                    <span className="text-3xl font-bold text-green-600">PulsePlay</span>
                </div>
                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative font-medium pb-1 transition-colors duration-300 ${isActive
                                    ? "text-green-600"
                                    : "text-gray-500 hover:text-primary"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    {isActive && (
                                        <motion.span
                                            layoutId="underline"
                                            className="absolute left-0 bottom-0 h-0.5 w-full bg-green-600"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                    <label onClick={toggleTheme} className={`cursor-pointer bg-blue-600 dark:bg-blue-900
 md:p-2 p-1 z-100 rounded-full swap swap-rotate ${theme === 'dark' ? 'swap-active' : ''}`}>
                        <Moon size={20} className="swap-on text-gray-400" />
                        <Sun size={20} className="swap-off text-yellow-500" />
                    </label>
                </nav>

                {/* Hamburger Menu */}
                <button
                    className="md:hidden btn btn-ghost btn-circle"
                    onClick={() => setOpen(true)}
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Sidebar + Overlay */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Overlay to detect outside click */}
                        <motion.div
                            className="fixed inset-0 bg-black/30 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        />

                        {/* Sidebar */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.4 }}
                            className="fixed top-0 left-0 h-full w-64 bg-base-100 z-50 p-6 flex flex-col gap-6"
                        >
                            <div className="flex justify-end mb-4">
                                <button
                                    className="btn btn-ghost btn-circle"
                                    onClick={() => setOpen(false)}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-lg font-medium transition-colors duration-300 ${isActive
                                            ? "text-primary"
                                            : "text-gray-700 hover:text-primary"
                                        }`
                                    }
                                    onClick={() => setOpen(false)} // closes menu on link click
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
