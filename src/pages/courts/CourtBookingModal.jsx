import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";

const CourtBookingModal = ({ court, isOpen, onClose }) => {
    const secureAxios=useSecureAxios()
const {user}=useAuth()
    //React hook form
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const selectedSlots = watch("slots") || [];
    const pricePerSession = parseFloat(court.pricePerSession);
    const subtotal = pricePerSession * selectedSlots.length;

    const totalPrice = subtotal;

    const onSubmit = (data) => {
        const bookingData = {
            bookedBy:user.email,
            courtName: court.courtName,
            courtImage: court.courtImage,
            courtType: court.courtType,
            pricePerSession: court.pricePerSession,
            slots: selectedSlots,
            date: data.date,
            totalPrice,
            bookingDate: new Date().toISOString(),
            status: "pending",
        };

        Swal.fire({
            title: "Confirm Your Booking",
            html: `
        <img src="${court.courtImage}" alt="${court.courtName}" style="width: 100%; margin:auto; max-width: 300px; margin-bottom: 10px; border-radius: 8px;"/>
        <p><strong>Court Name:</strong> ${court.courtName}</p>
        <p><strong>Court Type:</strong> ${court.courtType}</p>
        <p><strong>Price per Session:</strong> $${court.pricePerSession}</p>
        <p><strong>Total Price:</strong> $${totalPrice.toFixed(2)}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Slots:</strong> ${selectedSlots.join(", ")}</p>
        
      `,
            showCancelButton: true,
            confirmButtonText: "Confirm Booking",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Booking is confirmed
                // Booking Data to backend using axios 
                const res = await secureAxios.post('/bookings', bookingData)
                if (res.data.inserted) {
                    Swal.fire({
                        icon: "success",
                        title: "Booking Request Submitted",
                        text: `Thank you for your request. Your booking for ${court.courtName} has been forwarded to the admin for review. Please wait patiently for confirmation.`,
                      });
                      
                }
                reset();
                onClose();
            } else {
                // User cancelled
                Swal.fire({
                    icon: "info",
                    title: "Booking Cancelled",
                    text: "You cancelled your booking.",
                });
            }
        });
    };


    return (
        <>
            <div className={`modal pt-6 md:pt-0 ${isOpen ? "modal-open" : ""}`}>
                <div className="modal-box max-w-4xl relative">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute cursor-pointer right-4 top-4 text-gray-400 hover:text-red-600"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-2xl font-bold text-green-600 mb-4">
                        Book Court
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="label">
                                    <span className="label-text">Court Name</span>
                                </label>
                                <input
                                    readOnly
                                    value={court.courtName}
                                    className="input input-bordered w-full cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Court Type</span>
                                </label>
                                <input
                                    readOnly
                                    value={court.courtType}
                                    className="input input-bordered w-full cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Price per Session ($)</span>
                                </label>
                                <input
                                    readOnly
                                    value={court.pricePerSession}
                                    className="input input-bordered w-full cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Select Slots</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {court.slots.map((slot) => (
                                    <label
                                        key={slot}
                                        className="flex items-center gap-2 border border-green-600 rounded p-2 hover:bg-green-50 dark:hover:bg-green-900 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            value={slot}
                                            {...register("slots")}
                                            className="checkbox checkbox-success"
                                        />
                                        <span>{slot}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Select Date</span>
                            </label>
                            <input
                                type="date"
                                {...register("date", { required: "Date is required" })}
                                className="input input-bordered w-full"
                            />
                            {errors.date && (
                                <span className="text-red-500 text-sm">
                                    {errors.date.message}
                                </span>
                            )}
                        </div>

                        {/* Pricing Summary */}
                        <div className="text-right mt-4 space-y-1">
                            <p className="text-gray-700 dark:text-gray-300">
                                Subtotal:{" "}
                                <span className="font-semibold">
                                    ${subtotal.toFixed(2)}
                                </span>
                            </p>

                                

                            <p className="text-lg font-semibold text-green-700">
                                Total Price: ${totalPrice.toFixed(2)}
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="btn bg-green-600 hover:bg-green-700 text-white w-full"
                            disabled={selectedSlots.length === 0}
                        >
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CourtBookingModal;


