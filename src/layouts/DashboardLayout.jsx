import React, { Suspense } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaUserCircle, FaClipboardList, FaBullhorn, FaUserShield, FaHome, FaEdit, FaPlus, FaBell, FaMoneyBillWave, FaMoneyBillWaveAlt } from 'react-icons/fa';
import logo from '../assets/Logo/logo-transparent.png'
import useUserData from '../hooks/useUserData';
import { BadgeCheck, CheckCircle, LayoutGrid, ListCheck, Megaphone, Menu } from 'lucide-react';
import Theme from '../shared/Theme';
import Loading from '../shared/Loading';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useSecureAxios from '../hooks/useSecureAxios';
const DashboardLayout = () => {
    const { userData, isLoading } = useUserData()
    const secureAxios = useSecureAxios()
    const queryClient = useQueryClient();
    const { data, refetch } = useQuery({
        queryKey: ['unread-announcement-count', userData?.email],
        queryFn: async () => {
            const res = await secureAxios.get('/notifications', {
                params: {
                    email: userData?.email
                },
            });
            return res.data;
        },
    });
    console.log(data)
    const markNotificationsReadMutation = useMutation({
        mutationFn: async (email) => {
            return secureAxios.patch('/notifications/markRead', { email });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['unread-announcement-count', userData?.email]);
            refetch()
        },
    });
    if (isLoading) {
        return (
            <Loading />
        );
    }
    const role = userData?.role
    const notificationCount = data?.length
    console.log(notificationCount)

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
                            <div >
                            <Link to={'/'}>
                                <span className="text-2xl font-bold text-green-600">
                                    PulsePlay
                                </span>

                            </Link><br />
                            <p className='text-sm'><span className='uppercase font-semibold'>{role} </span>Dashboard</p>
                            </div>
                        </div>
                    </div>


                    <div>
                        <Suspense fallback={
                            <Loading />
                        }>
                            <Outlet />
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
                            <div >
                            <Link to={'/'}>
                                <span className="text-3xl font-bold text-green-600">
                                    PulsePlay
                                </span>

                            </Link><br />
                            <span className='uppercase font-semibold'>{role} </span>Dashboard
                            </div>
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
                                        to="/dashboard/profile"
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
                                {/*member || user */}
                                {
                                    (role === 'member' || role === 'user') && (
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/dashboard/pendingBookings"
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                            ? 'text-green-700 font-semibold'
                                                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }`
                                                    }
                                                >
                                                    <FaClipboardList /> Pending Bookings
                                                </NavLink>
                                            </li>
                                        </>
                                    )
                                }

                                {/*Member Links */}
                                {
                                    role === 'member' &&
                                    <>
                                        <li>
                                            <NavLink
                                                to="/dashboard/approvedBookings"
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-3 md:px-1 py-2 rounded ${isActive
                                                        ? ' text-green-700 font-semibold'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`
                                                }
                                            >
                                                <CheckCircle className='w-4 md:w-8' /> Approved Bookings
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/dashboard/confirmedBookings"
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-3 md:px-1 py-2 rounded ${isActive
                                                        ? ' text-green-700 font-semibold'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`
                                                }
                                            >
                                                <BadgeCheck className='w-4 md:w-8' /> Confirmed Bookings
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/dashboard/paymentHistory"
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                        ? ' text-green-700 font-semibold'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`
                                                }
                                            >
                                                <FaMoneyBillWave /> Payment History
                                            </NavLink>
                                        </li>
                                        <li
                                            className="relative"
                                            onClick={() => {
                                                markNotificationsReadMutation.mutate(userData.email);
                                            }}
                                        >
                                            <NavLink
                                                to="/dashboard/notifications"
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                        ? 'text-green-700 font-semibold'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`
                                                }
                                            >
                                                <FaBell /> Notifications{' '}
                                                <small className="absolute -top-0 left-6 text-xs">
                                                    {notificationCount}
                                                </small>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/dashboard/memberAnnouncements"
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                        ? ' text-green-700 font-semibold'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`
                                                }
                                            >
                                                <FaBullhorn />Announcements
                                            </NavLink>
                                        </li>
                                    </>
                                }
                                {/*Admin Links */}
                                {
                                    role === 'admin' &&
                                    <>
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
                                                <FaEdit />Manage bookings Request
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/dashboard/manageBookingConfirmed"
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                        ? ' text-green-700 font-semibold'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`
                                                }
                                            >
                                                <ListCheck className='md:mb-6.5' />Manage Confirmed Bookings
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/dashboard/addcourt"
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                        ? ' text-green-700 font-semibold'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`
                                                }
                                            >
                                                <FaPlus />Add Court
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/dashboard/courts"
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                        ? ' text-green-700 font-semibold'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`
                                                }
                                            >
                                                <LayoutGrid />Courts Managements
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/dashboard/manageCoupons"
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                        ? ' text-green-700 font-semibold'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`
                                                }
                                            >
                                                <FaMoneyBillWaveAlt />Coupons Managements
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/dashboard/manageAnnounces"
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-3 py-2 rounded ${isActive
                                                        ? ' text-green-700 font-semibold'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`
                                                }
                                            >
                                                <Megaphone />Manage Announcement
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
                                        </li></>
                                }
                                {
                                    role === 'user' &&
                                    <>
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
                                    </>
                                }
                            </ul>
                        </nav>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
