import React from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { FaTrash, FaCheck } from "react-icons/fa";
import NoData from "../../shared/NoData";
import LoadingMiddle from "../../shared/LoadingMiddle";

const ManageBookings = () => {
    const secureAxios = useSecureAxios();

    // Fetch all bookings
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const res = await secureAxios.get("/bookings",
                {
                    params: { status: 'pending' }
                }
            );
            return res.data;
        },
    });

    // Delete (Reject) booking mutation
    const rejectBookingMutation = useMutation({
        mutationFn: async (id) => {
            const res = await secureAxios.patch(`/bookings/${id}`, {
                status: 'rejected'
            });
            return res.data;
        },
        onSuccess: async (booking) => {
            console.log(booking)
            await secureAxios.post('/notifications', {
                userEmail: booking.bookedBy,
                title: 'Booking Rejected!',
                message: `Your booking for ${booking.courtName} on ${dayjs(booking.date).format('MMM DD, YYYY')} has been rejected.`,
                read: false,
                status: 'rejected',
                rejectedAt: new Date()
            });
            Swal.fire({
                title: "Success",
                text: "Booking rejected successfully!",
                icon: "success",
            });
            refetch();
        },
        onError: () => {
            Swal.fire({
                title: "Error",
                text: "Something went wrong.",
                icon: "error",
            });
        },
    });

    // Approve booking mutation
    const approveBookingMutation = useMutation({
        mutationFn: async (id) => {
            const res = await secureAxios.patch(`/bookings/${id}`, {
                status: "approved",
            });
            return res.data;
        },
        onSuccess: async (booking) => {
            await secureAxios.post('/notifications', {
                userEmail: booking.bookedBy,
                title: 'Booking Approved!',
                message: `Your booking for ${booking.courtName} on ${dayjs(booking.date).format('MMM DD, YYYY')} has been approved.`,
                read: false,
                status: 'approved',
                approvedAt: new Date()
            });

            await secureAxios.patch('/users', {
                email: booking.bookedBy,
                role: 'member'
            })
            Swal.fire({
                title: "Success",
                text: "Booking approved successfully!",
                icon: "success",
            });
            refetch();
        },
        onError: () => {
            Swal.fire({
                title: "Error",
                text: "Something went wrong.",
                icon: "error",
            });
        },
    });



    return (
        <div className="p-6 lg:py-20">
            <div className="space-y-3">
                <h2 className="text-4xl font-extrabold">
                    Manage Bookings
                </h2>
                <p className="max-w-5xl">
                    Keep track of all bookings made by users in real-time.
                    Review pending requests, confirm or reject bookings, and ensure smooth scheduling across all courts.
                    Stay organized and provide a seamless experience for all sports enthusiasts!
                </p>
            </div>


            {
                isLoading ? <LoadingMiddle /> :
                    bookings.length === 0 ? (
                        <div className='space-y-2 mb-6 p-6 lg:py-20'>
                            <NoData />
                        </div>

                    ) : <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gray-200 dark:bg-gray-800">
                                <tr>
                                    <th>#</th>
                                    <th>Booked By</th>
                                    <th>Total Price</th>
                                    <th>Details</th>
                                    <th>Slots</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, idx) => (
                                    <tr key={booking._id} className="hover">
                                        <td>{idx + 1}</td>

                                        {/* Booked By */}
                                        <td>{booking.bookedBy}</td>

                                        {/* Total Price */}
                                        <td className="font-semibold text-green-600">
                                            ${booking.totalPrice}
                                        </td>

                                        {/* Merged Details Cell */}
                                        <td>
                                            <p className="font-bold text-green-700">{booking.courtName}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {booking.courtType}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Requested on:{" "}
                                                {dayjs(booking.bookingDate).format("MMM DD, YYYY")}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Sport Date: {dayjs(booking.date).format("MMM DD, YYYY")}
                                            </p>
                                        </td>

                                        {/* Slots */}
                                        <td className="flex flex-wrap gap-1 my-6">
                                            {booking.slots.map((slot) => (
                                                <span
                                                    key={slot}
                                                    className="md:badge md:badge-outline text-xs"
                                                >
                                                    {slot}<span className='md:hidden'>,<br /></span>
                                                </span>
                                            ))}
                                        </td>

                                        {/* Actions */}
                                        <td>
                                            <div className="flex gap-2">
                                                {/* Approve Button */}

                                                <button
                                                    disabled={booking.status === 'approved'}
                                                    className={`btn btn-outline btn-success btn-sm flex items-center gap-2 ${booking.status === 'approved' ? 'btn-disabled' : ''
                                                        }`}
                                                    onClick={() => {
                                                        if (booking.status !== 'approved') {
                                                            Swal.fire({
                                                                title: "Approve Booking?",
                                                                text: `Are you sure you want to approve this booking for ${booking.courtName}?`,
                                                                icon: "question",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#16A34A",
                                                                cancelButtonColor: "#d33",
                                                                confirmButtonText: "Yes, approve!",
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    approveBookingMutation.mutate(booking._id, booking);
                                                                }
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <FaCheck /> {booking.status === 'approved' ? 'Approved' : 'Approve'}
                                                </button>



                                                {/* Reject Button */}
                                                <button
                                                    className="btn btn-outline btn-error btn-sm flex items-center gap-2"
                                                    onClick={() =>
                                                        Swal.fire({
                                                            title: "Reject Booking?",
                                                            text: `Are you sure you want to reject this booking for ${booking.courtName}?`,
                                                            icon: "warning",
                                                            showCancelButton: true,
                                                            confirmButtonColor: "#d33",
                                                            cancelButtonColor: "#3085d6",
                                                            confirmButtonText: "Yes, reject it!",
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                rejectBookingMutation.mutate(booking._id, booking);
                                                            }
                                                        })
                                                    }
                                                >
                                                    <FaTrash /> Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

            }

        </div>
    );
};

export default ManageBookings;
