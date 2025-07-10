import React, { Suspense } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaUserCircle, FaClipboardList, FaBullhorn, FaUserShield, FaHome, FaEdit } from 'react-icons/fa';
import logo from '../assets/Logo/logo-transparent.png'
import useUserData from '../hooks/useUserData';
import { Menu } from 'lucide-react';
import Theme from '../shared/Theme';
import Loading from '../shared/Loading';
const DashboardLayout = () => {
    const { userData, isLoading, refetch } = useUserData()
    if (isLoading) {
        return (
            <Loading/>
        );
    }
    const role = userData?.role
    console.log(role)
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <div className='fixed z-100 top-6 right-6'>
                    <Theme />
                </div>
                {/* Drawer toggle input */}
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                {/* Page Content */}
                <div className="drawer-content flex flex-col min-h-screen">
                    {/* Top Navbar */}
                    <div className="navbar lg:hidden sticky top-0 border-b z-5 border-gray-400 dark:border-green-600 shadow px-4 bg-base-100 dark:bg-[#1F2937]">
                        <div className="flex-none">
                            <label
                                htmlFor="my-drawer-2"
                                aria-label="open sidebar"
                                className="p-10 cursor-pointer"
                            >
                                <Menu />
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                       <Link to={'/'}>
                       <img
                                src={logo}
                                alt="logo"
                                className="w-12 h-12 border dark:border-green-600 rounded-full p-1"
                            /></Link>
                            <Link to={'/'}>
                            <span className="text-3xl font-bold text-green-600">
                                PulsePlay
                            </span>
                            </Link>
                        </div>
                    </div>


                    <div className="px-4 md:px-8 py-8">
                        <Suspense fallback={
                            <Loading/>
                        }>
                            <Outlet/>
                        </Suspense>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="drawer-side z-10">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <aside className="w-72 md:w-86 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-full shadow-lg">
                        <div className="flex items-center p-6 gap-2">
                            <Link to={'/'}>
                            <img
                                src={logo}
                                alt="logo"
                                className="w-16 h-16 border dark:border-green-600 rounded-full p-1"
                            />
                            </Link>
                            <Link to={'/'}>
                            <span className="text-4xl font-bold text-green-600">
                                PulsePlay
                            </span></Link>
                        </div>
                        <hr className='border-dashed w-full' />
                        <nav className="menu p-4 space-y-4 text-gray-700 dark:text-gray-200">

                            <ul className="space-y-2 md:text-lg md:p-6">
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className='flex items-center gap-2 px-3 py-2 rounded'
                                    >
                                        <FaHome /> Home
                                    </Link>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/myprofile"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                ? ' text-green-700 font-semibold'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`
                                        }
                                    >
                                        <FaUserCircle /> My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/pendingBookings"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                ? ' text-green-700 font-semibold'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`
                                        }
                                    >
                                        <FaClipboardList /> Pending Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/manageBooking"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                ? ' text-green-700 font-semibold'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`
                                        }
                                    >
                                        <FaEdit />Manage bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/announcements"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                ? ' text-green-700 font-semibold'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`
                                        }
                                    >
                                        <FaBullhorn /> Announcements
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/makeadmin"
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                ? ' text-green-700 font-semibold'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`
                                        }
                                    >
                                        <FaUserShield /> Make Admin
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
