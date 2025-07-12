import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useSecureAxios from '../../hooks/useSecureAxios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Swal from 'sweetalert2';
import { FaSearch, FaClock, FaBell } from 'react-icons/fa';
import LoadingMiddle from '../../shared/LoadingMiddle';

dayjs.extend(duration);

const ManageBookingConfirmed = () => {
    const secureAxios = useSecureAxios();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: bookings = [], isLoading} = useQuery({
        queryKey: ['bookings-confirmed'],
        queryFn: async () => {
            const res = await secureAxios.get('/bookings/confirmed');
            return res.data;
        }
    });

    const notifyMutation = useMutation({
        mutationFn: async (payload) => {
            return secureAxios.post('/notifications', payload);
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Notification Sent!',
                text: 'The user has been notified successfully.',
            });
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not send the notification.',
            });
        }
    });
    //Filtering using useMemo to keep save to prevent re-rendering
    const filteredBookings = useMemo(() => {
        if (!searchTerm) return bookings;
        return bookings.filter((booking) =>
            booking.courtName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [bookings, searchTerm]);

    //Real time using dayjs
    const calculateTimeRemaining = (date) => {
        const now = dayjs();
        const sportDate = dayjs(date);
        const diffMs = sportDate.diff(now);

        if (diffMs <= 0) {
            return "Started or Past";
        }

        const dur = dayjs.duration(diffMs);
        return `${dur.days()}d ${dur.hours()}h ${dur.minutes()}m left`;
    };
    //Using Swal a input field created and the value will be sent as message for the member.
    const handleNotify = (booking) => {
        Swal.fire({
            title: "Send Notification?",
            text: `Send a message to ${booking.bookedBy} about their booking for ${booking.courtName}?`,
            input: "text",
            inputPlaceholder: "Enter your message...",
            showCancelButton: true,
            confirmButtonText: "Send",
            cancelButtonText: "Cancel",
            preConfirm: (message) => {
                if (!message) {
                    Swal.showValidationMessage("Message cannot be empty");
                }
                return message;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                notifyMutation.mutate({
                    userEmail: booking.bookedBy,
                    title: `Update for ${booking.courtName}`,
                    message: result.value,
                    read: false,
                    createdAt: new Date()
                });
            }
        });
    };

    return (
        <div className="p-6 max-w-7xl lg:py-20">
            <div className=" mb-8">
                <h2 className="text-3xl font-extrabold mb-4">
                    Manage Confirmed Bookings
                </h2>
                <p className="text-gray-500 max-w-3xl italic">
                    View and manage all confirmed bookings for your sports facilities.
                    Use the tools below to notify players, monitor upcoming sessions,
                    and keep your schedule running smoothly. Stay on top of your bookings
                    and ensure every game starts right on time!
                </p>
            </div>


            {/* Search Bar */}
            <div className="mb-6 flex justify-center">
                <div className="flex items-center border border-green-500 rounded px-3 py-2 w-full md:w-1/3">
                    <FaSearch className="text-green-600 mr-2" />
                    <input
                        type="text"
                        placeholder="Search by Court Name..."
                        className="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {
                isLoading ? <LoadingMiddle /> : <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Court Info</th>
                                <th>Booked By</th>
                                <th>Slots</th>
                                <th>Sport Date</th>
                                <th>Time Remaining</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((booking, index) => (
                                    <tr key={booking._id} className="hover">
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-4">
                                                <div className="avatar">
                                                    <div className="w-12 h-12 rounded ring dark:ring-green-500 ring-offset-2">
                                                        <img
                                                            src={booking.courtImage}
                                                            alt={booking.courtName}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-green-700">
                                                        {booking.courtName}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        {booking.courtType}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-gray-700 dark:text-gray-300">
                                            {booking.bookedBy}
                                        </td>
                                        <td>
                                            {booking.slots.map((slot) => (
                                                <span
                                                    key={slot}
                                                    className="md:badge md:badge-outline mr-1 mb-1 dark:text-green-300"
                                                >
                                                    {slot}<span className='md:hidden'>,<br /></span>
                                                </span>
                                            ))}
                                        </td>
                                        <td className="lg:text-sm text-xs">
                                            {dayjs(booking.date).format('MMM DD, YYYY')}
                                        </td>
                                        <td className="my-7 dark:text-green-300 lg:text-sm text-xs flex items-center gap-2">
                                            <FaClock />
                                            {calculateTimeRemaining(booking.date)}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline text-green-800 dark:text-green-300 dark:btn-success flex items-center gap-2"
                                                onClick={() => handleNotify(booking)}
                                            >
                                                <FaBell /> Notify
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-10 text-gray-400">
                                        No confirmed bookings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default ManageBookingConfirmed;
