import React, { useState } from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import logo from '../assets/Logo/logo-transparent.png';
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courts", path: "/courts" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Add Court", path: "/addcourt" }
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const { theme, toggleTheme, user, logOut } = useAuth();
const handleLogOut=()=>{
    logOut()
    .then(() => {
      toast.success('Signed Out Successful')
    }).catch(error => {
      console.log(error)
    })
}
    return (
        <header className="fixed top-0 left-0 w-full dark:bg-base-200 bg-base-100 border-b border-gray-400 dark:border-green-900 shadow z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
                <div className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="logo"
                        className="w-12 h-12 border dark:border-green-600 rounded-full p-1"
                    />
                    <span className="text-3xl font-bold text-green-600">
                        PulsePlay
                    </span>
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

                    {/* Auth area */}
                    {user ? (
                        <div className="relative inline-block">
                            {/* Profile Image */}
                            <img
                                src={user.photoURL || "https://via.placeholder.com/40"}
                                alt="Profile"
                                className="w-10 h-10 rounded-full cursor-pointer border border-green-600"
                                onClick={() => setProfileDropdown(!profileDropdown)}
                            />

                            {/* AnimatePresence for dropdown and used overlay for better clicking */}
                            <AnimatePresence>
                                {profileDropdown && (
                                    <>
                                        {/* Overlay */}
                                        <motion.div
                                            className="fixed inset-0 bg-black/30 z-40"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setProfileDropdown(false)}
                                        />

                                        {/* Dropdown */}
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute right-0 mt-2 w-72 bg-base-100 shadow-xl border border-gray-200 rounded-xl p-6 z-50 text-center space-y-4"
                                        >
                                            {/* Avatar */}
                                            <img
                                                src={user.photoURL || "https://via.placeholder.com/100"}
                                                alt="User avatar"
                                                className="w-28 h-28 rounded-full border-4 border-green-600 mx-auto"
                                            />

                                            {/* Divider */}
                                            <hr className="border-t border-gray-200 dark:border-gray-700" />

                                            {/* Name & Email */}
                                            <div className="space-y-1">
                                                <p className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 font-semibold">
                                                    <span className="text-green-600 dark:text-green-400">
                                                        <i className="fas fa-user" />
                                                    </span>
                                                    {user.displayName || "Unknown User"}
                                                </p>
                                                <p className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="text-green-600 dark:text-green-400">
                                                        <i className="fas fa-envelope" />
                                                    </span>
                                                    {user.email || "No Email"}
                                                </p>
                                            </div>

                                            {/* Divider */}
                                            <hr className="border-t border-gray-200 dark:border-gray-700" />

                                            {/* Buttons */}
                                            <div className="flex justify-center gap-3 mt-4">
                                                <NavLink
                                                    to="/dashboard"
                                                    onClick={() => setProfileDropdown(false)}
                                                    className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition"
                                                >
                                                    <i className="fas fa-tachometer-alt" />
                                                    Dashboard
                                                </NavLink>
                                                <button
                                                    onClick={handleLogOut}
                                                    className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
                                                >
                                                    <i className="fas fa-sign-out-alt" />
                                                    Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="text-gray-500 hover:text-primary font-medium"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="text-gray-500 hover:text-primary font-medium"
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                      {/* Theme toggle */}
                      <label
                        onClick={toggleTheme}
                        className={`cursor-pointer bg-blue-600 dark:bg-blue-900 md:p-2 p-1 rounded-full swap swap-rotate ${theme === "dark" ? "swap-active" : ""
                            }`}
                    >
                        <Moon size={20} className="swap-on text-gray-400" />
                        <Sun size={20} className="swap-off text-yellow-500" />
                    </label>
                </nav>

                {/* Hamburger */}
                <button
                    className="md:hidden btn btn-ghost btn-circle"
                    onClick={() => setOpen(true)}
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Overlay */}
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
                            className="fixed top-0 left-0 h-full w-64 bg-base-100 z-50 p-6 flex flex-col gap-5"
                        >
                            <div className="flex justify-end">
                                <button
                                    className="btn btn-ghost btn-circle"
                                    onClick={() => setOpen(false)}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            {/* Theme toggle */}
                            <label
                                onClick={toggleTheme}
                                className={`cursor-pointer w-10 h-10 bg-blue-600 dark:bg-blue-900 md:p-2 p-1 rounded-full swap swap-rotate ${theme === "dark" ? "swap-active" : ""
                                    }`}
                            >
                                <Moon size={20} className="swap-on text-gray-400" />
                                <Sun size={20} className="swap-off text-yellow-500" />
                            </label>
                            {/* User info in mobile */}
                            {user && (
                                <div className="flex flex-col items-center gap-2">
                                    <img
                                        src={user.photoURL || "https://via.placeholder.com/80"}
                                        alt="User"
                                        className="w-20 h-20 rounded-full border border-green-600"
                                    />
                                    <p className="text-lg font-semibold">
                                        {user.displayName || "User"}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {user.email}
                                    </p>
                                    <div className="flex gap-4">
                                        <NavLink
                                            to="/dashboard"
                                            onClick={() => setOpen(false)}
                                            className=" text-green-600 text-sm border py-1 px-2 rounded-lg"
                                        >
                                            Dashboard
                                        </NavLink>
                                        <button
                                            onClick={handleLogOut}
                                            className="text-red-500 cursor-pointer text-sm hover:text-red-600 border py-1 px-2 rounded-lg"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                            <hr className="border-dashed border-gray-500" />
                            {/* Links */}
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-lg font-medium transition-colors duration-300 ${isActive
                                            ? "text-green-600"
                                            : "text-gray-700 hover:text-green-300"
                                        }`
                                    }
                                    onClick={() => setOpen(false)}
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                            {!user && (
                                <>
                                    <NavLink
                                        to="/login"
                                        onClick={() => setOpen(false)}
                                        className="text-gray-700 hover:text-primary font-medium mt-4"
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        onClick={() => setOpen(false)}
                                        className="text-gray-700 hover:text-primary font-medium"
                                    >
                                        Register
                                    </NavLink>
                                </>
                            )}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;

