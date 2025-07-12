import React from 'react';
import useSecureAxios from '../../hooks/useSecureAxios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Loading from '../../shared/Loading';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import NoData from '../../shared/NoData';

const PendingBookings = () => {
    const secureAxios = useSecureAxios();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['pending-bookings'],
        queryFn: async () => {
            const response = await secureAxios.get('/bookings', {
                params: { email: user?.email, status: "pending" }
            });
            return response.data;
        },
    });
    console.log(bookings)
    // Mutation for deleting booking
    const deleteBookingMutation = useMutation({
        mutationFn: async (id) => {
            return secureAxios.delete(`/bookings/${id}`);
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Booking Deleted',
                text: 'Your booking has been successfully removed.',
            });
            queryClient.invalidateQueries(['pending-bookings']);
            refetch()
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not delete the booking. Please try again.',
            });
        },
    });



    return (
        <>
            {
                isLoading ? <Loading /> :
                    bookings.length === 0 ? <div className='space-y-2 mb-6 p-6 lg:py-20'>
                        <h2 className="text-3xl md:text-4xl font-extrabold">
                            Ready to Play? Check Your Pending Bookings!
                        </h2>
                        <p className='italic'>
                            Your bookings are currently pending admin approval.
                            You’ll be notified via an announcement once it’s confirmed.
                            Thank you for waiting patiently.
                        </p>
                        <NoData />
                    </div> :
                        <div className="p-6">
                            <div className='space-y-2 mb-6'>
                                <h2 className="text-3xl md:text-4xl font-extrabold">
                                    Ready to Play? Check Your Pending Bookings!
                                </h2>
                                <p className='italic'>
                                    Your bookings are currently pending admin approval.
                                    You’ll be notified via an announcement once it’s confirmed.
                                    Thank you for waiting patiently.
                                </p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead className="bg-gray-200 dark:bg-gray-800">
                                        <tr>
                                            <th>#</th>
                                            <th>Details</th>
                                            <th>Slots</th>
                                            <th>Sport Date</th>
                                            <th>Total Price</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking, idx) => (
                                            <tr key={booking._id} className="hover">
                                                <td>{idx + 1}</td>
                                                <td>
                                                    <div className="flex items-center gap-4">
                                                        <div className="avatar">
                                                            <div className="w-16 h-16 rounded ring ring-gray-400 dark:ring-green-600 ring-offset-base-100 ring-offset-2">
                                                                <img src={booking.courtImage} alt={booking.courtName} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-green-700">
                                                                {booking.courtName}
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                                {booking.courtType}
                                                            </p>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                                Booked on:{' '}
                                                                {dayjs(booking.bookingDate).format('MMM DD, YYYY')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {booking.slots.map((slot) => (
                                                        <span
                                                            key={slot}
                                                            className="md:badge md:badge-outline mr-1 mb-1"
                                                        >
                                                            {slot}<span className='md:hidden'>,<br /></span>
                                                        </span>
                                                    ))}
                                                </td>
                                                <td className="text-sm">
                                                    {dayjs(booking.date).format('MMM DD, YYYY')}
                                                </td>
                                                <td className="font-semibold text-green-600">
                                                    ${booking.totalPrice}
                                                </td>
                                                <td>
                                                    <span
                                                        className={`badge ${booking.status === 'pending'
                                                            ? 'badge-outline dark:text-yellow-400'
                                                            : 'badge-success'
                                                            }`}
                                                    >
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline hover:border-red-400 text-red-600 btn-sm"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: 'Are you sure?',
                                                                text: `Do you want to delete your booking for ${booking.courtName}?`,
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#d33',
                                                                cancelButtonColor: '#3085d6',
                                                                confirmButtonText: 'Yes, delete it!',
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    deleteBookingMutation.mutate(booking._id);
                                                                }
                                                            });
                                                        }}
                                                    >
                                                        <FaTrash /> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
            }

        </>
    );
};

export default PendingBookings;

