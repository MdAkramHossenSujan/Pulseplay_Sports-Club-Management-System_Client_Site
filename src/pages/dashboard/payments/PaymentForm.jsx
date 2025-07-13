import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSecureAxios from '../../../hooks/useSecureAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../shared/Loading';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import cardImage from '../../../assets/credit-card-online-payments-overview.jpg'
import dayjs from 'dayjs';
const PaymentForm = () => {
    const { id } = useParams();
    const stripe = useStripe();
    const elements = useElements();
    const secureAxios = useSecureAxios();
    const navigate=useNavigate()
    // Fetch booking details
    const {
        data: booking,
        isLoading: bookingLoading,
    } = useQuery({
        queryKey: ['booking', id],
        queryFn: async () => {
            const res = await secureAxios.get(`/bookings/${id}`);
            return res.data;
        },
    });

    // Fetch coupons
    const { data: coupons = [], isLoading: couponsLoading } = useQuery({
        queryKey: ['coupon'],
        queryFn: async () => {
            const res = await secureAxios.get('/coupons');
            return res.data;
        },
    });

    const cardStyle = {
        style: {
          base: {
            color: "#000000", // white text in dark mode
            fontSize: "16px",
            iconColor: "#a3e635", // optional, light green icons
            "::placeholder": {
              color: "#cbd5e1", // Tailwind slate-300
            },
          },
          invalid: {
            color: "#f87171", // Tailwind red-400
          },
        },
      };
    const [couponCode, setCouponCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState(null);

    if (bookingLoading || couponsLoading) {
        return <Loading />;
    }

    // Default price (no discount applied yet)
    const initialTotalPrice = booking.totalPrice;

    const handleApplyCoupon = () => {
        const matchedCoupon = coupons.find(
            (c) => c.couponName === couponCode
        );

        if (!matchedCoupon) {
            Swal.fire('Invalid Coupon', 'No matching coupon found.', 'error');
            return;
        }

        const discount = matchedCoupon.couponValue;
        const discountAmount = (initialTotalPrice * discount) / 100;
        const newPrice = initialTotalPrice - discountAmount;

        setDiscountedPrice(newPrice);

        Swal.fire(
            'Coupon Applied!',
            `You've saved ${discount}% on your booking.`,
            'success'
        );
    };

    const handlePayment = async () => {
        if (!stripe || !elements) return;
        const card = elements.getElement(CardElement);
        if (!card) return;
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            Swal.fire('Payment Failed', error.message, 'error')
        }
        try {
            // 1. Create PaymentIntent on server
            const { data } = await secureAxios.post(
                '/create-payment-intent',
                {
                    amount: Math.round((discountedPrice || initialTotalPrice) * 100),
                }
            );
            const clientSecret = data.clientSecret
            Swal.fire({
                title: 'Processing Payment...',
                html: 'Please wait while we complete your payment.',
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
                }
              });
            // 2. Confirm Card Payment

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        email: booking.bookedBy,
                    },
                },
            });

            if (paymentResult.error) {
                Swal.fire('Payment Failed', paymentResult.error.message, 'error');
            } else {
                if (paymentResult.paymentIntent.status === 'succeeded') {
                    const bill = {
                        paidBy:booking.bookedBy,
                        bookingId: booking._id,
                        transactionId: paymentResult.paymentIntent.id,
                        amount: discountedPrice || initialTotalPrice,
                        email: booking.bookedBy,
                        date: new Date(),
                    }
                    await secureAxios.post('/payments',bill)
                    await secureAxios.patch(`/bookings/${booking._id}/paymentStatus`,{payment_status:'paid'})
                    await secureAxios.patch(`/bookings/${booking._id}`,{status:'confirmed'})
                    await secureAxios.post('/notifications', {
                        userEmail: booking.bookedBy,
                        title: 'Payment Successful!',
                        message: `Your payment for ${booking.courtName} on ${dayjs(booking.date).format('MMM DD, YYYY')} has been successful.`,
                        read:false,
                        status:'paid',
                        paidAt:new Date()
                      });
                    console.log(bill)
                    Swal.close();
                    Swal.fire({
                        title: 'Payment Successful',
                        html: `
                          <div style="text-align: left;">
                            <p><strong>Amount Paid:</strong> $ ${bill.amount / 100}</p>
                            <p><strong>Transaction ID:</strong> ${bill.transactionId}</p>
                            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                          </div>
                        `,
                        icon: 'success',
                        confirmButtonColor: '#16A34A',
                      });
                      navigate('/dashboard/approvedBookings')
                      
                }
            }
        } catch (error) {
            console.error(error);
            Swal.close();
            Swal.fire('Error', 'Something went wrong during payment.', 'error');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-base-100 shadow rounded space-y-4">
            <div>
                <img className='rounded-2xl' src={cardImage} alt="" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 text-center">
                Complete Your Payment
            </h2>
            <p className="text-center text-gray-500 text-sm font-semibold mt-1">
                Please review your booking details below before proceeding.
                You can apply a coupon code if you have one to get a discount.
                When ready, enter your card details securely and click “Pay Now.”
                Your payment will be processed safely via Stripe.
            </p>


            {/* Coupon input */}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="input input-bordered flex-1"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-outline dark:btn-success"
                    onClick={handleApplyCoupon}
                >
                    Apply
                </button>
            </div>

            {/* Readonly booking details */}
            <input
                readOnly
                className="input input-bordered w-full"
                value={booking.bookedBy}
            />
            <input
                readOnly
                className="input input-bordered w-full"
                value={booking.courtType}
            />
            <input
                readOnly
                className="input input-bordered w-full"
                value={booking.date}
            />
            <input
                readOnly
                className="input input-bordered w-full"
                value={booking.slots.join(', ')}
            />
            <input
                readOnly
                className="input input-bordered w-full font-semibold text-green-700"
                value={`$${discountedPrice !== null ? discountedPrice : initialTotalPrice}`}
            />

            {/* Stripe card field */}
            <div className="border p-3 rounded mt-3">
                <CardElement options={cardStyle}/>
            </div>

            <button
                className="btn btn-success w-full mt-4"
                onClick={handlePayment}
                disabled={!stripe}
            >
                Pay Now
            </button>
        </div>
    );
};

export default PaymentForm;
