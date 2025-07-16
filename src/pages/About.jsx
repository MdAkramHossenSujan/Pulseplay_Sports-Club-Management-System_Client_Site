import React, { useEffect } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Seamless Booking Workflow',
    description: 'From browsing courts to payment — each step is smooth, secure, and user-friendly.',
  },
  {
    title: 'Member Approval System',
    description: 'Admins can approve/reject bookings. Upon approval, users become club members with access to premium features.',
  },
  {
    title: 'Stripe Integrated Payment',
    description: 'Members can pay securely through Stripe with real-time confirmation and coupon-based discounts.',
  },
  {
    title: 'Powerful Admin Panel',
    description: 'Admins can manage courts, users, members, bookings, coupons, and announcements — all in one place.',
  },
  {
    title: 'Live Notifications & Announcements',
    description: 'Users receive real-time updates for booking status, payments, and admin messages.',
  },
  {
    title: 'Interactive Map Support',
    description: 'Find courts using React Leaflet-based interactive map, enabling geo-based discovery.',
  },
  {
    title: 'Dynamic Dashboards',
    description: 'Separate dashboards for Users, Members, and Admins — each with their personalized layout and tools.',
  },
  {
    title: 'Profile Sync & Photo Upload',
    description: 'Users can sync Firebase and MongoDB profile data and upload profile pictures from mobile.',
  },
  {
    title: 'Responsive UI & Dark Mode',
    description: 'Fully mobile-responsive layout with elegant dark mode support.',
  },
];

const About = () => {
  useEffect(() => {
    document.title = `About | PulsePlay`; 
    window.scrollTo(0, 0); 
  }, []);
  return (
    <div className="bg-white dark:bg-base-200 py-16 px-6 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-600">🚀 Workflow & Features</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg max-w-3xl mx-auto">
          PulsePlay offers a streamlined booking experience, real-time interactions, and full control for admins. Here’s what makes it powerful:
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="border border-gray-200 dark:border-gray-700 bg-base-100 shadow-lg rounded-xl p-6 space-y-3 hover:shadow-xl"
          >
            <div className="flex items-center gap-3">
              <FaRegCheckCircle className="text-green-500 text-xl" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-3xl font-bold text-green-600">📈 Full Workflow Overview</h3>
        <ol className="mt-8 space-y-6 max-w-3xl mx-auto text-left text-gray-700 dark:text-gray-300 list-decimal pl-5">
          <li>User visits the site and browses available courts.</li>
          <li>User registers/logs in using Firebase authentication.</li>
          <li>After login, user can book courts and submit a request.</li>
          <li>Admin reviews requests and approves/rejects them.</li>
          <li>Upon approval, user becomes a member and can pay via Stripe.</li>
          <li>Payment confirmed → booking becomes confirmed & visible in dashboard.</li>
          <li>Admins can manage courts, members, bookings, and coupons.</li>
          <li>Notifications and announcements keep everyone updated in real time.</li>
        </ol>
      </div>
    </div>
  );
};

export default About;
