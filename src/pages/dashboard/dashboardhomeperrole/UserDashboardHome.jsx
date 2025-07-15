import React from "react";

import { useQuery } from "@tanstack/react-query";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import useUserData from "../../../hooks/useUserData";
import useSecureAxios from "../../../hooks/useSecureAxios";
import Loading from "../../../shared/Loading";

Chart.register(ArcElement, Tooltip, Legend);

const UserDashboardHome = () => {
    const { userData } = useUserData();
    const secureAxios = useSecureAxios();

    const userEmail = userData?.email;

    // Load all bookings for this user
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["userBookings", userEmail],
        enabled: !!userEmail,
        queryFn: async () => {
            const res = await secureAxios.get("/bookings", {
                params: { email: userEmail, status: "pending" },
            });
            return res.data;
        },
    });
    console.log(bookings)
    if (isLoading) {
        return <Loading />
    }

    // Compute pending count
    const pendingBookings = bookings.filter(b => b.status === "pending");
    const confirmedBookings = bookings.filter(b => b.status === "confirmed");

    const pendingCount = pendingBookings.length;

    // Pie chart data
    const pieData = {
        labels: ["Pending", "Confirmed"],
        datasets: [
            {
                data: [pendingCount, confirmedBookings.length],
                backgroundColor: ["#f59e0b", "#10b981"],
                hoverOffset: 8,
            },
        ],
    };

    // Extract unique court types from all bookings
    const courtTypes = [...new Set(bookings.map(b => b.courtType))];

    return (
        <div className="mx-auto p-6 lg:py-18">
            <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                Welcome to Your PulsePlay Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
                Stay updated with your court bookings, membership activities, and important stats — all in one place.
            </p>


            {/* Pending Bookings Count */}
            <div className="mb-4">
                <div className="rounded-lg p-6 text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                        You have
                    </p>
                    <p className="text-5xl font-extrabold text-amber-500">
                        {pendingCount}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        pending booking{pendingCount !== 1 && "s"}.
                    </p>
                </div>
            </div>
            {/* Court Types Badges */}
            <div className="rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Court Types in Your Bookings
                </h3>
                {courtTypes.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-300">
                        No courts booked yet.
                    </p>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {courtTypes.map((type) => (
                            <span
                                key={type}
                                className="inline-block border dark:border-green-400 px-5 py-3 rounded-full text-sm font-semibold  text-green-800 dark:bg-green-800 dark:text-white"
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {/* Pie Chart */}
            <div className="mb-8 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Bookings Status
                </h3>
                <Pie className="max-h-[500px]" data={pieData} />
            </div>

        </div>
    );
};

export default UserDashboardHome;
