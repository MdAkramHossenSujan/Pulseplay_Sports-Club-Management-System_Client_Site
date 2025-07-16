import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import useSecureAxios from '../../../hooks/useSecureAxios';
import Loading from '../../../shared/Loading';
const COLORS = ['#4ade80', '#facc15', '#60a5fa', '#f87171', '#a78bfa', '#fb923c'];

const AdminDashboard = () => {
  const axios = useSecureAxios();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: () =>
      axios.get('/dashboard/admin-stats').then((res) => res.data),
  });
  if (isLoading) return <Loading/>;

  // Helper to extract count by status
  const getCount = (status) =>
    stats.bookingStats?.find((s) => s._id === status)?.count || 0;

  const totalCourts = stats?.totalCourts ?? 0;
  const availableCourts = stats.availableCourts ?? 0;
  const pending = getCount('pending');
  const approved = getCount('approved');
  const confirmed = getCount('confirmed');

  const pieBookingStatus = stats.bookingStats?.length
    ? stats.bookingStats.map((item) => ({
        name: item._id,
        value: item.count,
      }))
    : [];

  const pieCourtTypes = stats.courtTypes?.length
    ? stats.courtTypes.map((item) => ({
        name: item._id,
        value: item.count,
      }))
    : [];


  return (
    <div className="p-6 lg:py-18">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        PulsePlay Admin Dashboard
      </h2>

      {/* Top-level stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <StatCard title="Total Courts" value={totalCourts} color="text-green-600" />
        <StatCard title="Available Courts" value={availableCourts} color="text-blue-600" />
        <StatCard title="Pending Bookings" value={pending} color="text-yellow-600" />
        <StatCard title="Approved Bookings" value={approved} color="text-purple-600" />
        <StatCard title="Confirmed Bookings" value={confirmed} color="text-pink-600" />
      </div>

      <div className="text-xl font-semibold py-12 text-center rounded-3xl border my-6 border-gray-500 dark:border-gray-700 text-gray-700 dark:text-gray-200">
        Total Earnings:{' '}
        <span className="text-green-600 font-bold">
          $ {stats.totalEarnings ?? 0}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-12">
        <DashboardCard title="Booking Status Overview">
          <PieChartComponent data={pieBookingStatus} />
        </DashboardCard>

        <DashboardCard title="Court Types Distribution">
          <PieChartComponent data={pieCourtTypes} />
        </DashboardCard>

      </div>
    </div>
  );
};

export default AdminDashboard;

// Pie chart reusable component
const PieChartComponent = ({ data, prefix = '' }) => {
  if (!data?.length) return <p className="text-gray-500">No data available</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={100}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((_, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `${prefix}${value}`}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Bar chart reusable component
const BarChartComponent = ({ data }) => {
  if (!data?.length) return <p className="text-gray-500">No data available</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#4ade80" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Card wrapper
const DashboardCard = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-500 shadow">
    <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
      {title}
    </h3>
    {children}
  </div>
);

// Simple metric card
const StatCard = ({ title, value, color }) => (
  <div className="bg-white border border-gray-500 dark:bg-gray-900 p-6 rounded-xl shadow flex flex-col items-center">
    <h4 className="text-gray-700 dark:text-gray-200 text-lg">{title}</h4>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);


