import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useSecureAxios from '../../hooks/useSecureAxios';
import useAuth from '../../hooks/useAuth';
import Loading from '../../shared/Loading';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import NoData from '../../shared/NoData';
import { Link } from 'react-router';

dayjs.extend(relativeTime);

const ConfirmedBookings = () => {
    const secureAxios = useSecureAxios();
    const { user } = useAuth();
    useEffect(() => {
        document.title = `Confirmed Bookings | Dashboard | PulsePlay`; 
        window.scrollTo(0, 0); 
      }, []);
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['confirmed-bookings', user?.email],
        queryFn: async () => {
            const res = await secureAxios.get('/bookings/confirmed', {
                params: { email: user?.email },
            });
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) {
        return <Loading />;
    }
    console.log(bookings)
    return (
        <div className="p-6 lg:py-20">
            <div className="mb-6 space-y-2">
                <h2 className="text-4xl font-extrabold">
                    Confirmed Bookings
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Here’s your list of all confirmed bookings. Track your upcoming sessions and see how much time remains until your sports event starts.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th>#</th>
                            <th>Booking Info</th>
                            <th>Slots</th>
                            <th>Sport Date</th>
                            <th>Remaining Time</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, idx) => {
                            const timeRemaining = dayjs(booking.date).fromNow();
                            return (
                                <tr key={booking._id} className="hover">
                                    <td>{idx + 1}</td>
                                    <td>
                                        <div>
                                            <p className="font-semibold text-green-700">
                                                {booking.courtName}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {booking.courtType}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Booked on:{' '}
                                                {dayjs(booking.bookingDate).format('MMM DD, YYYY')}
                                            </p>
                                        </div>
                                    </td>
                                   
                                        <td>
                                            <div className="md:flex flex-wrap gap-1">
                                                {booking.slots?.map((slot) => (
                                                    <span
                                                        key={slot}
                                                        className="md:badge md:badge-outline text-xs break-words"
                                                    >
                                                        {slot}<span className='md:hidden'>,<br /></span>
                                                    </span>
                                                ))}
                                            </div>
                                        </td>

                                   
                                    <td className="text-sm">
                                        {dayjs(booking.date).format('MMM DD, YYYY')}
                                    </td>
                                    <td className="text-sm text-green-600 font-medium">
                                        {dayjs(booking.date).isAfter(dayjs())
                                            ? timeRemaining
                                            : 'Already passed'}
                                    </td>
                                    <td className=" font-semibold">
                                        $ {booking.totalPrice}
                                    </td>
                                </tr>
                            );
                        })}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center text-gray-400 py-10">
                                    <NoData/>
                                    No confirmed bookings found.Request a booking first.
                                    <Link to='/bookings' className='btn btn-outline'>Request a booking</Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ConfirmedBookings;

