import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import useSecureAxios from '../../../hooks/useSecureAxios';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../shared/Loading';


const MemberDashboard = () => {
    const secureAxios = useSecureAxios();
    const { user } = useAuth();

    const { data: stats = [], isLoading: loadingStats } = useQuery({
        queryKey: ['bookingStats', user?.email],
        enabled: !!user?.email,
        queryFn: () =>
            secureAxios.get('/dashboard/booking-stats', {
                params: { email: user?.email },
            })
                .then((r) => r.data),
    });
    console.log(stats)
    const { data: paymentStats = {}, isLoading: loadingPayments } = useQuery({
        queryKey: ['paymentStats', user?.email],
        enabled: !!user?.email,
        queryFn: () =>
            secureAxios.get('/dashboard/payment-stats', {
                params: { email: user?.email },
            })
                .then((r) => r.data),
    });

    if (loadingStats || loadingPayments) return <Loading />

    const pieData = stats.map((s) => ({
        name: s._id,
        value: s.count,
    }));

    const barData = paymentStats.courtFreq || [];

    const COLORS = ['#4ade80', '#facc15', '#60a5fa', '#f87171'];

    const totalPaid =
        paymentStats.payments?.reduce((sum, p) => sum + p.amount, 0) || 0;

    return (
        <div className="p-6 lg:py-18">
            <div className='md:px-6'>
                <h2 className="text-3xl font-bold mb-2">
                    Welcome to Your PulsePlay Member Dashboard
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Watch your bookings, payments, and enjoy exclusive member benefits all in one place.
                </p>
            </div>

            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:p-6 rounded-lg">
                {[
                    { label: "Pending Bookings", id: "pending" },
                    { label: "Approved Bookings", id: "approved" },
                    { label: "Confirmed Bookings", id: "confirmed" },
                    { label: "Rejected Bookings", id: "rejected" },
                ].map(({ label, id }) => (
                    <div
                        key={id}
                        className="flex flex-col items-center justify-center p-4 border border-gray-500 rounded-lg shadow-md"
                    >
                        <p className="text-gray-700 dark:text-gray-300 font-semibold">{label}</p>
                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2">
                            {stats.find((s) => s._id === id)?.count || 0}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:p-6 mb-12">
                <div className=" p-6 rounded-3xl border border-gray-500">
                    <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
                        Booking Status Breakdown
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={40}
                                outerRadius={80}
                            >
                                {pieData.map((_, idx) => (
                                    <Cell
                                        key={idx}
                                        fill={COLORS[idx % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="p-6 rounded-3xl border border-gray-500">
                    <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
                        Total Paid Amount
                    </h3>
                    <p className="text-3xl text-green-600 font-bold">
                        ${totalPaid}
                    </p>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                    Popular Court Types Booked
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                        <XAxis dataKey="_id" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#4ade80" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MemberDashboard;


