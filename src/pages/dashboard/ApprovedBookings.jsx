import React from 'react';
import useSecureAxios from '../../hooks/useSecureAxios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Loading from '../../shared/Loading';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { FaTrash, FaMoneyBillWave } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import NoData from '../../shared/NoData';

const ApprovedBookings = () => {
    const secureAxios = useSecureAxios();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Fetch approved bookings
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['approved-bookings'],
        queryFn: async () => {
            const response = await secureAxios.get('/bookings', {
                params: {
                    email: user?.email,
                    status: "approved"
                }
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
                title: 'Booking Cancelled',
                text: 'Your booking has been successfully cancelled.',
            });
            queryClient.invalidateQueries(['approved-bookings']);
            refetch();
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not cancel the booking. Please try again.',
            });
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="p-6 lg:py-20">
            <div className='space-y-2 mb-6'>
                <h2 className="text-4xl font-extrabold">
                    Your Approved Bookings
                </h2>
                <p className='italic'>
                    These bookings are approved and ready for payment. You may proceed to payment or cancel your booking if your plans change.
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
                                    <div className="flex flex-wrap gap-2">
                                        {booking.slots.map((slot) => (
                                            <span
                                                key={slot}
                                                className="md:badge md:badge-outline md:dark:badge-success text-xs"
                                            >
                                                {slot}<span className='md:hidden'>,<br /></span>
                                            </span>
                                        ))}
                                    </div>

                                </td>

                                <td className="text-sm">
                                    {dayjs(booking.date).format('MMM DD, YYYY')}
                                </td>
                                <td className="font-semibold text-green-600">
                                    ${booking.totalPrice}
                                </td>
                                <td>
                                    <span className="badge badge-success">
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="flex gap-2 my-6">
                                    <button
                                        className="btn btn-outline dark:btn-success btn-sm flex items-center gap-2"
                                        onClick={() => navigate(`/dashboard/payment/${booking._id}`)}
                                    >
                                        <FaMoneyBillWave /> Pay Now
                                    </button>
                                    <button
                                        className="btn btn-outline text-red-600 border-red-600 btn-sm flex items-center gap-2"
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Are you sure?',
                                                text: `Do you want to cancel your booking for ${booking.courtName}?`,
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#d33',
                                                cancelButtonColor: '#3085d6',
                                                confirmButtonText: 'Yes, cancel it!',
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    deleteBookingMutation.mutate(booking._id);
                                                }
                                            });
                                        }}
                                    >
                                        <FaTrash /> Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center text-gray-400 py-10">
                                    <NoData />
                                    <p>You have no approved bookings to display.Contact admin to approve your bookings.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovedBookings;
